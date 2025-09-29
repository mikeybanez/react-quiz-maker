import { useState } from "react";
import type { QuestionSchema } from "../../types/Schema";

import TextInput from "../../components/TextInput";
import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";

function ShortRenderer({
  question,
  attemptId,
}: {
  question: Omit<QuestionSchema, "correctAnswer">;
  attemptId: number;
}) {
  const [answer, setAnswer] = useState<string>("");
  const attemptAnswerMutation = useAttemptAnswerMutation();
  const { isPending, isError, data } = attemptAnswerMutation;

  return (
    <div>
      <p>{question.prompt}</p>
      <TextInput
        name="shortAnswer"
        label="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          attemptAnswerMutation.mutate({
            attemptId,
            questionId: question.id,
            answer,
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

export default ShortRenderer;
