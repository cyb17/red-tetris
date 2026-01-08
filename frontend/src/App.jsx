import { useEffect, useReducer } from 'react';
import { reducer } from './game/reducer';
import { initialState } from './game/state';
import { EVENTS } from './game/events';
import { TETROMINOS } from './game/tetrominos';

function renderBoard(state) {
  const board = state.board.map(row => [...row]);
  const matrix = TETROMINOS[state.piece.type][0];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x]) {
        const by = state.piece.y + y;
        const bx = state.piece.x + x;
        if (by >= 0 && by < 20) {
          board[by][bx] = 1;
        }
      }
    }
  }

  return board;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: EVENTS.TICK });
    }, 500);

    return () => clearInterval(id);
  }, []);

  const board = renderBoard(state);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(20, 20px)',
        gridTemplateColumns: 'repeat(10, 20px)',
        gap: '1px',
      }}
    >
      {board.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 20,
            background: cell ? '#4ade80' : '#111',
          }}
        />
      ))}
    </div>
  );
}
