import { useState } from "react";
import type { QuestionSchema } from "../../types/Schema";

import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";

function McqRenderer({
  question,
  attemptId,
}: {
  question: Omit<QuestionSchema, "correctAnswer">;
  attemptId: number;
}) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const attemptAnswerMutation = useAttemptAnswerMutation();
  const { isPending, isError, data } = attemptAnswerMutation;

  return (
    <div>
      <p>{question.prompt}</p>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {question.options?.map((opt, idx) => (
          <option key={idx} value={opt}>
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
            answer: selectedOption,
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
