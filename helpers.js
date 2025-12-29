import { TETROMINOS } from './tetrominos';

export const getRandomType = () => {
  const tetrominosTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
  const randomTypeIndex = Math.floor(Math.random() * tetrominosTypes.length);
  return tetrominosTypes[randomTypeIndex];
};

export const getRandomRotationIndex = type => Math.floor(Math.random() * TETROMINOS[type].length);
