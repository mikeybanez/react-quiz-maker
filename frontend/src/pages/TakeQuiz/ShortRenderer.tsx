import type { QuestionSchema } from "../../types/Schema";

import TextInput from "../../components/TextInput";
import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";

function ShortRenderer({
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
      <TextInput
        name="shortAnswer"
        label="Answer"
        value={answers[currentQuestion]}
        onChange={(e) =>
          setAnswers(
            answers.map((ans, i) =>
              i === currentQuestion ? e.target.value : ans
            )
          )
        }
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

export default ShortRenderer;
