import React, { useState, useEffect } from 'react';
import { Bomb, Flag, Trophy, RotateCcw, Smile, Skull } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';
type CellState = 'hidden' | 'revealed' | 'flagged';

interface Cell {
  isMine: boolean;
  adjacentMines: number;
  state: CellState;
}

interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}

const DIFFICULTIES: Record<Difficulty, GameConfig> = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 30 },
  hard: { rows: 16, cols: 16, mines: 60 },
};

interface MinesweeperProps {
  onClose?: () => void;
}

const Minesweeper: React.FC<MinesweeperProps> = ({ onClose }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [flagsLeft, setFlagsLeft] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [bestTimes, setBestTimes] = useState<Record<Difficulty, number>>({
    easy: Infinity,
    medium: Infinity,
    hard: Infinity,
  });

  useEffect(() => {
    const saved = localStorage.getItem('minesweeper-best-times');
    if (saved) {
      setBestTimes(JSON.parse(saved));
    }
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameStatus]);

  const initializeGame = () => {
    const config = DIFFICULTIES[difficulty];
    const newBoard: Cell[][] = Array(config.rows)
      .fill(null)
      .map(() =>
        Array(config.cols)
          .fill(null)
          .map(() => ({
            isMine: false,
            adjacentMines: 0,
            state: 'hidden' as CellState,
          }))
      );

    let minesPlaced = 0;
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows);
      const col = Math.floor(Math.random() * config.cols);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 &&
                newRow < config.rows &&
                newCol >= 0 &&
                newCol < config.cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].adjacentMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameStatus('playing');
    setFlagsLeft(config.mines);
    setTimer(0);
    setTimerActive(false);
  };

  const revealCell = (row: number, col: number) => {
    if (gameStatus !== 'playing' || board[row][col].state !== 'hidden') return;

    if (!timerActive) setTimerActive(true);

    const newBoard = [...board.map((r) => [...r])];
    const cell = newBoard[row][col];

    if (cell.isMine) {
      cell.state = 'revealed';
      setBoard(newBoard);
      setGameStatus('lost');
      setTimerActive(false);
      revealAllMines(newBoard);
      return;
    }

    const reveal = (r: number, c: number) => {
      if (
        r < 0 ||
        r >= newBoard.length ||
        c < 0 ||
        c >= newBoard[0].length ||
        newBoard[r][c].state !== 'hidden'
      ) {
        return;
      }

      newBoard[r][c].state = 'revealed';

      if (newBoard[r][c].adjacentMines === 0 && !newBoard[r][c].isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(r + dr, c + dc);
          }
        }
      }
    };

    reveal(row, col);
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameStatus !== 'playing') return;

    if (!timerActive) setTimerActive(true);

    const newBoard = [...board.map((r) => [...r])];
    const cell = newBoard[row][col];

    if (cell.state === 'hidden') {
      if (flagsLeft > 0) {
        cell.state = 'flagged';
        setFlagsLeft(flagsLeft - 1);
      }
    } else if (cell.state === 'flagged') {
      cell.state = 'hidden';
      setFlagsLeft(flagsLeft + 1);
    }

    setBoard(newBoard);
  };

  const revealAllMines = (boardToReveal: Cell[][]) => {
    const newBoard = boardToReveal.map((row) =>
      row.map((cell) => ({
        ...cell,
        state: cell.isMine ? ('revealed' as CellState) : cell.state,
      }))
    );
    setBoard(newBoard);
  };

  const checkWin = (currentBoard: Cell[][]) => {
    const allNonMinesRevealed = currentBoard.every((row) =>
      row.every((cell) => cell.isMine || cell.state === 'revealed')
    );

    if (allNonMinesRevealed) {
      setGameStatus('won');
      setTimerActive(false);

      if (timer < bestTimes[difficulty]) {
        const newBestTimes = { ...bestTimes, [difficulty]: timer };
        setBestTimes(newBestTimes);
        localStorage.setItem('minesweeper-best-times', JSON.stringify(newBestTimes));
      }
    }
  };

  const getCellColor = (adjacentMines: number): string => {
    const colors = [
      'text-gray-400',
      'text-blue-600',
      'text-green-600',
      'text-red-600',
      'text-purple-700',
      'text-orange-600',
      'text-cyan-600',
      'text-pink-600',
      'text-yellow-600',
    ];
    return colors[adjacentMines] || 'text-gray-400';
  };

  const getCellSize = () => {
    const config = DIFFICULTIES[difficulty];
    if (config.rows <= 8) return 'w-12 h-12 text-lg';
    if (config.rows <= 12) return 'w-10 h-10 text-base';
    return 'w-8 h-8 text-sm';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bomb className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Buscaminas
            </h1>
            <Bomb className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-gray-600">¡Encuentra todas las minas sin detonar ninguna!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    difficulty === diff
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {diff === 'easy' && '🟢 Fácil'}
                  {diff === 'medium' && '🟡 Medio'}
                  {diff === 'hard' && '🔴 Difícil'}
                </button>
              ))}
            </div>

            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Nuevo Juego
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border-2 border-red-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flag className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">Banderas</span>
              </div>
              <div className="text-3xl font-bold text-red-700">{flagsLeft}</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border-2 border-blue-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                {gameStatus === 'playing' && <Smile className="w-5 h-5 text-blue-600" />}
                {gameStatus === 'won' && <Trophy className="w-5 h-5 text-yellow-600" />}
                {gameStatus === 'lost' && <Skull className="w-5 h-5 text-red-600" />}
                <span className="text-sm font-medium text-blue-800">Tiempo</span>
              </div>
              <div className="text-3xl font-bold text-blue-700">{formatTime(timer)}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border-2 border-purple-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Mejor</span>
              </div>
              <div className="text-3xl font-bold text-purple-700">
                {bestTimes[difficulty] === Infinity ? '--:--' : formatTime(bestTimes[difficulty])}
              </div>
            </div>
          </div>

          {gameStatus === 'won' && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <span className="text-2xl font-bold text-green-800">¡Ganaste!</span>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-green-700">Completado en {formatTime(timer)}</p>
              {timer === bestTimes[difficulty] && (
                <p className="text-green-600 font-semibold mt-1">🎉 ¡Nuevo récord personal!</p>
              )}
            </div>
          )}

          {gameStatus === 'lost' && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bomb className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold text-red-800">¡Boom! Perdiste</span>
                <Bomb className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-700">¡Inténtalo de nuevo!</p>
            </div>
          )}

          <div className="flex justify-center overflow-x-auto pb-4">
            <div className="inline-block bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl shadow-inner">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => revealCell(rowIndex, colIndex)}
                      onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                      disabled={gameStatus !== 'playing'}
                      className={`
                        ${getCellSize()}
                        flex items-center justify-center font-bold border transition-all
                        ${
                          cell.state === 'hidden'
                            ? 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 shadow-md hover:scale-105 cursor-pointer'
                            : cell.state === 'flagged'
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md'
                            : cell.isMine
                            ? 'bg-gradient-to-br from-red-500 to-red-600'
                            : cell.adjacentMines > 0
                            ? 'bg-white'
                            : 'bg-gray-50'
                        }
                        ${gameStatus !== 'playing' ? 'cursor-not-allowed' : ''}
                      `}
                    >
                      {cell.state === 'revealed' && cell.isMine && (
                        <Bomb className="w-5 h-5 text-white" />
                      )}
                      {cell.state === 'flagged' && <Flag className="w-4 h-4 text-white" />}
                      {cell.state === 'revealed' && !cell.isMine && cell.adjacentMines > 0 && (
                        <span className={getCellColor(cell.adjacentMines)}>
                          {cell.adjacentMines}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📖</span> Cómo Jugar
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Click izquierdo:</span> Revelar celda
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Click derecho:</span> Colocar/quitar bandera
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Objetivo:</span> Revelar todas las celdas sin minas
              </p>
              <p>
                <span className="font-semibold text-gray-800">Números:</span> Indican minas adyacentes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
