import TextInput from "../../components/TextInput";
import TransitionButton from "../../components/TransitionButton";
import useRemoveQuestionMutation from "../../hooks/useRemoveQuestionMutation";
import useUpdateQuestionMutation from "../../hooks/useUpdateQuestionMutation";
import type { McqQuestionSchema, QuestionSchema } from "../../types/Schema";
import AnswerOptions from "./AnswerOptions";

function MultipleChoiceQuestionDraft({
  question,
  setQuestion,
  removeQuestion,
}: {
  question: McqQuestionSchema;
  setQuestion: (newData: QuestionSchema) => void;
  removeQuestion: (questionId: number) => void;
}) {
  const updateMutation = useUpdateQuestionMutation();
  const removeMutation = useRemoveQuestionMutation();
  const handleSave = () => {
    updateMutation.mutate(question);
  };
  const handleRemove = () => {
    removeQuestion(question.id);
  };
  return (
    <>
      <TextInput
        name={`q${question.id}Prompt`}
        label="Prompt"
        value={question.prompt}
        onChange={(e) => {
          setQuestion({
            ...question,
            prompt: e.target.value,
          });
        }}
        size={40}
      />
      <AnswerOptions question={question} setQuestion={setQuestion} />
      <TransitionButton
        onClick={handleSave}
        style={{ fontSize: "small" }}
        disabled={updateMutation.isPending || removeMutation.isPending}
        isPending={updateMutation.isPending}
        isError={updateMutation.isError}
        isSuccess={updateMutation.isSuccess}
      >
        Save Changes to Question
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
