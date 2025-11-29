import { motion } from 'framer-motion';
import { User, Trophy, Calendar, Target, Settings, Edit3, Award, Clock } from 'lucide-react';
import { usePuzzle } from '../hooks/usePuzzle';
import './Profile.css';

const Profile = () => {
  const { user } = usePuzzle();

  const stats = [
    { icon: Trophy, label: 'Total Points', value: user.points.toLocaleString(), color: '#f59e0b' },
    { icon: Target, label: 'Puzzles Solved', value: user.puzzlesSolved.toString(), color: '#10b981' },
    { icon: Award, label: 'Global Rank', value: `#${user.rank}`, color: '#8b5cf6' },
    { icon: Clock, label: 'Avg. Time', value: '12.4m', color: '#3b82f6' },
  ];

  const recentAchievements = [
    { id: 1, name: 'Puzzle Master', description: 'Solve 50 puzzles', icon: Award, date: '2024-03-15', color: '#f59e0b' },
    { id: 2, name: 'Speed Demon', description: 'Complete 10 puzzles under 5 minutes', icon: Clock, date: '2024-03-10', color: '#10b981' },
    { id: 3, name: 'Word Wizard', description: 'Master all word puzzles', icon: Target, date: '2024-03-05', color: '#8b5cf6' },
  ];

  const favoriteCategories = [
    { name: 'Logic Puzzles', count: 23, progress: 85 },
    { name: 'Word Games', count: 18, progress: 72 },
    { name: 'Number Puzzles', count: 15, progress: 60 },
  ];

  return (
    <div className="profile">
      <div className="container">
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="profile-avatar">
            <User size={48} />
            <button className="edit-avatar">
              <Edit3 size={16} />
            </button>
          </div>
          
          <div className="profile-info">
            <div className="profile-main">
              <h1>{user.username}</h1>
              <button className="edit-profile">
                <Settings size={16} />
                Edit Profile
              </button>
            </div>
            
            <div className="profile-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Joined {user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <stat.icon className="stat-icon" style={{ color: stat.color }} />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="profile-content">
          {/* Recent Achievements */}
          <motion.div
            className="achievements-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Recent Achievements</h2>
            <div className="achievements-list">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon" style={{ backgroundColor: `${achievement.color}20` }}>
                    <achievement.icon size={24} style={{ color: achievement.color }} />
                  </div>
                  <div className="achievement-info">
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Favorite Categories */}
          <motion.div
            className="categories-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Favorite Categories</h2>
            <div className="categories-list">
              {favoriteCategories.map((category) => (
                <div key={category.name} className="category-progress">
                  <div className="category-header">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count} solved</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${category.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{category.progress}% mastered</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn primary">
                  <Trophy size={16} />
                  View Achievements
                </button>
                <button className="action-btn secondary">
                  <Target size={16} />
                  Set Goals
                </button>
                <button className="action-btn secondary">
                  <Settings size={16} />
                  Preferences
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;