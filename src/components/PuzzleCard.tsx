import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, TrendingUp } from 'lucide-react';
import type { Puzzle } from '../types';
import './PuzzleCard.css';

interface PuzzleCardProps {
  puzzle: Puzzle;
  featured?: boolean;
  index: number;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzle, featured = false, index }) => {
  const difficultyColors = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444',
    expert: '#8B5CF6'
  };

  return (
    <motion.div
      className={`puzzle-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="puzzle-card-header">
        <div className="puzzle-meta">
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: difficultyColors[puzzle.difficulty] }}
          >
            {puzzle.difficulty}
          </span>
          {puzzle.isNew && <span className="new-badge">New</span>}
          {puzzle.isFeatured && <Star size={14} className="featured-icon" />}
        </div>
        <div className="puzzle-points">
          +{puzzle.points}
        </div>
      </div>

      <h3 className="puzzle-title">{puzzle.title}</h3>
      <p className="puzzle-description">{puzzle.description}</p>

      <div className="puzzle-stats">
        <div className="stat">
          <Clock size={16} />
          <span>{puzzle.estimatedTime}m</span>
        </div>
        <div className="stat">
          <Users size={16} />
          <span>{puzzle.playedCount.toLocaleString()}</span>
        </div>
        <div className="stat">
          <TrendingUp size={16} />
          <span>{puzzle.successRate}%</span>
        </div>
      </div>

      <div className="puzzle-tags">
        {puzzle.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <Link to={`/puzzle/${puzzle.id}`} className="play-button">
        Play Now
      </Link>
    </motion.div>
  );
};

export default PuzzleCard;