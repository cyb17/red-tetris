import { TETROMINOS } from './tetrominos';

export const getRandomType = () => {
  const tetrominosTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
  const randomTypeIndex = Math.floor(Math.random() * tetrominosTypes.length);
  return tetrominosTypes[randomTypeIndex];
};

export const getRandomRotation = type => Math.floor(Math.random() * TETROMINOS[type].length);

export function createBoard() {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
}

export const initialState = {
  board: createBoard(),
  piece: {
    type: getRandomType(),
    rotation: 0,
    x: 4,
    y: 0,
  },
};
