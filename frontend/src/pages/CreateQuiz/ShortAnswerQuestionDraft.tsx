import { useState } from "react";
import TextInput from "../../components/TextInput";
import type { QuestionSchema, ShortQuestionSchema } from "../../types/Schema";

function ShortAnswerQuestionDraft({
  question,
  modifyQuestion,
  removeQuestion,
}: {
  question: ShortQuestionSchema;
  modifyQuestion: (newData: QuestionSchema) => void;
  removeQuestion: (questionId: number) => void;
}) {
  const [tempPrompt, setTempPrompt] = useState(question.prompt);
  const [tempAnswer, setTempAnswer] = useState(question.correctAnswer ?? "");
  const handleSave = () => {
    modifyQuestion({
      ...question,
      prompt: tempPrompt,
      correctAnswer: tempAnswer,
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
      <br />
      <TextInput
        name={`q${question.id}Answer`}
        label="Answer"
        value={tempAnswer}
        onChange={(e) => {
          setTempAnswer(e.target.value);
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

export default ShortAnswerQuestionDraft;
