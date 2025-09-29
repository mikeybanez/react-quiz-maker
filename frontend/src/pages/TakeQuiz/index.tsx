import { useEffect, useState } from "react";
import useAttemptMutation from "../../hooks/useAttemptMutation";
import type { PageState } from "../../types/Pages";
import QuizRenderer from "./QuizRenderer";
import QuizSelector from "./QuizSelector";

function TakeQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizId, setQuizId] = useState<number | null>(null);
  const mutation = useAttemptMutation();
  const handleStartAttempt = (quizId: number) => {
    mutation.mutate(quizId);
  };

  useEffect(() => {
    // once we have successfully created an attempt, set the quizId to render the quiz
    if (mutation.isSuccess && mutation.data) {
      setQuizId(mutation.data.quizId);
    }
  }, [mutation.isSuccess, mutation.data]);

  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Back to Home</button>
      </nav>
      <div>
        <h2>Quiz Player</h2>
      </div>
      {quizId === null ? (
        <QuizSelector
          setQuizId={setQuizId}
          handleStartAttempt={handleStartAttempt}
        />
      ) : (
        <QuizRenderer attempt={mutation} />
      )}
    </>
  );
}

export default TakeQuiz;
