import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-2">
      <header className="">
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Built with ❤️</footer>
    </div>
  );
}
