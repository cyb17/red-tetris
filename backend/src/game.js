import { Piece } from './piece.js';

export class Game {
  constructor(mode) {
    this.board = Array.from({ length: 20 }, () => Array(10).fill(0));
    this.currentPiece = new Piece();
    this.currentPosition = { x: 0, y: 0 };
    this.nextPiece = new Piece();
    this.penaltyLine = 0;
    this.score = 0;
    this.level = 0;
    this.status = 'not started';
    this.mode = mode;
  }

  getGameInitialState() {
    return {
      board: this.board,
      currentPiece: this.currentPiece,
      currentPosition: this.currentPosition,
      nextPiece: this.nextPiece,
      penaltyLine: this.penaltyLine,
      score: this.score,
      level: this.level,
      status: this.status,
      mode: this.mode,
    };
  }
}
