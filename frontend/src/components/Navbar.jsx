import { useState } from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleTheme = () => {
    console.log('Logout clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleSettingsModal = () => {
    console.log('Settings clicked');
  };

  return (
    <nav className="bg-(--color-bg-light) relative">
      <div className="mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="border-2 border-double px-4 py-2 text-sm sm:text-base">
            <Link to="/">RED TETRIS</Link>
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/Leaderboard"
              className="text-gray-900 transition rounded px-3 py-1 hover:bg-gray-200"
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className="text-gray-900 transition rounded px-3 py-1 hover:bg-gray-200"
            >
              About
            </Link>
            <button
              onClick={handleSettingsModal}
              className="text-gray-900 transition rounded px-3 py-1 hover:bg-gray-200"
            >
              Settings
            </button>
            <button
              onClick={handleToggleTheme}
              className="text-gray-900 transition text-4xl rounded px-3 hover:bg-gray-200"
            >
              ☼
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-900 transition text-2xl pb-1.5 rounded px-3 py-1 hover:bg-gray-200"
              title="Logout"
            >
              ⏻
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100 text-2xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-500 ease-out absolute left-0 right-0 top-full bg-(--color-bg-light) ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          <Link
            to="/Leaderboard"
            className="block w-full py-2 text-gray-900 transition px-4 hover:bg-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            to="/about"
            className="block w-full py-2 text-gray-900 transition px-4 hover:bg-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <button
            onClick={() => {
              handleSettingsModal();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-gray-900 transition px-4 hover:bg-gray-200"
          >
            Settings
          </button>
          <button
            onClick={() => {
              handleToggleTheme();
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-gray-900 transition px-4 hover:bg-gray-200"
          >
            <span className="text-2xl">☼</span> Light
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-gray-900 transition px-4 hover:bg-gray-200"
            title="Logout"
          >
            ⏻ Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
