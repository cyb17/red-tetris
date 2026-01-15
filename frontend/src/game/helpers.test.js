import {
  generateRandomPiece,
  canMove,
  generate7Plus2Bag,
  clearLines,
  updateScore,
} from './helpers.js';

describe('helpers tests', () => {
  describe('canMove', () => {
    const emptyBoard = Array(20)
      .fill(null)
      .map(() => Array(10).fill(0));

    test('should return true for valid movements', () => {
      const piece = { type: 'I', rotation: 0, x: 4, y: 0 };
      expect(canMove(emptyBoard, piece, 0, 0)).toBe(true);
      expect(canMove(emptyBoard, piece, 0, 1)).toBe(true);
      expect(canMove(emptyBoard, piece, 1, 0)).toBe(true);
      expect(canMove(emptyBoard, piece, -1, 0)).toBe(true);
    });

    test('should return false for wall collisions', () => {
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 0, y: 0 }, -1, 0)).toBe(false);
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 9, y: 0 }, 1, 0)).toBe(false);
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 4, y: 19 }, 0, 1)).toBe(false);
    });

    test('should return false for block collision', () => {
      const boardWithBlock = emptyBoard.map(row => [...row]);
      boardWithBlock[10][5] = 1;
      expect(canMove(boardWithBlock, { type: 'O', rotation: 0, x: 4, y: 9 }, 0, 1)).toBe(false);
    });
  });

  describe('updateScore', () => {
    test('should return current score when no lines cleared', () => {
      const board = Array(20)
        .fill(null)
        .map(() => Array(10).fill(0));
      expect(updateScore(100, board)).toBe(100);
    });

    test('should update score for cleared lines', () => {
      const board = Array(20)
        .fill(null)
        .map(() => Array(10).fill(0));
      board[19] = Array(10).fill(1);
      board[18] = Array(10).fill(1);
      board[17] = Array(10).fill(1);
      board[16] = Array(10).fill(1);

      expect(updateScore(0, board)).toBe(800);
      expect(updateScore(100, board)).toBe(900);
    });
  });

  describe('clearLines', () => {
    test('should clear complete lines and maintain board size', () => {
      const board = Array(20)
        .fill(null)
        .map(() => Array(10).fill(0));
      board[19] = Array(10).fill(1);
      board[18] = Array(10).fill(1);

      const { clearedBoard, clearedLines } = clearLines(board, 5);
      expect(clearedLines).toBe(7);
      expect(clearedBoard.length).toBe(20);
      expect(clearedBoard[19]).toEqual(Array(10).fill(0));
    });

    test('should not clear incomplete lines', () => {
      const board = Array(20)
        .fill(null)
        .map(() => Array(10).fill(0));
      board[19] = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1];

      const { clearedLines } = clearLines(board, 0);
      expect(clearedLines).toBe(0);
    });
  });

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
        expect(piece).toMatchObject({ rotation: 0, x: 4, y: 0 });
        expect(piece.type).toBeDefined();
      });
    });
  });
});
