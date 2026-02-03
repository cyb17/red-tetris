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
    <nav className="bg-(--color-bg-light) border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <span className="border-2 border-double px-4 py-2 text-sm sm:text-base">
            <Link to="/">RED TETRIS</Link>
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/Leaderboard" className="text-gray-900 hover:opacity-70 transition">
              Leaderboard
            </Link>
            <Link to="/about" className="text-gray-900 hover:opacity-70 transition">
              About
            </Link>
            <button
              onClick={handleSettingsModal}
              className="text-gray-900 hover:opacity-70 transition"
            >
              Settings
            </button>
            <button
              onClick={handleToggleTheme}
              className="text-gray-900 hover:opacity-70 transition text-4xl"
            >
              ☼
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-900 hover:opacity-70 transition text-2xl"
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
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/Leaderboard"
              className="block py-2 text-gray-900 hover:opacity-70 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-900 hover:opacity-70 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                handleToggleTheme();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-900 hover:opacity-70 transition"
            >
              Theme
            </button>
            <button
              onClick={() => {
                handleSettingsModal();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-900 hover:opacity-70 transition"
            >
              Settings
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-900 hover:opacity-70 transition"
              title="Logout"
            >
              ⏻ Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
