import { useEffect, useReducer } from 'react';
import NextPiece from '../components/NextPanel';
import Board from '../components/TetrisBoard';
import { EVENTS, GAME_STATUS } from '../game/constants';
import { mergePieceToBoard } from '../game/helpers';
import { reducer } from '../game/reducer';
import { initialState } from '../game/state';

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status !== GAME_STATUS.RUNNING) return;

    const id = setInterval(() => {
      dispatch({ type: EVENTS.TICK });
    }, 1000);

    return () => clearInterval(id);
  }, [state.status]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (state.status !== GAME_STATUS.RUNNING) return;

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

  const board =
    state.status === GAME_STATUS.WAITING
      ? state.board
      : mergePieceToBoard(state.board, state.piece);

  return (
    <div className="flex justify-center gap-5">
      <div>
        <div>
          <button onClick={() => dispatch({ type: EVENTS.PAUSE })}>Pause</button>
          <button onClick={() => dispatch({ type: EVENTS.START })}>Play</button>
        </div>
        <div>
          <Board
            board={board}
            status={state.status}
            onStart={() => dispatch({ type: EVENTS.START })}
          />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center">
        <NextPiece nextPieces={state.nextPieces} />
        <div>
          <div className="font-(--font-mono)">SCORE: {state.score}</div>
          <div>LINES: {state.clearedLines}</div>
        </div>
      </div>
    </div>
  );
}
