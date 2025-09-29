import { useState } from "react";
import TextInput from "../../components/TextInput";
import useCreateQuizMutation from "../../hooks/useCreateQuizMutation";
import useUpdateQuizMetadataMutation from "../../hooks/useUpdateQuizMetadata";
import type { PageState } from "../../types/Pages";
import type { QuestionSchema, QuizSchema } from "../../types/Schema";
import Questions from "./Questions";

function CreateQuiz({ setPage }: { setPage: (page: PageState) => void }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionSchema[]>([]);
  const [done, setDone] = useState(false);
  const createQuizMutation = useCreateQuizMutation();
  const updateQuizMutation = useUpdateQuizMetadataMutation();

  return (
    <>
      <nav>
        <button onClick={() => setPage("home")}>Back to Home</button>
      </nav>
      <div>
        <h2>Quiz Builder</h2>
      </div>
      {!done && (
        <>
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
                  <Questions
                    quizId={(createQuizMutation.data as QuizSchema).id}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                  <hr />
                  <button
                    onClick={() => {
                      updateQuizMutation.mutate(
                        {
                          id: (createQuizMutation.data as QuizSchema).id,
                          title: quizTitle,
                          description: quizDescription,
                        },
                        {
                          onSuccess: () => {
                            setDone(true);
                          },
                        }
                      );
                    }}
                  >
                    Save All Changes to Quiz
                  </button>
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
      )}
      {done && (
        <h2>{`Quiz created with id: ${
          (createQuizMutation.data as QuizSchema).id
        }`}</h2>
      )}
    </>
  );
}

export default CreateQuiz;
