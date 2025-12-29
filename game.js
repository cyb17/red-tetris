import { TETROMINOS } from './tetrominos';

class Piece {
  constructor() {
    this.type = getRandomType();
    this.rotations = TETROMINOS[this.type];
    this.ratationIndex = 'random ratation index';
    this.position = { x: 5, y: 0 };
  }
}

class Player {
  constructor() {
    this.name = 'player name';
  }
}

class Game {
  constructor() {
    this.board;
    this.currentPiece = new Piece();
    this.nextPiece = new Piece();
    this.penaltyLine = 0;
    this.level = 0;
    this.status = 'running | paused | game over';
    this.score = 0;
  }
}
