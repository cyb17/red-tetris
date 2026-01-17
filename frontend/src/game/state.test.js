import { generateRandomPiece, generate7Plus2Bag } from './state';

describe('state tests', () => {
  describe('generateRandomPiece', () => {
    test('should generate a valid piece', () => {
      const piece = generateRandomPiece();
      const validTypes = ['I', 'O', 'T', 'L', 'J', 'Z', 'S'];

      expect(piece).toMatchObject({
        rotation: 0,
        x: 3,
        y: -1,
      });
      expect(validTypes).toContain(piece.type);
    });
  });

  describe('generate7Plus2Bag', () => {
    test('should generate 9 pieces (7 types + 2 random)', () => {
      const bag = generate7Plus2Bag();
      expect(bag).toHaveLength(9);
    });

    test('should contain all 7 tetromino types at least once', () => {
      const bag = generate7Plus2Bag();
      const types = bag.map(p => p.type);
      const uniqueTypes = new Set(types);
      expect(uniqueTypes.size).toBe(7);
    });

    test('should have pieces with correct format', () => {
      const bag = generate7Plus2Bag();
      bag.forEach(piece => {
        expect(piece).toMatchObject({ rotation: 0, x: 3, y: -1 });
        expect(piece.type).toBeDefined();
      });
    });
  });
});
