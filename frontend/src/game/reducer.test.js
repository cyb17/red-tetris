import { describe, test, expect, beforeEach } from '@jest/globals';
import { reducer } from './reducer.js';
import { EVENTS, GAME_STATUS } from './constants.js';
import { createBoard } from './state.js';

describe('reducer', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      board: createBoard(),
      piece: { type: 'I', rotation: 0, x: 4, y: 5 },
      nextPieces: [
        { type: 'O', rotation: 0, x: 3, y: -1 },
        { type: 'T', rotation: 0, x: 3, y: -1 },
      ],
      score: 0,
      clearedLines: 0,
      status: GAME_STATUS.RUNNING,
    };
  });

  describe('MOVE_LEFT', () => {
    test('should move piece left if possible', () => {
      const result = reducer(mockState, { type: EVENTS.MOVE_LEFT });
      expect(result.piece.x).toBe(3);
    });

    test('should not move piece at left wall', () => {
      mockState.piece.x = 0;
      const result = reducer(mockState, { type: EVENTS.MOVE_LEFT });
      expect(result).toBe(mockState);
    });
  });

  describe('MOVE_RIGHT', () => {
    test('should move piece right if possible', () => {
      const result = reducer(mockState, { type: EVENTS.MOVE_RIGHT });
      expect(result.piece.x).toBe(5);
    });

    test('should not move piece at right wall', () => {
      mockState.piece.x = 9;
      const result = reducer(mockState, { type: EVENTS.MOVE_RIGHT });
      expect(result).toBe(mockState);
    });
  });

  describe('SOFT_DROP', () => {
    test('should move piece down one line', () => {
      const result = reducer(mockState, { type: EVENTS.SOFT_DROP });
      expect(result.piece.y).toBe(6);
    });

    test('should not move piece at bottom', () => {
      mockState.piece.y = 18;
      const result = reducer(mockState, { type: EVENTS.SOFT_DROP });
      expect(result).toBe(mockState);
    });
  });

  describe('TICK', () => {
    test('should move piece down automatically', () => {
      const result = reducer(mockState, { type: EVENTS.TICK });
      expect(result.piece.y).toBe(6);
    });

    test('should lock piece at bottom', () => {
      mockState.piece.y = 18;
      const result = reducer(mockState, { type: EVENTS.TICK });
      expect(result.piece).toEqual(mockState.nextPieces[0]);
      expect(result.nextPieces.length).toBeGreaterThan(0);
    });
  });

  describe('ROTATE', () => {
    test('should rotate piece clockwise', () => {
      const result = reducer(mockState, { type: EVENTS.ROTATE });
      expect(result.piece.rotation).toBe(1);
    });

    test('should wrap rotation to 0 after last rotation', () => {
      mockState.piece.rotation = 3;
      const result = reducer(mockState, { type: EVENTS.ROTATE });
      expect(result.piece.rotation).toBe(0);
    });

    test('should not rotate if blocked', () => {
      mockState.piece = { type: 'I', rotation: 0, x: 0, y: 18 };
      const result = reducer(mockState, { type: EVENTS.ROTATE });
      expect(result.piece.rotation).toBe(0);
    });

    test('should apply wall kick when needed', () => {
      mockState.piece = { type: 'I', rotation: 0, x: 9, y: 5 };
      const result = reducer(mockState, { type: EVENTS.ROTATE });
      expect(result.piece.rotation).toBe(1);
      expect(result.piece.x).toBeLessThan(9);
    });
  });

  describe('HARD_DROP', () => {
    test('should drop piece to bottom and lock it', () => {
      const result = reducer(mockState, { type: EVENTS.HARD_DROP });
      expect(result.piece).toEqual(mockState.nextPieces[0]);
      expect(result.nextPieces.length).toBeGreaterThan(0);
    });
  });

  describe('LOCK_PIECE', () => {
    test('should spawn new piece', () => {
      const result = reducer(mockState, { type: EVENTS.LOCK_PIECE });
      expect(result.piece).toEqual(mockState.nextPieces[0]);
      expect(result.nextPieces.length).toBeGreaterThan(0);
    });

    test('should clear complete lines', () => {
      mockState.board[19] = Array(10).fill(1);
      mockState.board[18] = Array(10).fill(1);
      mockState.piece = { type: 'O', rotation: 0, x: 4, y: 17 };

      const result = reducer(mockState, { type: EVENTS.LOCK_PIECE });
      expect(result.clearedLines).toBeGreaterThan(mockState.clearedLines);
    });

    test('should set GAME_OVER when new piece collides', () => {
      // Fill board so high that new piece at spawn position cannot move
      mockState.board[0][3] = 1;
      mockState.board[0][4] = 1;
      mockState.board[0][5] = 1;
      mockState.board[0][6] = 1;

      const result = reducer(mockState, { type: EVENTS.LOCK_PIECE });
      expect(result.status).toBe(GAME_STATUS.GAME_OVER);
    });
  });

  describe('default', () => {
    test('should return unchanged state for unknown action', () => {
      const result = reducer(mockState, { type: 'UNKNOWN_ACTION' });
      expect(result).toBe(mockState);
    });
  });
});
