export interface Puzzle {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number;
  points: number;
  playedCount: number;
  successRate: number;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  puzzleCount: number;
  color: string;
  featured: boolean;
}

export interface User {
  id: string;
  username: string;
  points: number;
  rank: number;
  puzzlesSolved: number;
  joinDate: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  puzzlesSolved: number;
  averageTime: number;
}

export interface PuzzleStats {
  timeSpent: number;
  attempts: number;
  completed: boolean;
  bestTime?: number;
}