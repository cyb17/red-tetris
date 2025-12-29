import { TETROMINOS } from './tetrominos';

export class Piece {
  constructor() {
    this.type = this.getRandomType();
    this.rotation = 0;
    this.rotationIndex = this.getRandomRotationIndex();
  }


}
