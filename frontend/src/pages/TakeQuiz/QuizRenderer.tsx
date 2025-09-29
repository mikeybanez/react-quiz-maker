import { useEffect, useMemo, useRef, useState } from "react";
import useAttemptMutation from "../../hooks/useAttemptMutation";
import type { AttemptSchema } from "../../types/Schema";
import CodeRenderer from "./CodeRenderer";
import McqRenderer from "./McqRenderer";
import ShortRenderer from "./ShortRenderer";

function QuizRenderer({
  attempt,
}: {
  attempt: ReturnType<typeof useAttemptMutation>;
}) {
  // note that currentQuestion here is 0-indexed, and does not
  // correspond to `position`; instead, it corresponds to the index
  // after we have sorted all questions by `position` data.
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // let's use a `Date` object here, and only convert to string when submitting
  // so that we can easily compute elapsed time
  const [startedTime, setStartedTime] = useState<Date | null>(null);
  const { isPending, isError, error, data } = attempt;
  const [isOutOfTime, setIsOutOfTime] = useState<boolean>(false);
  const attemptTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // memoize to sort only once
  const sortedData = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      quiz: {
        ...data.quiz,
        questions: (data as AttemptSchema).quiz.questions.sort(
          (a, b) => a.position - b.position
        ),
      },
    };
  }, [data]);

  useEffect(() => {
    if (data) {
      // now that data is available, we may then start the timer
      setStartedTime(new Date());
      setIsOutOfTime(false);
      if (data.timeLimitSeconds) {
        attemptTimer.current = setTimeout(() => {
          setIsOutOfTime(true);

          // TODO: force submit the quiz
        }, data.timeLimitSeconds * 1000);
      }
    }

    // don't forget the cleanup function, in case user
    // wants to take multiple quizzes in one session
    return () => {
      clearTimeout(attemptTimer.current);
    };
  }, [data]);

  if (isPending) return <div>Loading quiz...</div>;
  if (isError) return <div>{`Error loading quiz: ${error}`}</div>;

  return (
    <div>
      {/* TODO: ran-out-of-time view */}
      {/* TODO: isPending (loading) view */}
      {sortedData ? (
        <>
          <h3>{sortedData?.title}</h3>
          <p>{sortedData?.description}</p>
          <h6>{`Quiz started at ${startedTime?.toLocaleString()}.`}</h6>
          <h6>{`Time limit: ${sortedData.quiz.timeLimitSeconds} seconds`}</h6>
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
              disabled={
                currentQuestion === sortedData.quiz.questions.length - 1
              }
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
            {sortedData.quiz.questions[currentQuestion]?.type === "mcq" && (
              <McqRenderer
                question={sortedData.quiz.questions[currentQuestion]}
                key={sortedData.quiz.questions[currentQuestion].id}
              />
            )}
            {sortedData.quiz.questions[currentQuestion]?.type === "short" && (
              <ShortRenderer
                question={sortedData.quiz.questions[currentQuestion]}
                key={sortedData.quiz.questions[currentQuestion].id}
              />
            )}
            {sortedData.quiz.questions[currentQuestion]?.type === "code" && (
              <CodeRenderer
                question={sortedData.quiz.questions[currentQuestion]}
                key={sortedData.quiz.questions[currentQuestion].id}
              />
            )}
          </div>
        </>
      ) : (
        <span>This quiz has no questions.</span>
      )}
    </div>
  );
}

export default QuizRenderer;
