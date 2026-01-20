import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Game from './pages/Game';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Game />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
