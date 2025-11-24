import { useContext } from 'react';
import { PuzzleContext } from '../context/PuzzleContext';

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  
  return context;
};