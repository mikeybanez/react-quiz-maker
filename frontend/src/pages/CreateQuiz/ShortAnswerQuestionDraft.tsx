import TextInput from "../../components/TextInput";
import type { QuestionSchema, ShortQuestionSchema } from "../../types/Schema";

function ShortAnswerQuestionDraft({
  question,
  modifyQuestion,
}: {
  question: ShortQuestionSchema;
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
      <br />
      <TextInput
        name={`q${question.id}Answer`}
        label="Answer"
        value={question.correctAnswer ?? ""}
        onChange={(e) => {
          modifyQuestion({
            ...question,
            correctAnswer: e.target.value,
          });
        }}
        size={40}
      />
    </>
  );
}

export default ShortAnswerQuestionDraft;
