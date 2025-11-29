import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Calendar, Target, Settings, Edit3, Award, Clock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Profile.css';

const Profile = () => {
  const { user, login, register, isAuthenticated, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '' });
  };

  // If user is authenticated, show profile
  if (isAuthenticated && user) {
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
                  <span>Joined {new Date(user.joinDate || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show login/register form
  return (
    <div className="profile">
      <div className="container">
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <div className="auth-icon">
              {isLogin ? <LogIn size={48} /> : <UserPlus size={48} />}
            </div>
            <h1>{isLogin ? 'Welcome Back' : 'Join PuzzleHub'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Create your account to start solving puzzles'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={switchMode} className="switch-btn">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;