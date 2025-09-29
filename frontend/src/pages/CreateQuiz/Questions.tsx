import useCreateQuestionMutation from "../../hooks/useCreateQuestionMutation";
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
  const createQuestionMutation = useCreateQuestionMutation();

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
          createQuestionMutation.mutate(
            {
              quizId,
              question: {
                quizId,
                type: "mcq",
                prompt: "Multiple choice question goes here",
                options: ["", ""],
                correctAnswer: "0",
                position: questions.length,
              },
            },
            {
              onSuccess: (data) => {
                setQuestions((questions) => [
                  ...questions,
                  {
                    ...data,
                    correctAnswer: String(data.correctAnswer),
                  },
                ]);
              },
            }
          );
        }}
        disabled={createQuestionMutation.isPending}
      >
        Add Multiple Choice Question
      </button>
      <button
        onClick={() => {
          createQuestionMutation.mutate(
            {
              quizId,
              question: {
                quizId,
                type: "short",
                prompt: "Short answer question goes here",
                correctAnswer: "",
                position: 0,
              },
            },
            {
              onSuccess: (data) => {
                setQuestions((questions) => [...questions, data]);
              },
            }
          );
        }}
        disabled={createQuestionMutation.isPending}
      >
        Add Short Answer Question
      </button>
      <button
        onClick={() => {
          createQuestionMutation.mutate(
            {
              quizId,
              question: {
                quizId,
                type: "code",
                prompt: "Code question goes here",
                position: 0,
              },
            },
            {
              onSuccess: (data) => {
                setQuestions((questions) => [...questions, data]);
              },
            }
          );
        }}
        disabled={createQuestionMutation.isPending}
      >
        Add Code Question
      </button>
      <br />
      {createQuestionMutation.isError && (
        <span
          style={{ color: "red" }}
        >{`An error occurred while creating a question. ${createQuestionMutation.error}`}</span>
      )}
    </>
  );
}

export default Questions;
