import { Navigate, Route, Routes } from 'react-router';
import Layout from './Layout';
import About from './pages/AboutPage';
import Game from './pages/GamePage';
import Home from './pages/HomePage';
import Leaderboard from './pages/Leaderboard';
import Lobby from './pages/LobbyPage';
import Login from './pages/LoginPage';
import Menu from './pages/MenuPage';
import MultiGame from './pages/MultiGamePage';
import SignUp from './pages/SignUpPage';
import SingleGame from './pages/SingleGamePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/single" element={<SingleGame />} />
        <Route path="/multi" element={<MultiGame />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
