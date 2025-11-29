import { connectDB, closeDB } from '../utils/database';
import { Puzzle } from '../models/Puzzle';

const samplePuzzles = [
  {
    title: 'Daily Sudoku',
    description: 'Classic 9x9 number placement puzzle',
    category: 'number',
    difficulty: 'medium',
    estimatedTime: 15,
    points: 100,
    content: {
      type: 'sudoku',
      grid: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ]
    },
    solution: {
      grid: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ]
    },
    tags: ['numbers', 'logic', 'popular'],
    isFeatured: true,
    isNew: false
  },
  {
    title: 'Word Search Challenge',
    description: 'Find hidden words in the letter grid',
    category: 'word',
    difficulty: 'easy',
    estimatedTime: 10,
    points: 80,
    content: {
      type: 'wordsearch',
      grid: [
        ['A', 'P', 'P', 'L', 'E', 'X', 'Y', 'Z'],
        ['B', 'A', 'N', 'A', 'N', 'A', 'W', 'Q'],
        ['C', 'D', 'O', 'G', 'R', 'S', 'T', 'U'],
        ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
        ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B']
      ],
      words: ['APPLE', 'BANANA', 'DOG', 'CAT']
    },
    solution: {
      foundWords: ['APPLE', 'BANANA', 'DOG', 'CAT'],
      positions: {
        'APPLE': [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}],
        'BANANA': [{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}, {row: 1, col: 4}, {row: 1, col: 5}],
        'DOG': [{row: 2, col: 2}, {row: 2, col: 3}, {row: 2, col: 4}],
        'CAT': [{row: 2, col: 0}, {row: 3, col: 0}, {row: 4, col: 0}]
      }
    },
    tags: ['words', 'search', 'vocabulary'],
    isFeatured: false,
    isNew: true
  },
  {
    title: 'Logic Grid',
    description: 'Deductive reasoning puzzle using clues',
    category: 'logic',
    difficulty: 'hard',
    estimatedTime: 25,
    points: 150,
    content: {
      type: 'logicgrid',
      categories: {
        people: ['Alice', 'Bob', 'Charlie'],
        jobs: ['Doctor', 'Engineer', 'Teacher'],
        cities: ['New York', 'London', 'Tokyo']
      },
      clues: [
        'Alice is not the Doctor',
        'The person from Tokyo is an Engineer',
        'Bob lives in New York'
      ]
    },
    solution: {
      assignments: {
        'Alice': { job: 'Teacher', city: 'London' },
        'Bob': { job: 'Doctor', city: 'New York' },
        'Charlie': { job: 'Engineer', city: 'Tokyo' }
      }
    },
    tags: ['deduction', 'logic', 'thinking'],
    isFeatured: true,
    isNew: false
  },
  {
    title: 'Math Challenge',
    description: 'Solve the mathematical equations',
    category: 'number',
    difficulty: 'medium',
    estimatedTime: 12,
    points: 120,
    content: {
      type: 'math',
      equations: [
        '2x + 5 = 15',
        '3y - 7 = 8',
        'z² + 4z = 45'
      ]
    },
    solution: {
      answers: {
        x: 5,
        y: 5,
        z: 5
      }
    },
    tags: ['algebra', 'equations', 'math'],
    isFeatured: false,
    isNew: true
  }
];

async function seedPuzzles() {
  try {
    await connectDB();
    console.log('🌱 Seeding puzzles...');

    // Clear existing puzzles
    await Puzzle.deleteMany({});
    console.log('🗑️ Cleared existing puzzles');

    // Insert sample puzzles
    await Puzzle.insertMany(samplePuzzles);
    console.log(`✅ Added ${samplePuzzles.length} sample puzzles`);

    // Display what was added
    const puzzles = await Puzzle.find().select('title category difficulty points');
    console.log('\n📊 Sample puzzles added:');
    puzzles.forEach(puzzle => {
      console.log(`   - ${puzzle.title} (${puzzle.category}, ${puzzle.difficulty}, ${puzzle.points}pts)`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await closeDB();
    process.exit(0);
  }
}

seedPuzzles();