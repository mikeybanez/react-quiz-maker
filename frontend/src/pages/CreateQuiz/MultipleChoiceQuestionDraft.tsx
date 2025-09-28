import type {
  MultipleChoiceQuestion,
  QuestionObject,
} from "../../types/Questions";
import TextInput from "../../components/TextInput";
import AnswerOptions from "./AnswerOptions";

function MultipleChoiceQuestionDraft({
  qNumber,
  question,
  modifyQuestion,
}: {
  qNumber: number;
  question: MultipleChoiceQuestion;
  modifyQuestion: (newData: QuestionObject) => void;
}) {
  return (
    <>
      <TextInput
        name={`q${qNumber}Prompt`}
        label="Prompt"
        value={question.prompt}
        onChange={(e) => {
          modifyQuestion({
            type: "multipleChoice",
            questionData: { ...question, prompt: e.target.value },
          });
        }}
        size={40}
      />
      <AnswerOptions
        qNumber={qNumber}
        question={question}
        modifyQuestion={modifyQuestion}
      />
    </>
  );
}

export default MultipleChoiceQuestionDraft;
