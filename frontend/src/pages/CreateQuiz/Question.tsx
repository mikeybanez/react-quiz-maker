import type {
  CodeQuestionSchema,
  McqQuestionSchema,
  QuestionSchema,
  ShortQuestionSchema,
} from "../../types/Schema";
import CodeQuestionDraft from "./CodeQuestionDraft";
import MultipleChoiceQuestionDraft from "./MultipleChoiceQuestionDraft";
import ShortAnswerQuestionDraft from "./ShortAnswerQuestionDraft";

function Question({
  data,
  setQuestions,
}: {
  data: QuestionSchema;
  setQuestions: (
    val: (questions: QuestionSchema[]) => QuestionSchema[]
  ) => void;
}) {
  const removeQuestion = () => {
    setQuestions((questions) => questions.filter((q) => q.id !== data.id));
  };

  const modifyQuestion = (newQuestion: QuestionSchema) => {
    setQuestions((questions) =>
      questions.map((q) => (q.id === data.id ? newQuestion : q))
    );
  };

  return (
    <div style={{ border: "1px dashed black", margin: "8px", padding: "8px" }}>
      <br />
      <div>
        {data.type === "mcq" && (
          <MultipleChoiceQuestionDraft
            question={data as McqQuestionSchema}
            modifyQuestion={modifyQuestion}
          />
        )}
        {data.type === "short" && (
          <ShortAnswerQuestionDraft
            question={data as ShortQuestionSchema}
            modifyQuestion={modifyQuestion}
          />
        )}
        {data.type === "code" && (
          <CodeQuestionDraft
            question={data as CodeQuestionSchema}
            modifyQuestion={modifyQuestion}
          />
        )}
      </div>
      <button onClick={removeQuestion} style={{ fontSize: "small" }}>
        Remove Question
      </button>
    </div>
  );
}

export default Question;
