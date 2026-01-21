import { useEffect, useReducer } from 'react';
import { EVENTS, GAME_STATUS, TETROMINOS } from '../game/constants';
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
        <div className="relative grid grid-rows-[repeat(20,20px)] grid-cols-[repeat(10,20px)] gap-px">
          {board.flat().map((cell, i) => (
            <div key={i} className={`w-5 h-5 ${cell ? 'bg-green-400' : 'bg-gray-900'}`} />
          ))}
          {state.status === GAME_STATUS.WAITING ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button onClick={() => dispatch({ type: EVENTS.START })}>Play</button>
            </div>
          ) : null}
          {state.status === GAME_STATUS.GAME_OVER ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-center text-white">
              Game Over
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col justify-around items-center">
        <div>
          <div className="text-black mb-3 text-center">Next</div>
          <div className="flex flex-col gap-3">
            {state.nextPieces.slice(0, 3).map((piece, idx) => {
              const matrix = TETROMINOS[piece.type][0];
              // const renderPiece = (board, pieceMatrix) => {
              //   if (pieceMatrix.length > board.length)
              // }
              const board = mergePieceToBoard(
                Array.from({ length: 4 }, () => Array(4).fill(0)),
                piece
              );
              console.log('MATRIX :', matrix);
              console.log('BOARD:', board);
              return (
                <div key={idx} className="bg-gray-800 rounded">
                  <div
                    className="grid gap-px"
                    style={{
                      gridTemplateRows: `repeat(${matrix.length}, 16px)`,
                      gridTemplateColumns: `repeat(${matrix[0].length}, 16px)`,
                    }}
                  >
                    {matrix.flat().map((cell, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 ${cell ? 'bg-green-400' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div>SCORE: {state.score}</div>
          <div>LINES: {state.clearedLines}</div>
        </div>
      </div>
    </div>
  );
}
