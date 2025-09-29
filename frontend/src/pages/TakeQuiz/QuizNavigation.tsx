import type { Dispatch, SetStateAction } from "react";

function QuizNavigation({
  currentQuestion,
  setCurrentQuestion,
  numQuestions,
}: {
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  numQuestions: number;
}) {
  return (
    <nav>
      <button
        disabled={currentQuestion === 0}
        onClick={() => {
          setCurrentQuestion((q) => q - 1);
        }}
      >
        Previous Question
      </button>
      <span style={{ marginInline: "6px" }}>{`${currentQuestion + 1}`}</span>
      <button
        disabled={currentQuestion === numQuestions - 1}
        onClick={() => {
          setCurrentQuestion((q) => q + 1);
        }}
      >
        Next Question
      </button>
    </nav>
  );
}

export default QuizNavigation;
