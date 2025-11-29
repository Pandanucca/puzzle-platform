import express from 'express';
import { Puzzle } from '../models/Puzzle';
import { PuzzleSession } from '../models/PuzzleSession';
import { User } from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all puzzles with filtering and pagination
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;
    
    const filter: any = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const puzzles = await Puzzle.find(filter)
      .select('-solution') // Don't send solution to client
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Puzzle.countDocuments(filter);

    res.json({
      puzzles,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });

  } catch (error) {
    console.error('Get puzzles error:', error);
    res.status(500).json({ message: 'Error fetching puzzles' });
  }
});

// Get single puzzle by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id).select('-solution');
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }

    res.json({ puzzle });

  } catch (error) {
    console.error('Get puzzle error:', error);
    res.status(500).json({ message: 'Error fetching puzzle' });
  }
});

// Start a puzzle session
router.post('/:id/start', authenticate, async (req: AuthRequest, res) => {
  try {
    const puzzle = await Puzzle.findById(req.params.id);
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }

    // Check if there's an existing active session
    const existingSession = await PuzzleSession.findOne({
      user: req.user?.userId,
      puzzle: puzzle._id,
      completed: false
    });

    if (existingSession) {
      return res.json({ 
        session: existingSession,
        puzzle: await Puzzle.findById(puzzle._id).select('-solution')
      });
    }

    // Create new session
    const session = new PuzzleSession({
      user: req.user?.userId,
      puzzle: puzzle._id
    });

    await session.save();

    res.json({
      session,
      puzzle: await Puzzle.findById(puzzle._id).select('-solution')
    });

  } catch (error) {
    console.error('Start puzzle error:', error);
    res.status(500).json({ message: 'Error starting puzzle' });
  }
});

// Submit puzzle solution
router.post('/:id/submit', authenticate, async (req: AuthRequest, res) => {
  try {
    const { userSolution } = req.body;
    const puzzle = await Puzzle.findById(req.params.id);
    
    if (!puzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }

    const session = await PuzzleSession.findOne({
      user: req.user?.userId,
      puzzle: puzzle._id,
      completed: false
    });

    if (!session) {
      return res.status(400).json({ message: 'No active puzzle session found' });
    }

    // Calculate time spent
    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);

    // Simple validation (replace this with actual puzzle logic)
    const success = JSON.stringify(userSolution) === JSON.stringify(puzzle.solution);
    
    // Calculate score based on time and difficulty
    let score = 0;
    if (success) {
      const basePoints = puzzle.points;
      const timeBonus = Math.max(0, puzzle.estimatedTime * 60 - timeSpent); // Bonus for finishing faster
      score = basePoints + Math.floor(timeBonus / 10);
    }

    // Update session
    session.endTime = endTime;
    session.timeSpent = timeSpent;
    session.completed = true;
    session.success = success;
    session.userSolution = userSolution;
    session.score = score;

    await session.save();

    // Update user stats and puzzle stats if successful
    if (success) {
      await User.findByIdAndUpdate(req.user?.userId, {
        $inc: { 
          points: score,
          puzzlesSolved: 1
        }
      });

      await Puzzle.findByIdAndUpdate(puzzle._id, {
        $inc: { playedCount: 1 },
        // Update success rate (simplified)
        successRate: ((puzzle.successRate * puzzle.playedCount) + 100) / (puzzle.playedCount + 1)
      });
    } else {
      await Puzzle.findByIdAndUpdate(puzzle._id, {
        $inc: { playedCount: 1 },
        successRate: (puzzle.successRate * puzzle.playedCount) / (puzzle.playedCount + 1)
      });
    }

    // Get updated user
    const user = await User.findById(req.user?.userId);

    res.json({
      success,
      score,
      timeSpent,
      user: {
        points: user?.points,
        puzzlesSolved: user?.puzzlesSolved
      }
    });

  } catch (error) {
    console.error('Submit puzzle error:', error);
    res.status(500).json({ message: 'Error submitting puzzle' });
  }
});

// Get user's puzzle sessions
router.get('/user/sessions', authenticate, async (req: AuthRequest, res) => {
  try {
    const sessions = await PuzzleSession.find({ user: req.user?.userId })
      .populate('puzzle', 'title category difficulty points')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ sessions });

  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

export default router;