import { createContext, useMemo, type ReactNode } from 'react';
import type { Puzzle, Category, User, PuzzleStats } from '../types';

interface PuzzleContextType {
  categories: Category[];
  featuredPuzzles: Puzzle[];
  recentPuzzles: Puzzle[];
  user: User;
  userStats: Map<string, PuzzleStats>;
  getPuzzlesByCategory: (categoryId: string) => Puzzle[];
  getPuzzleById: (puzzleId: string) => Puzzle | undefined;
  getCategoryById: (categoryId: string) => Category | undefined;
}

// Create context with null default
const PuzzleContext = createContext<PuzzleContextType | null>(null);

// Mock data
const mockCategories: Category[] = [
  {
    id: 'logic',
    name: 'Logic Puzzles',
    description: 'Test your reasoning and deduction skills',
    icon: '🧠',
    puzzleCount: 15,
    color: '#3B82F6',
    featured: true,
  },
  {
    id: 'word',
    name: 'Word Games',
    description: 'Challenge your vocabulary and language skills',
    icon: '📝',
    puzzleCount: 12,
    color: '#10B981',
    featured: true,
  },
  {
    id: 'number',
    name: 'Number Puzzles',
    description: 'Exercise your mathematical thinking',
    icon: '🔢',
    puzzleCount: 8,
    color: '#F59E0B',
    featured: true,
  },
  {
    id: 'spatial',
    name: 'Spatial Reasoning',
    description: 'Visualize and manipulate shapes and patterns',
    icon: '🧩',
    puzzleCount: 10,
    color: '#8B5CF6',
    featured: false,
  },
];

const mockPuzzles: Puzzle[] = [
  {
    id: 'daily-sudoku',
    title: 'Daily Sudoku',
    description: 'Classic number placement puzzle with varying difficulty',
    category: 'number',
    difficulty: 'medium',
    estimatedTime: 15,
    points: 100,
    playedCount: 12500,
    successRate: 68,
    isFeatured: true,
    isNew: false,
    tags: ['numbers', 'logic', 'popular'],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'crossword-challenge',
    title: 'Crossword Challenge',
    description: 'Fill the grid with words based on clever clues',
    category: 'word',
    difficulty: 'hard',
    estimatedTime: 25,
    points: 150,
    playedCount: 8900,
    successRate: 52,
    isFeatured: true,
    isNew: true,
    tags: ['words', 'vocabulary', 'new'],
    createdAt: new Date('2024-03-01'),
  },
];

const mockUser: User = {
  id: 'user-1',
  username: 'PuzzleMaster',
  points: 1250,
  rank: 42,
  puzzlesSolved: 89,
  joinDate: new Date('2024-01-01'),
};

interface PuzzleProviderProps {
  children: ReactNode;
}

export const PuzzleProvider = ({ children }: PuzzleProviderProps) => {
  const featuredPuzzles = useMemo(
    () => mockPuzzles.filter(puzzle => puzzle.isFeatured),
    []
  );

  const recentPuzzles = useMemo(
    () => 
      [...mockPuzzles]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 8),
    []
  );

  const userStats = useMemo(() => new Map<string, PuzzleStats>(), []);

  const getPuzzlesByCategory = useMemo(() => 
    (categoryId: string): Puzzle[] => {
      return mockPuzzles.filter(puzzle => puzzle.category === categoryId);
    },
    []
  );

  const getPuzzleById = useMemo(() =>
    (puzzleId: string): Puzzle | undefined => {
      return mockPuzzles.find(puzzle => puzzle.id === puzzleId);
    },
    []
  );

  const getCategoryById = useMemo(() =>
    (categoryId: string): Category | undefined => {
      return mockCategories.find(category => category.id === categoryId);
    },
    []
  );

  const contextValue = useMemo((): PuzzleContextType => ({
    categories: mockCategories,
    featuredPuzzles,
    recentPuzzles,
    user: mockUser,
    userStats,
    getPuzzlesByCategory,
    getPuzzleById,
    getCategoryById,
  }), [
    featuredPuzzles, 
    recentPuzzles, 
    userStats, 
    getPuzzlesByCategory, 
    getPuzzleById, 
    getCategoryById
  ]);

  return (
    <PuzzleContext.Provider value={contextValue}>
      {children}
    </PuzzleContext.Provider>
  );
};

// Export the context for use in the hook file
export { PuzzleContext };