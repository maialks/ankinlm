export interface QuizData {
  quiz: {
    question: string;
    answerOptions: { text: string; rationale: string; isCorrect: boolean }[];
  }[];
}

export interface FlashcardData {
  flashcards: {
    f: string;
    b: string;
  }[];
}
