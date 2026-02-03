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
    <section className="bg-(--color-bg-light) w-full max-w-2xl flex flex-col items-center justify-center gap-6 border border-(--color-border) p-20 mx-auto">
      <h1 className="text-7xl md:text-8xl mb-8 font-bold text-center">TETRIS</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <Button name="Login" onClick={handleLogin} />
        <Button name="Sign Up" onClick={handleSignUp} />
        <Button name="Play as Guest" onClick={handlePlayAsGuest} />
      </div>
    </section>
  );
}
