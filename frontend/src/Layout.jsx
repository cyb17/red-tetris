import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>

      <main className="w-full flex flex-col items-center justify-center bg-(--color-bg) border-y-2">
        <Outlet />
      </main>

      <footer className="text-center py-4 px-4 text-sm bg-(--color-bg-light)">Built with ❤️</footer>
    </div>
  );
}
