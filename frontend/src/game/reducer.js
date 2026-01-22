import { EVENTS, GAME_STATUS, TETROMINOS } from './constants.js';
import { canMove, clearLines, mergePieceToBoard, updatePieces, updateScore } from './helpers.js';

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
  if (!canMove(state.board, state.piece, 0, 1)) {
    return reducer(state, { type: EVENTS.LOCK_PIECE });
  }

  return {
    ...state,
    piece: {
      ...state.piece,
      y: state.piece.y + 1,
    },
  };
}

function rotatePiece(state) {
  const newRotation = (state.piece.rotation + 1) % TETROMINOS[state.piece.type].length;
  const rotatedPiece = {
    ...state.piece,
    rotation: newRotation,
  };

  if (canMove(state.board, rotatedPiece, 0, 0)) {
    return {
      ...state,
      piece: rotatedPiece,
    };
  }

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
    if (canMove(state.board, rotatedPiece, dx, dy)) {
      return {
        ...state,
        piece: {
          ...rotatedPiece,
          x: rotatedPiece.x + dx,
          y: rotatedPiece.y + dy,
        },
      };
    }
  }

  return state;
}

function hardDrop(state) {
  let newY = state.piece.y;
  while (canMove(state.board, { ...state.piece, y: newY }, 0, 1)) {
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
  const lockedBoard = mergePieceToBoard(state.board, state.piece);
  const { clearedBoard, clearedLines } = clearLines(lockedBoard, state.clearedLines);
  const { newPiece, newNextPieces } = updatePieces(state.nextPieces);
  const score = updateScore(state.score, lockedBoard);

  if (!canMove(clearedBoard, newPiece, 0, 0)) {
    return {
      ...state,
      status: GAME_STATUS.GAME_OVER,
    };
  }

  return {
    ...state,
    board: clearedBoard,
    piece: newPiece,
    nextPieces: newNextPieces,
    score: score,
    clearedLines: clearedLines,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EVENTS.START:
      return {
        ...state,
        status: GAME_STATUS.RUNNING,
      };
    case EVENTS.PAUSE:
      return {
        ...state,
        status: GAME_STATUS.PAUSED,
      };
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
