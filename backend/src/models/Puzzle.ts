import mongoose, { Document, Schema } from 'mongoose';

export interface IPuzzle extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number;
  points: number;
  content: any;
  solution: any;
  tags: string[];
  playedCount: number;
  successRate: number;
  isFeatured: boolean;
  isNew: boolean;
}

const puzzleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['logic', 'word', 'number', 'spatial', 'trivia', 'strategy']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard', 'expert'],
    default: 'medium'
  },
  estimatedTime: {
    type: Number,
    required: true,
    min: 1
  },
  points: {
    type: Number,
    required: true,
    min: 10
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  },
  solution: {
    type: Schema.Types.Mixed,
    required: true
  },
  tags: [String],
  playedCount: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
puzzleSchema.index({ category: 1, difficulty: 1 });
puzzleSchema.index({ isFeatured: -1, createdAt: -1 });

export const Puzzle = mongoose.model<IPuzzle>('Puzzle', puzzleSchema);