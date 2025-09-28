import { useEffect, useMemo, useState } from "react";
import useQuestionsQuery from "../../hooks/useQuestionsQuery";
import type { QuizSchema } from "../../types/Schema";

function QuizRenderer({ quiz }: { quiz: QuizSchema }) {
  // note that currentQuestion here is 0-indexed, and does not
  // correspond to `position`; instead, it corresponds to the index
  // after we have sorted all questions by `position` data.
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // let's use a `Date` object here, and only convert to string when submitting
  // so that we can easily compute elapsed time
  const [startedTime, setStartedTime] = useState<Date | null>(null);
  const { isPending, isError, error, data } = useQuestionsQuery(quiz.id);

  // memoize to sort only once
  const sortedData = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      questions: data.questions.sort((a, b) => a.position - b.position),
    };
  }, [data]);

  useEffect(() => {
    if (data) {
      // now that data is available, we may then start the timer
      setStartedTime(new Date());
    }
  }, [data]);

  if (isPending) return <div>Loading quiz...</div>;
  if (isError) return <div>{`Error loading quiz: ${error}`}</div>;
  console.log(data);

  // We cannot assume that the questions are sorted in the backend
  // We memoize this so we don't perform sort on every render.

  return (
    <div>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      {sortedData ? (
        <>
          <h4>{`Quiz started at ${startedTime?.toLocaleString()}.`}</h4>
          <h4>{`Time limit: ${quiz.timeLimitSeconds} seconds`}</h4>
          <nav>
            <button
              disabled={currentQuestion === 0}
              onClick={() => {
                setCurrentQuestion((q) => q - 1);
              }}
            >
              Previous Question
            </button>
            <span style={{ marginInline: "6px" }}>{`${
              currentQuestion + 1
            }`}</span>
            <button
              disabled={currentQuestion === sortedData.questions.length - 1}
              onClick={() => {
                setCurrentQuestion((q) => q + 1);
              }}
            >
              Next Question
            </button>
          </nav>
          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              border: "1px dashed black",
            }}
          >
            <div>{sortedData.questions[currentQuestion]?.prompt}</div>
          </div>
        </>
      ) : (
        <span>This quiz has no questions.</span>
      )}
    </div>
  );
}

export default QuizRenderer;
