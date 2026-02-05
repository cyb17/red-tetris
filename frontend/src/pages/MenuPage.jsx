import { useNavigate } from 'react-router';
import Button from '../components/Button';

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
    <section className="flex flex-col items-center justify-center min-h-120 max-w-3xl border border-(--color-border) mx-4 sm:w-4/5 p-12 bg-(--color-bg-light)">
      <h1 className="text-5xl md:text-6xl mb-15 font-bold text-center">Welcome User !</h1>
      <div className="flex flex-col items-center gap-4">
        <Button name="Single Player" onClick={handleSinglePlayer} />
        <Button name="Multi Player" onClick={handleMultiPlayer} />
        <Button name="Leaderboard" onClick={handleLeaderboard} />
      </div>
    </section>
  );
}
