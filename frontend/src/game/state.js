import { GAME_STATUS } from './constants';
import { generate7Plus2Bag, generateRandomPiece } from './helpers';

export function createBoard() {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
}

export const initialState = {
  status: GAME_STATUS.RUNNING,
  board: createBoard(),
  piece: generateRandomPiece(),
  nextPieces: generate7Plus2Bag(),
  score: 0,
  clearedLines: 0,
};
