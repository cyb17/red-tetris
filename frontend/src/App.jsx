import { useEffect, useReducer } from 'react';
import { reducer } from './game/reducer';
import { initialState } from './game/state';
import { renderBoard } from './game/helpers';
import { EVENTS } from './game/constants';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: EVENTS.TICK });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') {
        dispatch({ type: EVENTS.MOVE_LEFT });
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: EVENTS.MOVE_RIGHT });
      } else if (e.key === 'ArrowDown') {
        dispatch({ type: EVENTS.SOFT_DROP });
      } else if (e.key === 'ArrowUp') {
        dispatch({ type: EVENTS.ROTATE });
      } else if (e.key === ' ') {
        dispatch({ type: EVENTS.HARD_DROP });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
