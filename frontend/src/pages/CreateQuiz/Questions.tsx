import { useState } from "react";
import type { QuestionObject } from "../../types/Questions";
import Question from "./Question";

function Questions() {
  const [questions, setQuestions] = useState<QuestionObject[]>([]);

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
              questionData: { prompt: "", options: [], correctOptionIndex: -1 },
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
