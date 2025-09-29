import { useEffect, useMemo, useRef, useState } from "react";
import useAttemptMutation from "../../hooks/useAttemptMutation";
import useEndQuizMutation from "../../hooks/useEndQuizMutation";
import type { AttemptSchema } from "../../types/Schema";
import CodeRenderer from "./CodeRenderer";
import McqRenderer from "./McqRenderer";
import QuizNavigation from "./QuizNavigation";
import ScoreBoard from "./ScoreBoard";
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
  const endQuizMutation = useEndQuizMutation();
  const { data: endQuizData } = endQuizMutation;

  // memoize to sort questions only once
  const sortedQuestions = useMemo(() => {
    if (!data) return null;

    return (data as AttemptSchema).quiz.questions.sort(
      (a, b) => a.position - b.position
    );
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
      {sortedQuestions && sortedQuestions.length === 0 && (
        <span>This quiz has no questions.</span>
      )}
      {sortedQuestions && sortedQuestions.length && !endQuizData && (
        <>
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <h6>{`Quiz started at ${startedTime?.toLocaleString()}.`}</h6>
          <h6>{`Time limit: ${data.quiz.timeLimitSeconds} seconds`}</h6>
          <QuizNavigation
            currentQuestion={currentQuestion}
            numQuestions={sortedQuestions.length}
            setCurrentQuestion={setCurrentQuestion}
          />
          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              border: "1px dashed black",
            }}
          >
            <span>
              <em>
                Please make sure to Submit Answer every time you answer a
                question.
              </em>
            </span>
            <hr />
            <br />
            {sortedQuestions[currentQuestion]?.type === "mcq" && (
              <McqRenderer
                question={sortedQuestions[currentQuestion]}
                key={sortedQuestions[currentQuestion].id}
                attemptId={data.id}
              />
            )}
            {sortedQuestions[currentQuestion]?.type === "short" && (
              <ShortRenderer
                question={sortedQuestions[currentQuestion]}
                key={sortedQuestions[currentQuestion].id}
                attemptId={data.id}
              />
            )}
            {sortedQuestions[currentQuestion]?.type === "code" && (
              <CodeRenderer
                question={sortedQuestions[currentQuestion]}
                key={sortedQuestions[currentQuestion].id}
                attemptId={data.id}
              />
            )}
          </div>
          <button
            onClick={() => {
              endQuizMutation.mutate(data.id);
            }}
          >
            End quiz and get score
          </button>
        </>
      )}
      {sortedQuestions && endQuizData && (
        <ScoreBoard
          endQuizData={endQuizData}
          totalQuestions={sortedQuestions.length}
        />
      )}
    </div>
  );
}

export default QuizRenderer;
