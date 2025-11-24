import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Users, Trophy, Puzzle } from 'lucide-react';
import { usePuzzle } from '../hooks/usePuzzle';
import PuzzleCard from '../components/PuzzleCard';
import CategoryCard from '../components/CategoryCard';
import './Home.css';

interface StatItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
}

const Home = () => {
  const { categories, featuredPuzzles, recentPuzzles } = usePuzzle();

  const stats: StatItem[] = [
    { icon: Users, value: '10K+', label: 'Active Players' },
    { icon: Puzzle, value: '50+', label: 'Puzzles' },
    { icon: Clock, value: '2.4M', label: 'Hours Played' },
    { icon: Trophy, value: '15K', label: 'Tournaments' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              {/*Challenge Your Mind with*/}
              <span className="gradient-text"> Daily Puzzles</span>
            </h1>
            <p className="hero-description">
              Join thousands of players solving fresh puzzles every day. 
              Compete, learn, and master your favorite puzzle types.
            </p>
            <div className="hero-actions">
              <Link to="/category/featured" className="btn btn-primary">
                Start Playing
              </Link>
              <Link to="/leaderboard" className="btn btn-secondary">
                View Leaderboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <stat.icon size={32} className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Puzzle Categories</h2>
            <p>Explore different types of brain teasers</p>
          </div>
          <div className="home-grid home-grid-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Puzzles */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <Star className="section-icon" />
            <h2>Featured Puzzles</h2>
            <p>Today's highlighted challenges</p>
          </div>
          <div className="home-grid home-grid-2">
            {featuredPuzzles.map((puzzle, index) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} featured index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Puzzles */}
      <section className="recent-section">
        <div className="container">
          <div className="section-header">
            <Clock className="section-icon" />
            <h2>Recently Added</h2>
            <p>Fresh puzzles to test your skills</p>
          </div>
          <div className="home-grid home-grid-4">
            {recentPuzzles.map((puzzle, index) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;