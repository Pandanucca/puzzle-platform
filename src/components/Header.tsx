import { Link, useLocation } from 'react-router-dom';
import { Puzzle, Trophy, User, Home } from 'lucide-react';
import './Header.css';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const Header: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User }
  ];

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
            <div className="user-points">
              <Trophy size={16} />
              <span>1,250</span>
            </div>
            <Link to="/profile" className="user-avatar">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;