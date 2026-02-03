import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';

export default function Lobby() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const currentPlayerId = 1; // Mock: assuming current player is Alice (id 1, who is the host)
  const hostId = 1; // Mock: Alice is the host

  const mockData = [
    { id: 1, player: 'Alice', state: 'ready' },
    { id: 2, player: 'Bob', state: 'waiting' },
    { id: 3, player: 'Charlie', state: 'ready' },
    { id: 4, player: 'Diana', state: 'waiting' },
    { id: 5, player: 'Eve', state: 'ready' },
  ];

  const getStateColor = state => {
    return state === 'ready' ? 'text-green-600' : 'text-yellow-600';
  };

  const handleReady = () => {
    setIsReady(!isReady);
  };

  const handleStartGame = () => {
    console.log('Starting game...');
    navigate('/game');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isHost = currentPlayerId === hostId;

  return (
    <section className="w-full max-w-2xl flex flex-col items-center justify-center gap-6 border border-(--color-border) p-8 sm:p-10 md:p-12 lg:p-14 mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-bold text-center">Players</h1>
      <ul className="w-full space-y-3">
        {mockData.map(player => (
          <li
            key={player.id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded hover:bg-gray-50"
          >
            <span className="font-semibold">
              {player.player}
              {player.id === hostId && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Host
                </span>
              )}
            </span>
            <span className={`text-sm font-bold ${getStateColor(player.state)}`}>
              {player.state === 'ready' ? '✓ Ready' : '⏳ Waiting'}
            </span>
          </li>
        ))}
      </ul>

      <div className="w-full flex gap-3 mt-6">
        <Button name={isReady ? 'Not Ready' : 'Ready'} onClick={handleReady} />
        {isHost && <Button name="Start Game" onClick={handleStartGame} />}
        <Button name="Back" onClick={handleBack} />
      </div>
    </section>
  );
}
