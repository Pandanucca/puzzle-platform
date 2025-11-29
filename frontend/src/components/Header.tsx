import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Puzzle, Trophy, User, Home, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    ...(isAuthenticated ? [{ path: '/profile', label: 'Profile', icon: User }] : []),
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Puzzle size={32} />
            <span>PuzzleHub</span>
          </Link>
          
          <nav className="nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="user-section">
            {isAuthenticated ? (
              <>
                <div className="user-points">
                  <Trophy size={16} />
                  <span>{user?.points.toLocaleString()}</span>
                </div>
                <div className="user-info">
                  <span className="username">Hi, {user?.username}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/profile" className="btn btn-sm btn-secondary">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;