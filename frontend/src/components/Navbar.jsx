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
    <nav className="border-solid border-black">
      <div className="flex justify-between p-2 ml-2 mr-2">
        <div className="flex justify-between gap-4">
          <Link to="/">RED TETRIS</Link>
          <Link to="/about">About</Link>
          <Link to="/Leaderboard">Leaderboard</Link>
        </div>

        <div>
          <button onClick={handleToggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          <button onClick={handleLogout}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
