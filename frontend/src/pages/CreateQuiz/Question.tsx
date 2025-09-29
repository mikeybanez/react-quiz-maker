import useRemoveQuestionMutation from "../../hooks/useRemoveQuestionMutation";
import useUpdateQuestionMutation from "../../hooks/useUpdateQuestionMutation";
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
  const updateQuestionMutation = useUpdateQuestionMutation();
  const removeQuestionMutation = useRemoveQuestionMutation();

  const removeQuestion = () => {
    removeQuestionMutation.mutate(data.id, {
      onSuccess: (data) => {
        setQuestions((questions) => questions.filter((q) => q.id !== data.id));
      },
    });
  };

  const modifyQuestion = (newQuestion: QuestionSchema) => {
    updateQuestionMutation.mutate(newQuestion, {
      onSuccess: (data) => {
        setQuestions((questions) =>
          questions.map((q) => (q.id === data.id ? newQuestion : q))
        );
      },
    });
  };

  return (
    <div style={{ border: "1px dashed black", margin: "8px", padding: "8px" }}>
      <br />
      <div>
        {data.type === "mcq" && (
          <MultipleChoiceQuestionDraft
            question={data as McqQuestionSchema}
            modifyQuestion={modifyQuestion}
            removeQuestion={removeQuestion}
          />
        )}
        {data.type === "short" && (
          <ShortAnswerQuestionDraft
            question={data as ShortQuestionSchema}
            modifyQuestion={modifyQuestion}
            removeQuestion={removeQuestion}
          />
        )}
        {data.type === "code" && (
          <CodeQuestionDraft
            question={data as CodeQuestionSchema}
            modifyQuestion={modifyQuestion}
            removeQuestion={removeQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default Question;
