import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Users, Shuffle } from 'lucide-react';

interface DominoTile {
  id: string;
  left: number;
  right: number;
  isDouble: boolean;
  rotation: number;
}

interface PlayedTile extends DominoTile {
  position: number;
  isVertical: boolean;
}

const Domino: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<DominoTile[]>([]);
  const [cpuHand, setCpuHand] = useState<DominoTile[]>([]);
  const [playedTiles, setPlayedTiles] = useState<PlayedTile[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'player_won' | 'cpu_won' | 'blocked'>('playing');
  const [currentTurn, setCurrentTurn] = useState<'player' | 'cpu'>('player');
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [message, setMessage] = useState('¡Tu turno! Selecciona una ficha para jugar');
  const [drawPile, setDrawPile] = useState<DominoTile[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const createDominoSet = (): DominoTile[] => {
    const tiles: DominoTile[] = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        tiles.push({
          id: `${i}-${j}`,
          left: i,
          right: j,
          isDouble: i === j,
          rotation: 0,
        });
      }
    }
    return tiles;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const allTiles = shuffleArray(createDominoSet());

    const playerTiles = allTiles.slice(0, 7);
    const cpuTiles = allTiles.slice(7, 14);
    const remaining = allTiles.slice(14);

    setPlayerHand(playerTiles);
    setCpuHand(cpuTiles);
    setDrawPile(remaining);
    setPlayedTiles([]);
    setGameStatus('playing');
    setCurrentTurn('player');
    setSelectedTile(null);
    setMessage('¡Tu turno! Selecciona una ficha para jugar');
  };

  const canPlayTile = (tile: DominoTile): { left: boolean; right: boolean } => {
    if (playedTiles.length === 0) return { left: true, right: true };

    const leftEnd = playedTiles[0].left;
    const rightEnd = playedTiles[playedTiles.length - 1].right;

    return {
      left: tile.left === leftEnd || tile.right === leftEnd,
      right: tile.left === rightEnd || tile.right === rightEnd,
    };
  };

  const playTile = (tile: DominoTile, side: 'left' | 'right') => {
    if (currentTurn !== 'player') return;

    const canPlay = canPlayTile(tile);
    if (!canPlay.left && !canPlay.right) {
      setMessage('¡Esa ficha no se puede jugar!');
      return;
    }

    let newTile: PlayedTile;

    if (playedTiles.length === 0) {
      newTile = {
        ...tile,
        position: 0,
        isVertical: tile.isDouble,
      };
    } else if (side === 'left') {
      const leftEnd = playedTiles[0].left;
      const needsRotation = tile.left !== leftEnd;

      newTile = {
        ...tile,
        left: needsRotation ? tile.right : tile.left,
        right: needsRotation ? tile.left : tile.right,
        position: playedTiles[0].position - 1,
        isVertical: tile.isDouble,
      };
    } else {
      const rightEnd = playedTiles[playedTiles.length - 1].right;
      const needsRotation = tile.left !== rightEnd;

      newTile = {
        ...tile,
        left: needsRotation ? tile.right : tile.left,
        right: needsRotation ? tile.left : tile.right,
        position: playedTiles[playedTiles.length - 1].position + 1,
        isVertical: tile.isDouble,
      };
    }

    const newPlayedTiles = side === 'left'
      ? [newTile, ...playedTiles]
      : [...playedTiles, newTile];

    setPlayedTiles(newPlayedTiles);
    setPlayerHand(playerHand.filter(t => t.id !== tile.id));
    setSelectedTile(null);

    if (playerHand.length === 1) {
      setGameStatus('player_won');
      setPlayerScore(playerScore + 1);
      setMessage('¡Ganaste! 🎉');
      return;
    }

    setCurrentTurn('cpu');
    setMessage('Turno de la CPU...');

    setTimeout(() => {
      cpuPlay(newPlayedTiles);
    }, 1500);
  };

  const cpuPlay = (currentPlayedTiles: PlayedTile[]) => {
    let playableTile: DominoTile | null = null;
    let playSide: 'left' | 'right' | null = null;

    for (const tile of cpuHand) {
      const canPlay = canPlayTileForCPU(tile, currentPlayedTiles);
      if (canPlay.left || canPlay.right) {
        playableTile = tile;
        playSide = canPlay.left ? 'left' : 'right';
        break;
      }
    }

    if (playableTile && playSide) {
      let newTile: PlayedTile;

      if (currentPlayedTiles.length === 0) {
        newTile = {
          ...playableTile,
          position: 0,
          isVertical: playableTile.isDouble,
        };
      } else if (playSide === 'left') {
        const leftEnd = currentPlayedTiles[0].left;
        const needsRotation = playableTile.left !== leftEnd;

        newTile = {
          ...playableTile,
          left: needsRotation ? playableTile.right : playableTile.left,
          right: needsRotation ? playableTile.left : playableTile.right,
          position: currentPlayedTiles[0].position - 1,
          isVertical: playableTile.isDouble,
        };
      } else {
        const rightEnd = currentPlayedTiles[currentPlayedTiles.length - 1].right;
        const needsRotation = playableTile.left !== rightEnd;

        newTile = {
          ...playableTile,
          left: needsRotation ? playableTile.right : playableTile.left,
          right: needsRotation ? playableTile.left : playableTile.right,
          position: currentPlayedTiles[currentPlayedTiles.length - 1].position + 1,
          isVertical: playableTile.isDouble,
        };
      }

      const newPlayedTiles = playSide === 'left'
        ? [newTile, ...currentPlayedTiles]
        : [...currentPlayedTiles, newTile];

      setPlayedTiles(newPlayedTiles);
      setCpuHand(cpuHand.filter(t => t.id !== playableTile!.id));

      if (cpuHand.length === 1) {
        setGameStatus('cpu_won');
        setCpuScore(cpuScore + 1);
        setMessage('La CPU ganó 😔');
        return;
      }

      setCurrentTurn('player');
      setMessage('¡Tu turno! Selecciona una ficha para jugar');
    } else {
      if (drawPile.length > 0) {
        const newTile = drawPile[0];
        setCpuHand([...cpuHand, newTile]);
        setDrawPile(drawPile.slice(1));
        setTimeout(() => cpuPlay(currentPlayedTiles), 1000);
      } else {
        setGameStatus('blocked');
        setMessage('¡Juego bloqueado! Cuenta de puntos');
      }
    }
  };

  const canPlayTileForCPU = (tile: DominoTile, currentPlayedTiles: PlayedTile[]): { left: boolean; right: boolean } => {
    if (currentPlayedTiles.length === 0) return { left: true, right: true };

    const leftEnd = currentPlayedTiles[0].left;
    const rightEnd = currentPlayedTiles[currentPlayedTiles.length - 1].right;

    return {
      left: tile.left === leftEnd || tile.right === leftEnd,
      right: tile.left === rightEnd || tile.right === rightEnd,
    };
  };

  const drawTile = () => {
    if (currentTurn !== 'player' || drawPile.length === 0) return;

    const newTile = drawPile[0];
    setPlayerHand([...playerHand, newTile]);
    setDrawPile(drawPile.slice(1));
    setMessage('Robaste una ficha. ¡Intenta jugar!');
  };

  const renderDominoTile = (tile: DominoTile, isInHand: boolean = false, isClickable: boolean = false) => {
    const isSelected = selectedTile === tile.id;
    const canPlay = isInHand ? canPlayTile(tile) : { left: false, right: false };
    const isPlayable = canPlay.left || canPlay.right;

    return (
      <div
        key={tile.id}
        onClick={() => {
          if (isClickable && isPlayable) {
            setSelectedTile(tile.id);
          }
        }}
        className={`
          relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg border-2
          ${isInHand ? 'w-16 h-32' : 'w-12 h-24'}
          ${isClickable && isPlayable ? 'cursor-pointer hover:shadow-xl hover:scale-105' : 'cursor-not-allowed opacity-60'}
          ${isSelected ? 'border-blue-500 ring-4 ring-blue-300 scale-105' : 'border-gray-400'}
          transition-all duration-200
        `}
      >
        <div className="h-full flex flex-col items-center justify-around p-1">
          <div className="flex-1 flex items-center justify-center border-b-2 border-gray-400 w-full">
            {renderDots(tile.left, isInHand)}
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            {renderDots(tile.right, isInHand)}
          </div>
        </div>
      </div>
    );
  };

  const renderDots = (value: number, large: boolean = false) => {
    const dotSize = large ? 'w-2 h-2' : 'w-1.5 h-1.5';
    const positions: Record<number, number[][]> = {
      0: [],
      1: [[1, 1]],
      2: [[0, 0], [2, 2]],
      3: [[0, 0], [1, 1], [2, 2]],
      4: [[0, 0], [0, 2], [2, 0], [2, 2]],
      5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
      6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
    };

    return (
      <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-0.5 p-1">
        {positions[value].map(([row, col], idx) => (
          <div
            key={idx}
            className={`${dotSize} bg-gray-800 rounded-full`}
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
            }}
          />
        ))}
      </div>
    );
  };

  const hasPlayableTiles = () => {
    return playerHand.some(tile => {
      const canPlay = canPlayTile(tile);
      return canPlay.left || canPlay.right;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-6 bg-gray-800 rounded border-2 border-white" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Dominó Clásico
            </h1>
            <div className="w-12 h-6 bg-gray-800 rounded border-2 border-white" />
          </div>
          <p className="text-gray-600">¡Juega contra la computadora!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Tú: {playerScore}</span>
              </div>
            </div>

            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Nueva Partida
            </button>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-800">CPU: {cpuScore}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl text-center">
            <p className="text-lg font-semibold text-purple-800">{message}</p>
          </div>

          {(gameStatus === 'player_won' || gameStatus === 'cpu_won' || gameStatus === 'blocked') && (
            <div className="mb-6 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Trophy className="w-10 h-10 text-yellow-600" />
                <span className="text-3xl font-bold text-gray-800">
                  {gameStatus === 'player_won' && '¡Ganaste!'}
                  {gameStatus === 'cpu_won' && 'CPU Gana'}
                  {gameStatus === 'blocked' && 'Juego Bloqueado'}
                </span>
                <Trophy className="w-10 h-10 text-yellow-600" />
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-800">Mano de la CPU ({cpuHand.length} fichas)</h3>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {cpuHand.map((tile, idx) => (
                <div
                  key={idx}
                  className="w-12 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-lg shadow-lg border-2 border-red-600"
                />
              ))}
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 min-h-[200px] border-4 border-green-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Mesa de Juego</h3>
            {playedTiles.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500 text-lg">La mesa está vacía. ¡Juega la primera ficha!</p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1 overflow-x-auto pb-4">
                {playedTiles.map((tile) => renderDominoTile(tile, false, false))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">Tu Mano ({playerHand.length} fichas)</h3>
              </div>
              {drawPile.length > 0 && !hasPlayableTiles() && currentTurn === 'player' && (
                <button
                  onClick={drawTile}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Robar Ficha ({drawPile.length})
                </button>
              )}
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {playerHand.map((tile) => renderDominoTile(tile, true, currentTurn === 'player' && gameStatus === 'playing'))}
            </div>
          </div>

          {selectedTile && playedTiles.length > 0 && currentTurn === 'player' && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  const tile = playerHand.find(t => t.id === selectedTile);
                  if (tile && canPlayTile(tile).left) playTile(tile, 'left');
                }}
                disabled={!canPlayTile(playerHand.find(t => t.id === selectedTile)!).left}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                ← Jugar Izquierda
              </button>
              <button
                onClick={() => {
                  const tile = playerHand.find(t => t.id === selectedTile);
                  if (tile && canPlayTile(tile).right) playTile(tile, 'right');
                }}
                disabled={!canPlayTile(playerHand.find(t => t.id === selectedTile)!).right}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                Jugar Derecha →
              </button>
            </div>
          )}

          {selectedTile && playedTiles.length === 0 && currentTurn === 'player' && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const tile = playerHand.find(t => t.id === selectedTile);
                  if (tile) playTile(tile, 'left');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Jugar Ficha
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📖</span> Cómo Jugar
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">1.</span> Selecciona una ficha de tu mano
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">2.</span> Elige jugar a la izquierda o derecha
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">3.</span> Los números deben coincidir
              </p>
              <p>
                <span className="font-semibold text-gray-800">4.</span> Gana quien se quede sin fichas primero
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domino;
