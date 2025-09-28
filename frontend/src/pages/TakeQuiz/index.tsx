import { useState } from "react";
import useQuizzesQuery from "../../hooks/useQuizzesQuery";
import type { PageState } from "../../types/Pages";
import type { QuizSchema } from "../../types/Schema";
import QuizRenderer from "./QuizRenderer";
import QuizSelector from "./QuizSelector";

function TakeQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizNum, setQuizNum] = useState<number | null>(null);
  const { data } = useQuizzesQuery();
  const currentQuiz = data?.find((quiz: QuizSchema) => quiz.id === quizNum);
  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Back to Home</button>
      </nav>
      <div>
        <h2>Quiz Player</h2>
      </div>
      {quizNum === null ? (
        <QuizSelector setQuizNum={setQuizNum} />
      ) : (
        <QuizRenderer quiz={currentQuiz} />
      )}
    </>
  );
}

export default TakeQuiz;
