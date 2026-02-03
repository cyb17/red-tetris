import { useCallback, useMemo, useState } from 'react';

export default function Leaderboard() {
  const allMockData = [
    { id: 'lb-1', player: 'Alex', score: 12450, lines: 48 },
    { id: 'lb-2', player: 'Maya', score: 9800, lines: 41 },
    { id: 'lb-3', player: 'Ken', score: 8650, lines: 37 },
    { id: 'lb-4', player: 'Sam', score: 7320, lines: 32 },
    { id: 'lb-5', player: 'Jordan', score: 6890, lines: 28 },
    { id: 'lb-6', player: 'Casey', score: 5450, lines: 24 },
    { id: 'lb-7', player: 'Taylor', score: 4920, lines: 20 },
    { id: 'lb-8', player: 'Morgan', score: 4100, lines: 18 },
    { id: 'lb-9', player: 'Riley', score: 3750, lines: 15 },
    { id: 'lb-10', player: 'Avery', score: 3200, lines: 12 },
    { id: 'lb-11', player: 'Blake', score: 2890, lines: 10 },
    { id: 'lb-12', player: 'Drew', score: 2400, lines: 8 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter by search term
  const filteredData = useMemo(
    () => allMockData.filter(row => row.player.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      // Handle string comparison for player names
      if (typeof aVal === 'string') {
        return sortOrder === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }

      // Handle number comparison
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });
  }, [filteredData, sortBy, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = useMemo(
    () => sortedData.slice(startIndex, startIndex + itemsPerPage),
    [sortedData, startIndex]
  );

  const handleSort = useCallback(
    column => {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
      } else {
        setSortBy(column);
        setSortOrder('desc');
      }
      setCurrentPage(1);
    },
    [sortBy, sortOrder]
  );

  return (
    <section className="flex flex-col justify-center items-center gap-3 p-2 ">
      <h1 className="text-6xl font-bold">Leaderboard</h1>
      <hr className="border-t-2 border-(--color-border) w-2/3 mb-5" />

      <input
        id="search"
        name="search"
        type="text"
        placeholder="Chercher un joueur..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="px-4 py-2 border rounded w-1/2"
      />

      <table className="w-1/2 border mb-3">
        <thead className="text-xl">
          <tr>
            <th className="px-4 py-2 text-center">#</th>
            <th
              className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('player')}
            >
              player {sortBy === 'player' && (sortOrder === 'desc' ? '↓' : '↑')}
            </th>
            <th
              className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('score')}
            >
              score {sortBy === 'score' && (sortOrder === 'desc' ? '↓' : '↑')}
            </th>
            <th
              className="px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('lines')}
            >
              lines {sortBy === 'lines' && (sortOrder === 'desc' ? '↓' : '↑')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                Aucun résultat trouvé
              </td>
            </tr>
          ) : (
            paginatedData.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{startIndex + index + 1}</td>
                <td className="px-4 py-2 text-center">{row.player}</td>
                <td className="px-4 py-2 text-center">{row.score}</td>
                <td className="px-4 py-2 text-center">{row.lines}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-4 py-2">
          Page {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
