export type QuestionType = "multipleChoice" | "shortAnswer";

/* TODO: figure out optional snippet for display? */
export type MultipleChoiceQuestion = {
  prompt: string;
  options: string[];
  correctOptionIndex: number;
};

export type ShortAnswerQuestion = {
  prompt: string;
  correctAnswer: string;
};

export type QuestionObject =
  | { type: "multipleChoice"; questionData: MultipleChoiceQuestion }
  | { type: "shortAnswer"; questionData: ShortAnswerQuestion };

export type Quiz = {
  title: string;
  description: string;
  category: string;
  questions: QuestionObject[];
};
