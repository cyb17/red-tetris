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
    <section className="flex flex-col items-center gap-2 mb-30">
      <h1 className="text-8xl mb-10 font-bold">TETRIS</h1>
      <Button name={'Login'} onClick={handleLogin} />
      <Button name={'Sign Up'} onClick={handleSignUp} />
      <Button name={'Play as Guest'} onClick={handlePlayAsGuest} />
    </section>
  );
}
