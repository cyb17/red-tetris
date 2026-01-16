import { useEffect, useReducer } from 'react';
import { reducer } from './game/reducer';
import { initialState } from './game/state';
import { mergePieceToBoard } from './game/helpers';
import { EVENTS, GAME_STATUS, TETROMINOS } from './game/constants';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status === GAME_STATUS.GAME_OVER) return;

    const id = setInterval(() => {
      dispatch({ type: EVENTS.TICK });
    }, 1000);

    return () => clearInterval(id);
  }, [state.status]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (state.status === GAME_STATUS.GAME_OVER) return;

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
  }, [state.status]);

  const board = mergePieceToBoard(state.board, state.piece);
  const matrix = TETROMINOS[state.piece.type][state.piece.rotation];

  console.log('STATE:', state);
  console.log('MATRIX:', matrix);

  return (
    <>
      <div>SCORE: {state.score}</div>
      <div>LINES: {state.clearedLines}</div>
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
        {state.status === GAME_STATUS.GAME_OVER ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              color: 'white',
            }}
          >
            Game Over
          </div>
        ) : null}
      </div>
    </>
  );
}
