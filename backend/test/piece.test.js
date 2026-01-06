import { Piece } from '../src/piece.js';
import { TETROMINOS } from '../src/constant.js';

describe('Piece', () => {
  describe('constructor', () => {
    test('should create a piece with valid type', () => {
      const piece = new Piece();
      const validTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];

      expect(validTypes).toContain(piece.type);
    });

    test('should have rotations corresponding to its type', () => {
      const piece = new Piece();

      expect(piece.rotations).toBe(TETROMINOS[piece.type]);
      expect(piece.rotations).toBeDefined();
      expect(Array.isArray(piece.rotations)).toBe(true);
    });

    test('should have valid rotation index', () => {
      const piece = new Piece();

      expect(piece.rotationIndex).toBeGreaterThanOrEqual(0);
      expect(piece.rotationIndex).toBeLessThan(piece.rotations.length);
    });
  });

  describe('getPieceInitialState', () => {
    test('should return an object with all piece properties', () => {
      const piece = new Piece();
      const state = piece.getPieceInitialState();

      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('rotations');
      expect(state).toHaveProperty('rotationIndex');
    });

    test('should return correct values', () => {
      const piece = new Piece();
      const state = piece.getPieceInitialState();

      expect(state.type).toBe(piece.type);
      expect(state.rotations).toBe(piece.rotations);
      expect(state.rotationIndex).toBe(piece.rotationIndex);
    });

    test('should return references to piece objects', () => {
      const piece = new Piece();
      const state = piece.getPieceInitialState();

      expect(state.rotations).toBe(piece.rotations);
    });
  });

  describe('rotate', () => {
    test('should increment rotation index', () => {
      const piece = new Piece();
      const initialIndex = piece.rotationIndex;

      piece.rotate();

      expect(piece.rotationIndex).toBe(initialIndex + 1);
    });

    test('should wrap around when reaching max rotations', () => {
      const piece = new Piece();
      piece.rotationIndex = piece.rotations.length - 1;

      piece.rotate();

      expect(piece.rotationIndex).toBe(piece.rotations.length);
    });

    test('should return the old rotation index before increment', () => {
      const piece = new Piece();
      piece.rotationIndex = 2;

      const result = piece.rotate();

      expect(result).toBe(2); // Returns old value due to post-increment
      expect(piece.rotationIndex).toBe(3); // But index is incremented
    });

    test('should handle multiple rotations', () => {
      const piece = new Piece();
      piece.rotationIndex = 0;
      const rotationsCount = piece.rotations.length;

      for (let i = 0; i < rotationsCount * 2; i++) {
        piece.rotate();
      }

      expect(piece.rotationIndex).toBe(rotationsCount * 2);
    });
  });
});
