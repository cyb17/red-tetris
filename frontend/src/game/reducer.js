import { EVENTS } from './events.js';
import { TETROMINOS } from './tetrominos.js';
import { getRandomType } from './state.js';
import { canMove, renderBoard, clearLines } from './helpers.js';

function movePiece(state, dx, dy) {
  if (!canMove(state, dx, dy)) return state;

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
  if (!canMove(state, 0, 1)) return reducer(state, { type: EVENTS.LOCK_PIECE });

  return {
    ...state,
    piece: {
      ...state.piece,
      y: state.piece.y + 1,
    },
  };
}

function rotatePiece(state) {
  const newRotation = Math.floor((state.piece.rotation + 1) % TETROMINOS[state.piece.type].length);

  return {
    ...state,
    piece: {
      ...state.piece,
      rotation: newRotation,
    },
  };
}

function hardDrop(state) {
  let newY = state.piece.y;

  while (canMove({ ...state, piece: { ...state.piece, y: newY } }, 0, 1)) {
    newY++;
  }

  const newState = {
    ...state,
    piece: {
      ...state.piece,
      y: newY,
    },
  };

  return reducer(newState, { type: EVENTS.LOCK_PIECE });
}

function lockPiece(state) {
  const lockedBoard = renderBoard(state);
  const clearedBoard = clearLines(lockedBoard);

  return {
    ...state,
    board: clearedBoard,
    piece: {
      type: getRandomType(),
      rotation: 0,
      x: 4,
      y: 0,
    },
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
