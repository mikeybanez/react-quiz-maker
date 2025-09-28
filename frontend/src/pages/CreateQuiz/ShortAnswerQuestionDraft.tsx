import TextInput from "../../components/TextInput";
import type {
  QuestionObject,
  ShortAnswerQuestion,
} from "../../types/Questions";

function ShortAnswerQuestionDraft({
  qNumber,
  question,
  modifyQuestion,
}: {
  qNumber: number;
  question: ShortAnswerQuestion;
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
            type: "shortAnswer",
            questionData: { ...question, prompt: e.target.value },
          });
        }}
        size={40}
      />
      <br />
      <TextInput
        name={`q${qNumber}Answer`}
        label="Answer"
        value={question.correctAnswer}
        onChange={(e) => {
          modifyQuestion({
            type: "shortAnswer",
            questionData: { ...question, correctAnswer: e.target.value },
          });
        }}
        size={40}
      />
    </>
  );
}

export default ShortAnswerQuestionDraft;
