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
    <section className="bg-(--color-bg-light) w-full max-w-2xl flex flex-col items-center justify-center gap-6 border border-(--color-border) p-20 mx-auto">
      <h1 className="text-5xl md:text-6xl mb-8 font-bold text-center">Welcome User !</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <Button name="Single Player" onClick={handleSinglePlayer} />
        <Button name="Multi Player" onClick={handleMultiPlayer} />
        <Button name="Leaderboard" onClick={handleLeaderboard} />
      </div>
    </section>
  );
}
