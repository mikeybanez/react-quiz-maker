// GET /quizzes
export type QuizSchema = {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished: boolean;
  createdAt: string;
};

export type QuestionSchema = {
  id: number; // questionId
  quizId: number;
  type: "mcq" | "short" | "code";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  position: number;
  createdAt: string;
};

type SanitizedQuizSchema = Omit<QuestionSchema, "correctAnswer"> & {
  questions: QuestionSchema[];
};

// POST /attempts
export type AttemptSchema = {
  id: number; // attemptId
  quizId: number;
  startedAt: string;
  submittedAt?: string;
  score?: number;
  // sanitized snapshot
  quiz: Omit<QuestionSchema, "correctAnswer"> & {
    questions: QuestionSchema[];
  };
};

// POST /attempts/:id/answer
export type AttemptAnswerSchema = {
  attemptId: number;
  questionId: number;
  value?: string;
};

export type GradedResult = {
  score: number;
  details: Array<{
    questionId: number;
    correct: boolean;
    expected?: string;
  }>;
};
