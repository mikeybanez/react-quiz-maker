import { useState } from "react";
import TextInput from "../../components/TextInput";
import type { CodeQuestionSchema, QuestionSchema } from "../../types/Schema";

function CodeQuestionDraft({
  question,
  modifyQuestion,
  removeQuestion,
}: {
  question: CodeQuestionSchema;
  modifyQuestion: (newData: QuestionSchema) => void;
  removeQuestion: (questionId: number) => void;
}) {
  const [tempPrompt, setTempPrompt] = useState(question.prompt);
  const handleSave = () => {
    modifyQuestion({
      ...question,
      prompt: tempPrompt,
    });
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
      <button onClick={handleSave} style={{ fontSize: "small" }}>
        Save Question
      </button>
      <button onClick={handleRemove} style={{ fontSize: "small" }}>
        Remove Question
      </button>
    </>
  );
}

export default CodeQuestionDraft;
