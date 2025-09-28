import { useState } from "react";
import type { PageState } from "../../types/Pages";
import TextInput from "../../components/TextInput";
import Questions from "./Questions";

function CreateQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Back to Home</button>
      </nav>
      <div>
        <h2>Quiz Builder</h2>
      </div>
      <div>
        {/* TODO: move label and input into their own component; document best practice of htmlFor */}
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            name="quizTitle"
            label="Quiz Title"
            value={quizTitle}
            setValue={setQuizTitle}
          />
          <br />
          <TextInput
            name="quizDescription"
            label="Quiz Description"
            value={quizDescription}
            setValue={setQuizDescription}
          />
          <br />
          <hr />
          <Questions />
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
