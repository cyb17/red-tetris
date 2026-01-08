import { TETROMINOS } from './tetrominos';

export function createBoard() {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
}

export const initialState = {
  board: createBoard(),
  piece: {
    type: 'O',
    rotation: 0,
    x: 4,
    y: 0,
  },
};
