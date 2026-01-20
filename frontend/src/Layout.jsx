import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Built with ❤️</footer>
    </div>
  );
}
