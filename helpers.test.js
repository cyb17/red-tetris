import * as helper from './helpers';
import { TETROMINOS } from './tetrominos';

describe('getRandomType', () => {
  const validTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];

  test('should return a valid tetromino type', () => {
    for (let i = 0; i < 20; i++) {
      expect(validTypes).toContain(helper.getRandomType());
    }
  });

  test('should return different types on multiple calls', () => {
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(helper.getRandomType());
    }
    expect(results.size).toBeGreaterThan(1);
    expect(results.size).toBeLessThan(8);
  });
});

describe('getRandomRotationIndex', () => {
  test('should return a valid rotation index no matter the type of tetrominos', () => {
    const types = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];
    types.forEach(type => {
      const result = helper.getRandomRotationIndex(type);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(TETROMINOS[type].length);
    });
  });

  test('should return different indices on multiple calls for type with multiple rotations', () => {
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(helper.getRandomRotationIndex('T'));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
