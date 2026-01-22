import { Route, Routes } from 'react-router';
import Layout from './Layout';
import About from './pages/About';
import Game from './pages/Game';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </>
  );
}
