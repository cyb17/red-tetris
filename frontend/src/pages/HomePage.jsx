import { useNavigate } from 'react-router';

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
    <section>
      <div className="flex flex-col">
        <h1>TETRIS</h1>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handlePlayAsGuest}>Play as Guest</button>
      </div>
    </section>
  );
}
