import { useEffect, useState } from "react";
import useAttemptAnswerMutation from "../../hooks/useAttemptAnswerMutation";
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
  const [answers, setAnswers] = useState<string[]>([]);
  // note that currentQuestion here is 0-indexed, and does not
  // correspond to `position`. But backend appears to already
  // sort by position ASC so we should be fine
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const { isPending, isError, error, data: attemptData, isSuccess } = attempt;
  const answerMutation = useAttemptAnswerMutation();
  const endQuizMutation = useEndQuizMutation();
  const { data: endQuizData } = endQuizMutation;

  const questions = (attemptData as AttemptSchema).quiz.questions;

  const submitQuiz = () => {
    const submissions = Promise.all(
      answers.map(async (ans, index) => {
        return await answerMutation.mutateAsync({
          attemptId: (attemptData as AttemptSchema).id,
          questionId: questions[index].id,
          answer: ans,
        });
      })
    );
    submissions.then(() => {
      endQuizMutation.mutate(attemptData.id);
    });
  };

  useEffect(() => {
    if (isSuccess && attemptData) {
      const quiz = (attemptData as AttemptSchema).quiz;
      setAnswers(new Array(quiz.questions.length).fill(""));
    }
  }, [isSuccess, attemptData]);

  if (isPending) return <div>Loading quiz...</div>;
  if (isError) return <div>{`Error loading quiz: ${error}`}</div>;

  return (
    <div>
      {/* TODO: isPending (loading) view */}
      {questions && questions.length === 0 && (
        <span>This quiz has no questions.</span>
      )}
      {questions && questions.length && !endQuizData && (
        <>
          <h3>{attemptData?.title}</h3>
          <p>{attemptData?.description}</p>
          <QuizNavigation
            currentQuestion={currentQuestion}
            numQuestions={questions.length}
            setCurrentQuestion={setCurrentQuestion}
          />
          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              border: "1px dashed black",
            }}
          >
            <hr />
            <br />
            {questions[currentQuestion]?.type === "mcq" && (
              <McqRenderer
                question={questions[currentQuestion]}
                key={questions[currentQuestion].id}
                attemptId={attemptData.id}
                answers={answers}
                setAnswers={setAnswers}
                currentQuestion={currentQuestion}
              />
            )}
            {questions[currentQuestion]?.type === "short" && (
              <ShortRenderer
                question={questions[currentQuestion]}
                key={questions[currentQuestion].id}
                attemptId={attemptData.id}
                answers={answers}
                setAnswers={setAnswers}
                currentQuestion={currentQuestion}
              />
            )}
            {questions[currentQuestion]?.type === "code" && (
              <CodeRenderer
                question={questions[currentQuestion]}
                key={questions[currentQuestion].id}
                attemptId={attemptData.id}
                answers={answers}
                setAnswers={setAnswers}
                currentQuestion={currentQuestion}
              />
            )}
          </div>
          <button onClick={submitQuiz}>End quiz and get score</button>
        </>
      )}
      {questions && endQuizData && (
        <ScoreBoard
          endQuizData={endQuizData}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

export default QuizRenderer;
