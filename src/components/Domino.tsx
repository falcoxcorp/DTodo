import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DominoTile {
  id: number;
  top: number;
  bottom: number;
  placed: boolean;
}

interface DominoProps {
  onClose: () => void;
}

const DominoDots = ({ value, position }: { value: number; position: 'top' | 'bottom' }) => {
  const dotPositions: { [key: number]: string[] } = {
    0: [],
    1: ['center'],
    2: ['top-left', 'bottom-right'],
    3: ['top-left', 'center', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
  };

  const dots = dotPositions[value] || [];

  return (
    <div className="relative w-full h-20 flex items-center justify-center">
      <div className="relative w-16 h-16">
        {dots.map((pos, idx) => {
          let positionClass = '';
          switch (pos) {
            case 'top-left':
              positionClass = 'top-1 left-1';
              break;
            case 'top-right':
              positionClass = 'top-1 right-1';
              break;
            case 'center':
              positionClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
              break;
            case 'bottom-left':
              positionClass = 'bottom-1 left-1';
              break;
            case 'bottom-right':
              positionClass = 'bottom-1 right-1';
              break;
            case 'middle-left':
              positionClass = 'top-1/2 left-1 -translate-y-1/2';
              break;
            case 'middle-right':
              positionClass = 'top-1/2 right-1 -translate-y-1/2';
              break;
          }
          return (
            <div
              key={idx}
              className={`absolute w-2.5 h-2.5 bg-gray-900 rounded-full ${positionClass}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const DominoTileComponent = ({
  tile,
  onClick,
  disabled,
  horizontal = false,
}: {
  tile: DominoTile;
  onClick?: () => void;
  disabled?: boolean;
  horizontal?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        horizontal ? 'flex-row' : 'flex-col'
      } flex bg-white rounded-lg shadow-lg border-2 border-gray-800 cursor-pointer hover:shadow-xl transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      }`}
      style={{
        width: horizontal ? '160px' : '80px',
        height: horizontal ? '80px' : '160px',
      }}
    >
      <div className={`flex-1 flex items-center justify-center ${horizontal ? 'border-r-2' : 'border-b-2'} border-gray-800`}>
        <DominoDots value={tile.top} position="top" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <DominoDots value={tile.bottom} position="bottom" />
      </div>
    </div>
  );
};

export default function Domino({ onClose }: DominoProps) {
  const [playerTiles, setPlayerTiles] = useState<DominoTile[]>([]);
  const [computerTiles, setComputerTiles] = useState<DominoTile[]>([]);
  const [boardTiles, setBoardTiles] = useState<DominoTile[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'computer'>('player');
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [leftValue, setLeftValue] = useState<number | null>(null);
  const [rightValue, setRightValue] = useState<number | null>(null);

  const createDominoSet = (): DominoTile[] => {
    const tiles: DominoTile[] = [];
    let id = 0;
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        tiles.push({ id: id++, top: i, bottom: j, placed: false });
      }
    }
    return tiles;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    const allTiles = shuffleArray(createDominoSet());
    const player = allTiles.slice(0, 7);
    const computer = allTiles.slice(7, 14);

    setPlayerTiles(player);
    setComputerTiles(computer);
    setBoardTiles([]);
    setLeftValue(null);
    setRightValue(null);
    setCurrentPlayer('player');
    setGameStarted(true);
    setMessage('Tu turno - Coloca una ficha');
  };

  const canPlayTile = (tile: DominoTile): boolean => {
    if (boardTiles.length === 0) return true;
    if (leftValue === null || rightValue === null) return false;

    return (
      tile.top === leftValue ||
      tile.bottom === leftValue ||
      tile.top === rightValue ||
      tile.bottom === rightValue
    );
  };

  const playTile = (tile: DominoTile) => {
    if (currentPlayer !== 'player') return;
    if (!canPlayTile(tile)) {
      setMessage('Esta ficha no se puede jugar');
      return;
    }

    let newTile = { ...tile };

    if (boardTiles.length === 0) {
      setLeftValue(newTile.top);
      setRightValue(newTile.bottom);
    } else {
      if (newTile.bottom === leftValue) {
        setLeftValue(newTile.top);
      } else if (newTile.top === leftValue) {
        setLeftValue(newTile.bottom);
      } else if (newTile.top === rightValue) {
        setRightValue(newTile.bottom);
      } else if (newTile.bottom === rightValue) {
        setRightValue(newTile.top);
      }
    }

    setBoardTiles([...boardTiles, newTile]);
    setPlayerTiles(playerTiles.filter((t) => t.id !== tile.id));
    setCurrentPlayer('computer');
    setMessage('Turno de la computadora...');

    setTimeout(() => {
      computerPlay();
    }, 1000);
  };

  const computerPlay = () => {
    const playableTiles = computerTiles.filter(canPlayTile);

    if (playableTiles.length > 0) {
      const tile = playableTiles[0];
      let newTile = { ...tile };

      if (boardTiles.length === 0) {
        setLeftValue(newTile.top);
        setRightValue(newTile.bottom);
      } else {
        if (newTile.bottom === leftValue) {
          setLeftValue(newTile.top);
        } else if (newTile.top === leftValue) {
          setLeftValue(newTile.bottom);
        } else if (newTile.top === rightValue) {
          setRightValue(newTile.bottom);
        } else if (newTile.bottom === rightValue) {
          setRightValue(newTile.top);
        }
      }

      setBoardTiles([...boardTiles, newTile]);
      setComputerTiles(computerTiles.filter((t) => t.id !== tile.id));
    }

    setCurrentPlayer('player');
    setMessage('Tu turno');
  };

  useEffect(() => {
    if (playerTiles.length === 0 && gameStarted) {
      setMessage('¡Ganaste! 🎉');
      setGameStarted(false);
    } else if (computerTiles.length === 0 && gameStarted) {
      setMessage('La computadora ganó');
      setGameStarted(false);
    }
  }, [playerTiles, computerTiles, gameStarted]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Dominó Clásico</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {!gameStarted ? (
            <div className="text-center py-12">
              <button
                onClick={startGame}
                className="bg-white text-green-800 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Iniciar Juego
              </button>
              {message && (
                <p className="mt-4 text-2xl font-bold text-white">{message}</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-800 bg-opacity-50 rounded-lg p-4">
                <p className="text-xl font-bold text-white text-center">{message}</p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h3 className="text-white font-bold mb-2">
                  Fichas de la Computadora: {computerTiles.length}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {computerTiles.map((tile) => (
                    <div
                      key={tile.id}
                      className="bg-white rounded-lg shadow-lg border-2 border-gray-800"
                      style={{ width: '80px', height: '160px' }}
                    >
                      <div className="h-full flex items-center justify-center text-4xl">
                        ?
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-6 min-h-[200px]">
                <h3 className="text-white font-bold mb-4 text-center">Mesa de Juego</h3>
                <div className="flex gap-2 flex-wrap justify-center">
                  {boardTiles.length === 0 ? (
                    <p className="text-white text-center">La mesa está vacía</p>
                  ) : (
                    boardTiles.map((tile) => (
                      <DominoTileComponent
                        key={tile.id}
                        tile={tile}
                        horizontal={false}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h3 className="text-white font-bold mb-2">Tus Fichas:</h3>
                <div className="flex gap-4 flex-wrap justify-center">
                  {playerTiles.map((tile) => (
                    <DominoTileComponent
                      key={tile.id}
                      tile={tile}
                      onClick={() => playTile(tile)}
                      disabled={currentPlayer !== 'player' || !canPlayTile(tile)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
