import { TETROMINOS } from './tetrominos';
import { getRandomType, getRandomRotationIndex } from './helpers';


class Piece {
  constructor() {
    this.type = getRandomType();
    this.rotations = TETROMINOS[this.type];
    this.ratationIndex = getRandomRotationIndex();
    this.position = { x: 5, y: 0 };
  }

  rotatePiece() {}
}

class Player {
  constructor(name) {
    this.name = name;
  }
}

class Game {
  constructor(mode) {
    this.board;
    this.currentPiece = new Piece();
    this.nextPiece = new Piece();
    this.penaltyLine = 0;
    this.score = 0;
    this.level = 0;
    this.status = 'running | paused | game over';
	this.mode = mode;
  }
}
