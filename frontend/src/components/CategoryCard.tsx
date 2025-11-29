import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <motion.div
      className="category-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div 
        className="category-icon"
        style={{ backgroundColor: `${category.color}20`, color: category.color }}
      >
        {category.icon}
      </div>
      
      <h3 className="category-name">{category.name}</h3>
      <p className="category-description">{category.description}</p>
      
      <div className="category-stats">
        <span className="puzzle-count">{category.puzzleCount} puzzles</span>
      </div>

      <Link to={`/category/${category.id}`} className="category-link">
        Explore <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;