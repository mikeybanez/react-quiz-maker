import type { QuestionObject } from "../../types/Questions";
import Question from "./Question";

function Questions({
  questions,
  setQuestions,
}: {
  questions: QuestionObject[];
  setQuestions: (
    val: (questions: QuestionObject[]) => QuestionObject[]
  ) => void;
}) {
  return (
    <>
      <h3>Questions</h3>
      <div>
        {questions.map((q, index) => {
          return (
            <Question
              key={index}
              qNumber={index}
              type={q.type}
              data={q.questionData}
              setQuestions={setQuestions}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          setQuestions((questions) => [
            ...questions,
            {
              type: "multipleChoice",
              questionData: {
                prompt: "",
                options: ["", ""],
                correctOptionIndex: 0,
              },
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
              type: "shortAnswer",
              questionData: { prompt: "", correctAnswer: "" },
            },
          ]);
        }}
      >
        Add Short Answer Question
      </button>
    </>
  );
}

export default Questions;
