import { useCallback, type ChangeEvent } from "react";
import type {
  MultipleChoiceQuestion as MultipleChoiceQuestionType,
  QuestionObject,
  QuestionType,
  ShortAnswerQuestion as ShortAnswerQuestionType,
} from "../../types/Questions";

function MultipleChoiceQuestionDraft() {
  return <>Multiple Choice Question Draft</>;
}

function ShortAnswerQuestionDraft() {
  return <>Short Answer Question Draft</>;
}

function Question({
  qNumber,
  type,
  data,
  setQuestions,
}: {
  qNumber: number;
  type: QuestionType;
  data: MultipleChoiceQuestionType | ShortAnswerQuestionType;
  setQuestions: (
    val: (questions: QuestionObject[]) => QuestionObject[]
  ) => void;
}) {
  const removeQuestion = useCallback(() => {
    setQuestions((questions) => questions.filter((_, i) => i !== qNumber));
  }, [qNumber, setQuestions]);

  return (
    <div style={{ border: "1px dashed black", margin: "8px", padding: "8px" }}>
      Question {qNumber + 1}
      <br />
      <div>
        {type === "multipleChoice" && <MultipleChoiceQuestionDraft />}
        {type === "shortAnswer" && <ShortAnswerQuestionDraft />}
      </div>
      <button onClick={removeQuestion} style={{ fontSize: "small" }}>
        Remove Question
      </button>
    </div>
  );
}

export default Question;
