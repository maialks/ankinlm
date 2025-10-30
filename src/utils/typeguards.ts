import type { FlashcardData, QuizData } from '../types';

export function isQuizData(data: unknown): data is QuizData {
  return !!(data && typeof data === 'object' && 'quiz' in data && Array.isArray(data.quiz));
}

export function isFlashcardData(data: unknown): data is FlashcardData {
  return !!(
    data &&
    typeof data === 'object' &&
    'flashcards' in data &&
    Array.isArray(data.flashcards)
  );
}
