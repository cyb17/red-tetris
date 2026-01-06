import { TETROMINOS } from './constant.js';

export const getRandomType = () => {
  const tetrominosTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
  const randomTypeIndex = Math.floor(Math.random() * tetrominosTypes.length);
  return tetrominosTypes[randomTypeIndex];
};

export const getRandomRotationIndex = type => Math.floor(Math.random() * TETROMINOS[type].length);

export const moveLeft = currentPosition =>
  currentPosition.x > 0 ? { x: currentPosition.x - 1, y: currentPosition.y } : currentPosition;

export const moveRight = (board, currentPosition) =>
  currentPosition.x < board[0].length - 1
    ? { x: currentPosition.x + 1, y: currentPosition.y }
    : currentPosition;

export const moveDown = (board, currentPosition) =>
  currentPosition.y < board.length - 1
    ? { x: currentPosition.x, y: currentPosition.y + 1 }
    : currentPosition;

export const hardDrop = (board, currentPosition) => {};
