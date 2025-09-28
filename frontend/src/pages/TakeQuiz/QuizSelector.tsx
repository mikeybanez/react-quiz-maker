import { useEffect, useState } from "react";
import useQuizzesQuery from "../../hooks/useQuizzesQuery";
import type { QuizSchema } from "../../types/Schema";

function QuizSelector({ setQuizNum }: { setQuizNum: (num: number) => void }) {
  // TODO: correctly handle initial state
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const { isPending, isError, error, data } = useQuizzesQuery();

  useEffect(() => {
    if (data && data.length > 0 && selectedQuiz === null) {
      setSelectedQuiz(data[0].id);
    }
  }, [data, selectedQuiz]);

  if (isPending) return <div>Loading quizzes...</div>;
  if (isError) return <div>{`Error loading quizzes: ${error}`}</div>;

  return (
    <>
      {/** TODO: extract select into its component, with a label */}
      <select
        id="quizSelect"
        value={selectedQuiz !== null ? selectedQuiz : undefined}
        onChange={(e) => setSelectedQuiz(Number(e.target.value))}
      >
        {data.map((quiz: QuizSchema) => (
          <option
            key={quiz.id}
            value={quiz.id}
          >{`${quiz.id}: ${quiz.title}`}</option>
        ))}
      </select>
      <br />
      <button
        disabled={selectedQuiz === null}
        onClick={() => {
          if (selectedQuiz !== null) {
            setQuizNum(selectedQuiz);
          }
        }}
      >
        Attempt Quiz
      </button>
    </>
  );
}

export default QuizSelector;
