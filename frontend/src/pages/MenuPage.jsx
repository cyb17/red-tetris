import { useNavigate } from 'react-router';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col">
        <button onClick={() => navigate('/game?mode=single')}>Single Player</button>

        <button onClick={() => navigate('/game?mode=multi')}>Multi Player</button>

        <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
      </div>
    </section>
  );
}
