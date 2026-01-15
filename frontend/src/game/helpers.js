import { TETROMINOS } from './constants.js';

export function renderBoard(state) {
  const board = state.board.map(row => [...row]);
  const matrix = TETROMINOS[state.piece.type][state.piece.rotation];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x]) {
        const by = state.piece.y + y;
        const bx = state.piece.x + x;
        if (by >= 0 && by < 20 && bx >= 0 && bx < 10) {
          board[by][bx] = 1;
        }
      }
    }
  }

  return board;
}

export function canMove(board, piece, dx = 0, dy = 0) {
  const matrix = TETROMINOS[piece.type][piece.rotation];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) continue;

      const nx = piece.x + x + dx;
      const ny = piece.y + y + dy;

      if (nx < 0 || nx >= 10 || ny >= 20) return false;
      if (ny >= 0 && board[ny][nx] === 1) return false;
    }
  }
  return true;
}

export function clearLines(board, lines) {
  const clearedBoard = [];
  let clearedLines = lines;

  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y].every(cell => cell === 1)) {
      clearedLines++;
    } else {
      clearedBoard.unshift(board[y]);
    }
  }

  while (clearedBoard.length < 20) {
    clearedBoard.unshift(Array(10).fill(0));
  }

  return { clearedBoard, clearedLines };
}

export function updateScore(score, board) {
  const scoreSystem = [0, 100, 300, 500, 800];
  let linesCleared = 0;

  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y].every(cell => cell === 1)) linesCleared++;
  }

  return scoreSystem[linesCleared] + score;
}

export const generateRandomPiece = () => {
  const keys = Object.keys(TETROMINOS);
  const type = keys[Math.floor(Math.random() * keys.length)];

  return {
    type,
    rotation: 0,
    x: 4,
    y: 0,
  };
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generate7Plus2Bag() {
  const keys = Object.keys(TETROMINOS);
  const bag = [...keys];

  for (let i = 0; i < 2; i++) {
    const randomType = keys[Math.floor(Math.random() * keys.length)];
    bag.push(randomType);
  }

  const types = shuffle(bag);
  const pieces = types.map(type => ({
    type,
    rotation: 0,
    x: 4,
    y: 0,
  }));

  return pieces;
}

export function updatePieces(nextPieces) {
  let newNextPieces = [...nextPieces];
  const newPiece = newNextPieces.shift();

  if (newNextPieces.length < 4) {
    newNextPieces = [...newNextPieces, ...generate7Plus2Bag()];
  }

  return { newPiece, newNextPieces };
}
