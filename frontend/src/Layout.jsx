import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="text-center">Built with ❤️</footer>
    </div>
  );
}
