import { generateRandomPiece } from './helpers.js';

describe('helpers tests', () => {
  describe('generateRandomPiece', () => {
    test('should generate a valid piece', () => {
      const piece = generateRandomPiece();
      const validTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];

      expect(piece).toMatchObject({
        rotation: 0,
        x: 4,
        y: 0,
      });
      expect(validTypes).toContain(piece.type);
    });
  });
});
