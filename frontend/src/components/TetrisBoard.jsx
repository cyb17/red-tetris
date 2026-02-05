import { GAME_STATUS } from '../game/constants';

export default function Board({ board, status, onStart }) {
  return (
    <div className="relative grid grid-rows-[repeat(20,20px)] grid-cols-[repeat(10,20px)] gap-px">
      {board.flat().map((cell, i) => (
        <div key={i} className={`w-5 h-5 ${cell ? 'bg-green-400' : 'bg-gray-900'}`} />
      ))}
      {status === GAME_STATUS.WAITING ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            className="border-3 border-white bg-(--color-bg) py-1 px-2 rounded-xl"
            onClick={onStart}
          >
            Play
          </button>
        </div>
      ) : null}
      {status === GAME_STATUS.GAME_OVER ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-center text-white">
          Game Over
        </div>
      ) : null}
    </div>
  );
}
