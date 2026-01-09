import { TETROMINOS, EVENTS, STATUS } from './constants.js';
import { generateRandomPiece } from './helpers.js';
import { canMove, renderBoard, clearLines, canRotate } from './helpers.js';

function movePiece(state, dx, dy) {
  if (!canMove(state.board, state.piece, dx, dy)) return state;

  return {
    ...state,
    piece: {
      ...state.piece,
      x: state.piece.x + dx,
      y: state.piece.y + dy,
    },
  };
}

function applyTick(state) {
  let newState = { ...state };

  if (!canMove(newState.board, newState.piece, 0, 1)) {
    return reducer(newState, { type: EVENTS.LOCK_PIECE });
  }

  newState.piece.y = newState.piece.y + 1;
  return newState;
}

function rotatePiece(state) {
  const newRotation = Math.floor((state.piece.rotation + 1) % TETROMINOS[state.piece.type].length);
  const newState = {
    ...state,
    piece: {
      ...state.piece,
      rotation: newRotation,
    },
  };
  if (canRotate(newState.board, newState.piece)) {
    return newState;
  }

  // wall kicks
  const wallKicks = [
    [1, 0],
    [-1, 0],
    [2, 0],
    [-2, 0],
    [0, -1],
    [1, -1],
    [-1, -1],
  ];

  for (const [dx, dy] of wallKicks) {
    if (canRotate(newState.board, newState.piece, dx, dy)) {
      newState.piece.x = state.piece.x + dx;
      newState.piece.y = state.piece.y + dy;
      return newState;
    }
  }

  return state;
}

function hardDrop(state) {
  let newState = { ...state };
  let newY = state.piece.y;
  while (canMove(newState.board, { ...newState.piece, y: newY }, 0, 1)) {
    newY++;
  }
  newState.piece.y = newY;

  return reducer(newState, { type: EVENTS.LOCK_PIECE });
}

function lockPiece(state) {
  const lockedBoard = renderBoard(state);
  const clearedBoard = clearLines(lockedBoard);
  const newPiece = generateRandomPiece();

  if (!canMove(clearedBoard, newPiece, 0, 0)) {
    return {
      ...state,
      board: clearedBoard,
      piece: newPiece,
      status: STATUS.GAME_OVER,
    };
  }

  return {
    ...state,
    board: clearedBoard,
    piece: newPiece,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EVENTS.MOVE_LEFT:
      return movePiece(state, -1, 0);
    case EVENTS.MOVE_RIGHT:
      return movePiece(state, 1, 0);
    case EVENTS.SOFT_DROP:
      return movePiece(state, 0, 1);
    case EVENTS.TICK:
      return applyTick(state);
    case EVENTS.ROTATE:
      return rotatePiece(state);
    case EVENTS.HARD_DROP:
      return hardDrop(state);
    case EVENTS.LOCK_PIECE:
      return lockPiece(state);
    default:
      return state;
  }
}
