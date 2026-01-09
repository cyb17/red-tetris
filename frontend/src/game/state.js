import { TETROMINOS } from './constants';

export const getRandomType = () => {
  const tetrominosTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
  const randomTypeIndex = Math.floor(Math.random() * tetrominosTypes.length);
  return tetrominosTypes[randomTypeIndex];
};

export const getRandomRotation = type => Math.floor(Math.random() * TETROMINOS[type].length);

export const generateRandomPiece = () => {
  let randomPiece = {
    type: undefined,
    rotation: undefined,
    position: {
      x: 4,
      y: 0,
    },
  };

  const keys = Object.keys(TETROMINOS);
  randomPiece.type = keys[Math.floor(Math.random() * keys.length)];

  const rotations = TETROMINOS[randomPiece.type];
  randomPiece.rotation = Math.floor(Math.random() * rotations.length);

  return randomPiece;
};

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
