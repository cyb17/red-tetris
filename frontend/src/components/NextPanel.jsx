import { TETROMINOS } from '../game/constants';

function getTrimmedMatrix(matrix) {
  const nonEmptyRows = matrix.filter(row => row.some(cell => cell !== 0));
  if (nonEmptyRows.length === 0) return matrix;

  const cols = matrix[0].length;
  let firstCol = cols;
  let lastCol = -1;

  for (let row of nonEmptyRows) {
    for (let col = 0; col < cols; col++) {
      if (row[col] !== 0) {
        firstCol = Math.min(firstCol, col);
        lastCol = Math.max(lastCol, col);
      }
    }
  }

  return nonEmptyRows.map(row => row.slice(firstCol, lastCol + 1));
}

export default function NextPiece({ nextPieces }) {
  return (
    <div>
      <div className="text-black mb-3 text-center">Next</div>
      <div className="flex flex-col gap-3">
        {nextPieces.slice(0, 3).map((piece, idx) => {
          const fullMatrix = TETROMINOS[piece.type]?.[0] ?? [[]];
          const matrix = getTrimmedMatrix(fullMatrix);

          return (
            <div
              key={idx}
              className="bg-gray-800 rounded p-2 w-20 h-16 flex items-center justify-center"
            >
              <div
                className="grid gap-px"
                style={{
                  gridTemplateRows: `repeat(${matrix.length}, 16px)`,
                  gridTemplateColumns: `repeat(${matrix[0]?.length ?? 0}, 16px)`,
                }}
              >
                {matrix.flat().map((cell, i) => (
                  <div key={i} className={`w-4 h-4 ${cell ? 'bg-green-400' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
