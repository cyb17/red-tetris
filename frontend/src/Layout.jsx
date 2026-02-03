import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 md:px-8 lg:py-8 flex flex-col items-center justify-center">
        <Outlet />
      </main>

      <footer className="text-center py-4 px-4 text-sm sm:text-base border-t bg-(--color-bg-light)">
        Built with ❤️
      </footer>
    </div>
  );
}
