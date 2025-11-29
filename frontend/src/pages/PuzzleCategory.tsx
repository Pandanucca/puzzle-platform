import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { usePuzzle } from '../hooks/usePuzzle';
import PuzzleCard from '../components/PuzzleCard';
import './PuzzleCategory.css';

const PuzzleCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, getPuzzlesByCategory } = usePuzzle();

  const category = categories.find(cat => cat.id === categoryId);
  const puzzles = category ? getPuzzlesByCategory(category.id) : [];

  if (!category) {
    return (
      <div className="category-not-found">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="puzzle-category">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="category-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="category-info">
            <div 
              className="category-icon-large"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon}
            </div>
            <div>
              <h1>{category.name}</h1>
              <p>{category.description}</p>
              <div className="category-meta">
                <span>{puzzles.length} puzzles available</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="search-box">
            <Search size={20} />
            <input type="text" placeholder="Search puzzles..." />
          </div>
          <div className="filter-buttons">
            <button className="filter-btn active">
              <Filter size={16} />
              All Puzzles
            </button>
            <button className="filter-btn">Easy</button>
            <button className="filter-btn">Medium</button>
            <button className="filter-btn">Hard</button>
            <button className="filter-btn">Expert</button>
          </div>
        </motion.div>

        {/* Puzzles Grid */}
        <motion.div 
          className="puzzles-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-3">
            {puzzles.map((puzzle, index) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PuzzleCategory;