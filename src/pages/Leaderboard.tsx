import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, TrendingUp, Users } from 'lucide-react';
import './Leaderboard.css';

interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  points: number;
  puzzlesSolved: number;
  averageTime: number;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData: LeaderboardUser[] = [
    { id: '1', rank: 1, username: 'PuzzleMaster', points: 12500, puzzlesSolved: 342, averageTime: 8.2, isCurrentUser: true },
    { id: '2', rank: 2, username: 'Brainiac', points: 11800, puzzlesSolved: 328, averageTime: 7.8 },
    { id: '3', rank: 3, username: 'LogicKing', points: 11200, puzzlesSolved: 315, averageTime: 9.1 },
    { id: '4', rank: 4, username: 'WordWizard', points: 10500, puzzlesSolved: 298, averageTime: 8.5 },
    { id: '5', rank: 5, username: 'SudokuPro', points: 9800, puzzlesSolved: 287, averageTime: 7.2 },
    { id: '6', rank: 6, username: 'CodeBreaker', points: 9200, puzzlesSolved: 265, averageTime: 8.9 },
    { id: '7', rank: 7, username: 'MindBender', points: 8700, puzzlesSolved: 254, averageTime: 9.4 },
    { id: '8', rank: 8, username: 'GridMaster', points: 8200, puzzlesSolved: 241, averageTime: 8.1 },
    { id: '9', rank: 9, username: 'PatternFinder', points: 7800, puzzlesSolved: 228, averageTime: 7.9 },
    { id: '10', rank: 10, username: 'QuickThinker', points: 7400, puzzlesSolved: 215, averageTime: 6.8 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="rank-icon gold" />;
      case 2: return <Medal className="rank-icon silver" />;
      case 3: return <Medal className="rank-icon bronze" />;
      default: return <span className="rank-number">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return 'default';
    }
  };

  return (
    <div className="leaderboard">
      <div className="container">
        <motion.div
          className="leaderboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Trophy className="header-icon" />
          <h1>Global Leaderboard</h1>
          <p>Compete with puzzle enthusiasts from around the world</p>
        </motion.div>

        <div className="leaderboard-stats">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Users className="stat-icon" />
            <div className="stat-value">10,284</div>
            <div className="stat-label">Total Players</div>
          </motion.div>
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="stat-icon" />
            <div className="stat-value">1.2M</div>
            <div className="stat-label">Puzzles Solved</div>
          </motion.div>
        </div>

        <motion.div
          className="leaderboard-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="leaderboard-filters">
            <button className="filter-btn active">All Time</button>
            <button className="filter-btn">This Month</button>
            <button className="filter-btn">This Week</button>
            <button className="filter-btn">Today</button>
          </div>

          <div className="leaderboard-list">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''} ${getRankColor(user.rank)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.4 }}
              >
                <div className="rank">
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="user-info">
                  <div className="username">
                    {user.username}
                    {user.isCurrentUser && <span className="you-badge">You</span>}
                  </div>
                  <div className="user-stats">
                    <span>{user.puzzlesSolved} puzzles</span>
                    <span>•</span>
                    <span>Avg: {user.averageTime}m</span>
                  </div>
                </div>

                <div className="points">
                  <Trophy size={16} />
                  {user.points.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="leaderboard-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p>Your rank updates in real-time as you solve puzzles</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;