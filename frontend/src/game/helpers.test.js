import { canMove, clearLines, mergePieceToBoard, updateScore } from './helpers.js';
import { createBoard } from './state.js';

describe('helpers tests', () => {
  describe('mergePieceToBoard', () => {
    test('should not merge piece parts outside board (y < `0)', () => {
      const board = createBoard(20, 10);
      const piece = { type: 'I', rotation: 1, x: 0, y: -2 };

      const newBoard = mergePieceToBoard(board, piece);
      const filledCells = newBoard.flat().filter(cell => cell === 1).length;

      expect(filledCells).toBe(2);
      expect(newBoard[0][2]).toBe(1);
      expect(newBoard[1][2]).toBe(1);
    });
  });

  describe('canMove', () => {
    const emptyBoard = createBoard(20, 10);

    test('should return true for valid movements', () => {
      const piece = { type: 'I', rotation: 0, x: 3, y: 0 };
      expect(canMove(emptyBoard, piece, 0, 0)).toBe(true);
      expect(canMove(emptyBoard, piece, 0, 1)).toBe(true);
      expect(canMove(emptyBoard, piece, 1, 0)).toBe(true);
      expect(canMove(emptyBoard, piece, -1, 0)).toBe(true);
    });

    test('should return false for wall collisions', () => {
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 0, y: 0 }, -1, 0)).toBe(false);
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 9, y: 0 }, 1, 0)).toBe(false);
      expect(canMove(emptyBoard, { type: 'I', rotation: 0, x: 3, y: 19 }, 0, 1)).toBe(false);
    });

    test('should return false for block collision', () => {
      const boardWithBlock = emptyBoard.map(row => [...row]);
      boardWithBlock[10][4] = 1;
      expect(canMove(boardWithBlock, { type: 'O', rotation: 0, x: 3, y: 9 }, 0, 1)).toBe(false);
    });
  });

  describe('clearLines', () => {
    test('should clear complete lines and maintain board size', () => {
      const board = createBoard(20, 10);
      board[19] = Array(10).fill(1);
      board[18] = Array(10).fill(1);

      const { clearedBoard, clearedLines } = clearLines(board, 5);
      expect(clearedLines).toBe(7);
      expect(clearedBoard.length).toBe(20);
      expect(clearedBoard[19]).toEqual(Array(10).fill(0));
    });

    test('should not clear incomplete lines', () => {
      const board = createBoard(20, 10);
      board[19] = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1];

      const { clearedLines } = clearLines(board, 0);
      expect(clearedLines).toBe(0);
    });
  });

  describe('updateScore', () => {
    test('should return current score when no lines cleared', () => {
      const board = createBoard(20, 10);
      expect(updateScore(100, board)).toBe(100);
    });

    test('should update score for cleared lines', () => {
      const board = createBoard(20, 10);
      board[19] = Array(10).fill(1);
      board[18] = Array(10).fill(1);
      board[17] = Array(10).fill(1);
      board[16] = Array(10).fill(1);

      expect(updateScore(0, board)).toBe(800);
      expect(updateScore(100, board)).toBe(900);
    });
  });
});
