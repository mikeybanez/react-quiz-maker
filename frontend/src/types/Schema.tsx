export type QuizSchema = {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished: boolean;
  createdAt: string;
};

export type QuestionSchema = {
  id: number;
  quizId: number;
  type: "mcq" | "short" | "code";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  position: number;
  createdAt: string;
};
