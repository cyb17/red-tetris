import { GAME_STATUS, TETROMINOS } from './constants';

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
    x: 3,
    y: -1,
  }));

  return pieces;
}

export const generateRandomPiece = () => {
  const keys = Object.keys(TETROMINOS);
  const type = keys[Math.floor(Math.random() * keys.length)];

  return {
    type,
    rotation: 0,
    x: 3,
    y: -1,
  };
};

export function createBoard() {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
}

export const initialState = {
  status: GAME_STATUS.WAITING,
  board: createBoard(),
  piece: generateRandomPiece(),
  nextPieces: generate7Plus2Bag(),
  score: 0,
  clearedLines: 0,
};
