import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header>
        <Navbar />
      </header>

      <main className="w-2xl min-h-140 flex flex-col justify-center items-center mx-auto my-3 p-2">
        <Outlet />
      </main>

      <footer className="text-center my-1 p-1">Built with ❤️</footer>
    </div>
  );
}
