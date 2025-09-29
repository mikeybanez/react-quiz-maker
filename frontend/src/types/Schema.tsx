// GET /quizzes
export type QuizSchema = {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished: boolean;
  createdAt: string;
};

// POST /quizzes
export type NewQuizSchema = Omit<QuizSchema, "id" | "createdAt">;

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

export type McqQuestionSchema = QuestionSchema & {
  type: "mcq";
  options: string[]; // assert that options are non-optional for client-side purposes
};

export type ShortQuestionSchema = QuestionSchema & { type: "short" };
export type CodeQuestionSchema = QuestionSchema & { type: "code" };

// POST /quizzes/:id/questions and PATCH /questions/:id
export type NewQuestionSchema = Omit<QuestionSchema, "id" | "createdAt">;

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
  quiz: SanitizedQuizSchema;
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
