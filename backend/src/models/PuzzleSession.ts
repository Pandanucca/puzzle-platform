import mongoose, { Document, Schema } from 'mongoose';

export interface IPuzzleSession extends Document {
  user: mongoose.Types.ObjectId;
  puzzle: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  timeSpent?: number; // in seconds
  completed: boolean;
  success: boolean;
  userSolution: any;
  score?: number;
}

const puzzleSessionSchema = new Schema<IPuzzleSession>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  puzzle: {
    type: Schema.Types.ObjectId,
    ref: 'Puzzle',
    required: [true, 'Puzzle is required']
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  timeSpent: {
    type: Number, // in seconds
    min: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  },
  userSolution: {
    type: Schema.Types.Mixed
  },
  score: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
puzzleSessionSchema.index({ user: 1, puzzle: 1 });
puzzleSessionSchema.index({ user: 1, completed: 1 });

export const PuzzleSession = mongoose.model<IPuzzleSession>('PuzzleSession', puzzleSessionSchema);