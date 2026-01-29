import { useNavigate } from 'react-router';

export default function Menu() {
  const navigate = useNavigate();

  const handleSinglePlayer = () => {
    navigate('/game?mode=single');
  };

  const handleMultiPlayer = () => {
    navigate('/game?mode=multi');
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <section>
      <h1>Welcome User !</h1>
      <div className="flex flex-col">
        <button onClick={handleSinglePlayer}>Single Player</button>

        <button onClick={handleMultiPlayer}>Multi Player</button>

        <button onClick={handleLeaderboard}>Leaderboard</button>
      </div>
    </section>
  );
}
