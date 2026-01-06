import { Game } from '../src/game.js';

describe('Game', () => {
  describe('constructor', () => {
    test('should create a game with correct initial properties', () => {
      const game = new Game('single');

      expect(game.mode).toBe('single');
      expect(game.board).toHaveLength(20);
      expect(game.board[0]).toHaveLength(10);
      expect(game.currentPosition).toEqual({ x: 0, y: 0 });
      expect(game.penaltyLine).toBe(0);
      expect(game.score).toBe(0);
      expect(game.level).toBe(0);
      expect(game.status).toBe('not started');
      expect(game.currentPiece).toBeDefined();
      expect(game.nextPiece).toBeDefined();
    });
  });

  describe('getGameInitialState', () => {
    test('should return an object with all game properties', () => {
      const game = new Game('multiplayer');
      const state = game.getGameInitialState();

      expect(state).toHaveProperty('board');
      expect(state).toHaveProperty('currentPiece');
      expect(state).toHaveProperty('currentPosition');
      expect(state).toHaveProperty('nextPiece');
      expect(state).toHaveProperty('penaltyLine');
      expect(state).toHaveProperty('score');
      expect(state).toHaveProperty('level');
      expect(state).toHaveProperty('status');
      expect(state).toHaveProperty('mode');
    });

    test('should return correct initial values', () => {
      const game = new Game('single');
      const state = game.getGameInitialState();

      expect(state.board).toHaveLength(20);
      expect(state.board[0]).toHaveLength(10);
      expect(state.currentPosition).toEqual({ x: 0, y: 0 });
      expect(state.penaltyLine).toBe(0);
      expect(state.score).toBe(0);
      expect(state.level).toBe(0);
      expect(state.status).toBe('not started');
      expect(state.mode).toBe('single');
    });

    test('should return references to game objects', () => {
      const game = new Game('single');
      const state = game.getGameInitialState();

      expect(state.board).toBe(game.board);
      expect(state.currentPiece).toBe(game.currentPiece);
      expect(state.nextPiece).toBe(game.nextPiece);
    });
  });
});
