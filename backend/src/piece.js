import { getRandomRotationIndex, getRandomType } from './helpers.js';
import { TETROMINOS } from './constant.js';

export class Piece {
  constructor() {
    this.type = getRandomType();
    this.rotations = TETROMINOS[this.type];
    this.rotationIndex = getRandomRotationIndex(this.type);
  }

  getPieceInitialState() {
    return {
      type: this.type,
      rotations: this.rotations,
      rotationIndex: this.rotationIndex,
    };
  }

  rotate() {
    return Math.floor(this.rotationIndex++ % this.rotations.length);
  }
}
