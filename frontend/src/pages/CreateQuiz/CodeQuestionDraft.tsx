import TextInput from "../../components/TextInput";
import type { CodeQuestionSchema, QuestionSchema } from "../../types/Schema";

function CodeQuestionDraft({
  question,
  modifyQuestion,
}: {
  question: CodeQuestionSchema;
  modifyQuestion: (newData: QuestionSchema) => void;
}) {
  return (
    <>
      <TextInput
        name={`q${question.id}Prompt`}
        label="Prompt"
        value={question.prompt}
        onChange={(e) => {
          modifyQuestion({
            ...question,
            prompt: e.target.value,
          });
        }}
        size={40}
      />
    </>
  );
}

export default CodeQuestionDraft;
