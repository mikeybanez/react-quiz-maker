import { useState } from "react";
import TextInput from "../../components/TextInput";
import type { McqQuestionSchema, QuestionSchema } from "../../types/Schema";
import AnswerOptions from "./AnswerOptions";

function MultipleChoiceQuestionDraft({
  question,
  modifyQuestion,
  removeQuestion,
}: {
  question: McqQuestionSchema;
  modifyQuestion: (newData: QuestionSchema) => void;
  removeQuestion: (questionId: number) => void;
}) {
  const [tempPrompt, setTempPrompt] = useState(question.prompt);
  const handleSave = () => {
    // TODO
  };
  const handleRemove = () => {
    removeQuestion(question.id);
  };
  return (
    <>
      <TextInput
        name={`q${question.id}Prompt`}
        label="Prompt"
        value={tempPrompt}
        onChange={(e) => {
          setTempPrompt(e.target.value);
        }}
        size={40}
      />
      <AnswerOptions question={question} modifyQuestion={modifyQuestion} />
      <button onClick={handleSave} style={{ fontSize: "small" }}>
        Save Question
      </button>
      <button onClick={handleRemove} style={{ fontSize: "small" }}>
        Remove Question
      </button>
    </>
  );
}

export default MultipleChoiceQuestionDraft;
