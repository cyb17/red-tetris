import { TETROMINOS } from './constants.js';
import { generate7Plus2Bag } from './state.js';

export function mergePieceToBoard(board, piece) {
  const newBoard = board.map(row => [...row]);
  const matrix = TETROMINOS[piece.type][piece.rotation];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) continue;

      const by = piece.y + y;
      const bx = piece.x + x;

      if (by < 0) continue;

      newBoard[by][bx] = 1;
    }
  }

  return newBoard;
}

export function canMove(board, piece, dx, dy) {
  const matrix = TETROMINOS[piece.type][piece.rotation];

  for (let y = matrix.length - 1; y >= 0; y--) {
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

export function updatePieces(nextPieces) {
  let newNextPieces = [...nextPieces];
  const newPiece = newNextPieces.shift();

  if (newNextPieces.length < 4) {
    newNextPieces = [...newNextPieces, ...generate7Plus2Bag()];
  }

  return { newPiece, newNextPieces };
}
