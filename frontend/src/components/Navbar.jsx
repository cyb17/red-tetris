import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="flex justify-around">
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/game">Game</Link>
    </nav>
  );
}
