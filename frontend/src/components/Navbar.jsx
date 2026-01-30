import { useState } from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState('true');

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <nav className="flex justify-between p-2 my-3 mx-3">
      <div className="flex justify-between items-center gap-8">
        <span className="border-2 border-double px-4 py-2">
          <Link to="/">RED TETRIS</Link>
        </span>
        <Link to="/Leaderboard">Leaderboard</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="flex gap-8">
        <button onClick={handleToggleTheme}>{darkMode ? 'Light' : 'Dark'}</button>
        <button onClick={handleLogout}>Settings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
