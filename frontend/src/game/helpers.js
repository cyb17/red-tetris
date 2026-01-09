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

export function canMove(board, piece, dx, dy) {
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

export function canRotate(board, piece, offsetX = 0, offsetY = 0) {
  const matrix = TETROMINOS[piece.type][piece.rotation];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) continue;

      const nx = piece.x + x + offsetX;
      const ny = piece.y + y + offsetY;

      if (nx < 0 || nx >= 10 || ny >= 20) return false;
      if (ny >= 0 && board[ny][nx] === 1) return false;
    }
  }
  return true;
}

export function clearLines(board) {
  const newBoard = [];
  let linesCleared = 0;

  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y].every(cell => cell === 1)) {
      linesCleared++;
    } else {
      newBoard.unshift(board[y]);
    }
  }

  while (newBoard.length < 20) {
    newBoard.unshift(Array(10).fill(0));
  }

  return newBoard;
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

export function isStillAlive(board) {}
