import type { QuestionSchema } from "../../types/Schema";

import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";

function McqRenderer({
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
      <select
        value={answers[currentQuestion]}
        onChange={(e) => {
          setAnswers(
            answers.map((ans, index) => {
              return index === currentQuestion ? String(e.target.value) : ans;
            })
          );
        }}
      >
        {question.options?.map((opt, index) => (
          <option key={index} value={String(index)}>
            {opt}
          </option>
        ))}
      </select>
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

export default McqRenderer;
