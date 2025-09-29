import { useState } from "react";
import TextInput from "../../components/TextInput";
import useCreateQuizMutation from "../../hooks/useCreateQuizMutation";
import type { PageState } from "../../types/Pages";
import type { QuestionObject } from "../../types/Questions";
import Questions from "./Questions";

function CreateQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const createQuizMutation = useCreateQuizMutation();

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
          {createQuizMutation.data && (
            <>
              <Questions questions={questions} setQuestions={setQuestions} />
              <hr />
              <button onClick={() => {}}>Save Quiz</button>
            </>
          )}

          {!createQuizMutation.data && (
            <button
              disabled={quizTitle === "" || quizDescription === ""}
              onClick={() => {
                createQuizMutation.mutate({
                  title: quizTitle,
                  description: quizDescription,
                  isPublished: true,
                  // for now, always publish this as specs do not indicate a workflow with a publish toggle
                });
              }}
            >
              Create New Quiz
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default CreateQuiz;
