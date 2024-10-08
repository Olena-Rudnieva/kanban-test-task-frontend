import './App.css';
import { Layout } from './components';
import { Routes, Route } from 'react-router-dom';
import { Boards, BoardView, Home } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<BoardView />} />
      </Route>
    </Routes>
  );
};

export default App;
