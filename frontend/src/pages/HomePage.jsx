import { useNavigate } from 'react-router';
import Button from '../components/Button';

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handlePlayAsGuest = () => {
    navigate('/game');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-120 max-w-3xl border border-(--color-border) mx-4 sm:w-4/5 p-12 bg-(--color-bg-light)">
      <h1 className="text-6xl sm:text-7xl mb-8 font-bold text-center">RED TETRIS</h1>
      <div className="flex flex-col items-center gap-4">
        <Button name="Login" onClick={handleLogin} />
        <Button name="Sign Up" onClick={handleSignUp} />
        <Button name="Play as Guest" onClick={handlePlayAsGuest} />
      </div>
    </section>
  );
}
