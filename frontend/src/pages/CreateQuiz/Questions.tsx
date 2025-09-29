import type { QuestionSchema } from "../../types/Schema";
import Question from "./Question";

function Questions({
  questions,
  setQuestions,
  quizId,
}: {
  questions: QuestionSchema[];
  setQuestions: (
    val: (questions: QuestionSchema[]) => QuestionSchema[]
  ) => void;
  quizId: number;
}) {
  return (
    <>
      <h3>Questions</h3>
      <div>
        {questions.map((q, index) => {
          return <Question key={index} data={q} setQuestions={setQuestions} />;
        })}
      </div>
      <button
        onClick={() => {
          setQuestions((questions) => [
            ...questions,
            {
              quizId,
              type: "mcq",
              prompt: "",
              options: ["", ""],
              correctAnswer: String(0),
              id: 0, //placeholder
              createdAt: String(0), //placeholder
              position: 0,
            },
          ]);
        }}
      >
        Add Multiple Choice Question
      </button>
      <button
        onClick={() => {
          setQuestions((questions) => [
            ...questions,
            {
              quizId,
              type: "short",
              prompt: "",
              correctAnswer: "",
              id: 0, //placeholder
              createdAt: String(0), //placeholder
              position: 0,
            },
          ]);
        }}
      >
        Add Short Answer Question
      </button>
      <button
        onClick={() => {
          setQuestions((questions) => [
            ...questions,
            {
              quizId,
              type: "code",
              prompt: "",
              id: 0, //placeholder
              createdAt: String(0), //placeholder
              position: 0,
            },
          ]);
        }}
      >
        Add Code Question
      </button>
    </>
  );
}

export default Questions;
