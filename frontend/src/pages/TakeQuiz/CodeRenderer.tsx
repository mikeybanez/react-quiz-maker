import type { QuestionSchema } from "../../types/Schema";

import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";

function CodeRenderer({
  answers,
  setAnswers,
  question,
  attemptId,
  currentQuestion,
}: {
  answers: string[];
  setAnswers: (newAnswers: string[]) => void;
  question: Omit<QuestionSchema, "correctAnswer">;
  attemptId: number;
  currentQuestion: number;
}) {
  const attemptAnswerMutation = useAttemptAnswerMutation();
  const { isPending, isError, data } = attemptAnswerMutation;

  return (
    <div>
      <p>{question.prompt}</p>
      <textarea
        value={answers[currentQuestion]}
        onChange={(e) =>
          setAnswers(
            answers.map((ans, i) =>
              i === currentQuestion ? e.target.value : ans
            )
          )
        }
        cols={60}
        rows={8}
      />
      <br />
      <button
        onClick={() => {
          attemptAnswerMutation.mutate({
            attemptId,
            questionId: question.id,
            answer: answers[currentQuestion],
          });
        }}
        disabled={isPending}
      >
        {isError
          ? `Error submitting answer. Try again?`
          : data
          ? "Resubmit Answer"
          : "Submit Answer"}
      </button>
    </div>
  );
}

export default CodeRenderer;
