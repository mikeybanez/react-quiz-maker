import { useState } from "react";
import type { PageState } from "../../types/Pages";
import type { QuestionObject } from "../../types/Questions";
import TextInput from "../../components/TextInput";
import Questions from "./Questions";

function CreateQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionObject[]>([]);

  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Back to Home</button>
      </nav>
      <div>
        <h2>Quiz Builder</h2>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            name="quizTitle"
            label="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            size={30}
          />
          <br />
          <TextInput
            name="quizDescription"
            label="Quiz Description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            size={30}
          />
          <br />
          <hr />
          <Questions questions={questions} setQuestions={setQuestions} />
          <hr />
          <button type="submit" onClick={/* TODO */ () => {}}>
            Save Quiz
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateQuiz;
