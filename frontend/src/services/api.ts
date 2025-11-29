const API_BASE_URL = 'http://localhost:5000/api';

interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  puzzlesSolved: number;
  rank: number;
  joinDate?: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// Puzzle content interfaces
interface SudokuContent {
  type: 'sudoku';
  grid: number[][];
}

interface WordSearchContent {
  type: 'wordsearch';
  grid: string[][];
  words: string[];
}

interface LogicGridContent {
  type: 'logicgrid';
  categories: Record<string, string[]>;
  clues: string[];
}

interface MathContent {
  type: 'math';
  equations: string[];
}

type PuzzleContent = SudokuContent | WordSearchContent | LogicGridContent | MathContent;

// Puzzle solution interfaces
interface SudokuSolution {
  grid: number[][];
}

interface WordSearchSolution {
  foundWords: string[];
  positions: Record<string, Array<{ row: number; col: number }>>;
}

interface LogicGridSolution {
  assignments: Record<string, Record<string, string>>;
}

interface MathSolution {
  answers: Record<string, number>;
}

type PuzzleSolution = SudokuSolution | WordSearchSolution | LogicGridSolution | MathSolution;

interface Puzzle {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number;
  points: number;
  content: PuzzleContent;
  tags: string[];
  playedCount: number;
  successRate: number;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

interface PuzzleSession {
  _id: string;
  puzzle: Puzzle;
  startTime: string;
  endTime?: string;
  timeSpent?: number;
  completed: boolean;
  success: boolean;
  userSolution?: PuzzleSolution;
  score?: number;
}

interface PuzzlesResponse {
  puzzles: Puzzle[];
  totalPages: number;
  currentPage: number;
  total: number;
}

interface SubmitResponse {
  success: boolean;
  score: number;
  timeSpent: number;
  user: {
    points: number;
    puzzlesSolved: number;
  };
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    // Create headers object with proper typing
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge with any existing headers from options
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Auth methods
  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile(): Promise<{ user: User }> {
    return this.request('/users/profile');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Puzzle methods
  async getPuzzles(filters?: {
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<PuzzlesResponse> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const query = params.toString();
    const endpoint = query ? `/puzzles?${query}` : '/puzzles';
    
    return this.request(endpoint);
  }

  async getPuzzle(id: string): Promise<{ puzzle: Puzzle }> {
    return this.request(`/puzzles/${id}`);
  }

  async startPuzzleSession(puzzleId: string): Promise<{ session: PuzzleSession; puzzle: Puzzle }> {
    return this.request(`/puzzles/${puzzleId}/start`, {
      method: 'POST',
    });
  }

  async submitPuzzleSolution(puzzleId: string, userSolution: PuzzleSolution): Promise<SubmitResponse> {
    return this.request(`/puzzles/${puzzleId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ userSolution }),
    });
  }

  async getUserSessions(): Promise<{ sessions: PuzzleSession[] }> {
    return this.request('/puzzles/user/sessions');
  }
}

export const apiService = new ApiService();