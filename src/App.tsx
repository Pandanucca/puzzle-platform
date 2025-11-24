import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PuzzleCategory from './pages/PuzzleCategory';
// import PuzzleDetail from './pages/PuzzleDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { PuzzleProvider } from './context/PuzzleContext';
import './App.css';

function App() {
  return (
    <PuzzleProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<PuzzleCategory />} />
              {/* <Route path="/puzzle/:puzzleId" element={<PuzzleDetail />} /> */}
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PuzzleProvider>
  );
}

export default App;