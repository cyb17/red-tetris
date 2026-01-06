import { TETROMINOS } from '../src/constant.js';
import {
  moveLeft,
  moveRight,
  moveDown,
  getRandomType,
  getRandomRotationIndex,
} from '../src/helpers.js';

describe('Helpers', () => {
  describe('getRandomType', () => {
    const validTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];

    test('should return a valid tetromino type', () => {
      for (let i = 0; i < 20; i++) {
        expect(validTypes).toContain(getRandomType());
      }
    });

    test('should return different types on multiple calls', () => {
      const results = new Set();
      for (let i = 0; i < 20; i++) {
        results.add(getRandomType());
      }
      expect(results.size).toBeGreaterThan(1);
      expect(results.size).toBeLessThan(8);
    });
  });

  describe('getRandomRotationIndex', () => {
    test('should return a valid rotation index no matter the type of tetrominos', () => {
      const types = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
      types.forEach(type => {
        const result = getRandomRotationIndex(type);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(TETROMINOS[type].length);
      });
    });

    test('should return different indices on multiple calls for type with multiple rotations', () => {
      const results = new Set();
      for (let i = 0; i < 20; i++) {
        results.add(getRandomRotationIndex('T'));
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('moveLeft', () => {
    it('should move position to the left', () => {
      const position = { x: 5, y: 10 };
      const newPosition = moveLeft(position);
      expect(newPosition).toEqual({ x: 4, y: 10 });
    });

    it('should not exceed the left border', () => {
      const position = { x: 0, y: 10 };
      const newPosition = moveLeft(position);
      expect(newPosition).toEqual({ x: 0, y: 10 });
    });
  });

  describe('moveRight', () => {
    const board = Array.from({ length: 20 }, () => Array(10).fill(0));

    it('should move position to the right', () => {
      const position = { x: 5, y: 10 };
      const newPosition = moveRight(board, position);
      expect(newPosition).toEqual({ x: 6, y: 10 });
    });

    it('should not exceed the right border', () => {
      const position = { x: 9, y: 10 };
      const newPosition = moveRight(board, position);
      expect(newPosition).toEqual({ x: 9, y: 10 });
    });
  });

  describe('moveDown', () => {
    const board = Array.from({ length: 20 }, () => Array(10).fill(0));

    it('should move position down', () => {
      const position = { x: 5, y: 10 };
      const newPosition = moveDown(board, position);
      expect(newPosition).toEqual({ x: 5, y: 11 });
    });

    it('should not exceed the bottom border', () => {
      const position = { x: 5, y: 19 };
      const newPosition = moveDown(board, position);
      expect(newPosition).toEqual({ x: 5, y: 19 });
    });
  });
});
