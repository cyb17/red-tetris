import { EVENTS } from './events';
import { TETROMINOS } from './tetrominos';

function canMove(state, dx, dy) {
  const matrix = TETROMINOS[state.piece.type][0];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!matrix[y][x]) continue;

      const nx = state.piece.x + x + dx;
      const ny = state.piece.y + y + dy;

      if (ny >= 20 || nx < 0 || nx >= 10) return false;
    }
  }
  return true;
}

export function reducer(state, action) {
  switch (action.type) {
    case EVENTS.TICK:
      if (canMove(state, 0, 1)) {
        return {
          ...state,
          piece: {
            ...state.piece,
            y: state.piece.y + 1,
          },
        };
      }
      return state;

    default:
      return state;
  }
}
