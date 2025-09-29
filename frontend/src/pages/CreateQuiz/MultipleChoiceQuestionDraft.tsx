import { useState } from "react";
import TextInput from "../../components/TextInput";
import TransitionButton from "../../components/TransitionButton";
import useRemoveQuestionMutation from "../../hooks/useRemoveQuestionMutation";
import useUpdateQuestionMutation from "../../hooks/useUpdateQuestionMutation";
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
  const updateMutation = useUpdateQuestionMutation();
  const removeMutation = useRemoveQuestionMutation();
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
      <TransitionButton
        onClick={handleSave}
        style={{ fontSize: "small" }}
        disabled={updateMutation.isPending || removeMutation.isPending}
        isPending={updateMutation.isPending}
        isError={updateMutation.isError}
        isSuccess={updateMutation.isSuccess}
      >
        Save Question
      </TransitionButton>
      <TransitionButton
        onClick={handleRemove}
        style={{ fontSize: "small" }}
        disabled={removeMutation.isPending || removeMutation.isPending}
        isPending={removeMutation.isPending}
        isError={removeMutation.isError}
        isSuccess={removeMutation.isSuccess}
      >
        Remove Question
      </TransitionButton>
    </>
  );
}

export default MultipleChoiceQuestionDraft;
