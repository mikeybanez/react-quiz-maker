import type {
  MultipleChoiceQuestion as MultipleChoiceQuestionType,
  QuestionObject,
  QuestionType,
  ShortAnswerQuestion as ShortAnswerQuestionType,
} from "../../types/Questions";
import ShortAnswerQuestionDraft from "./ShortAnswerQuestionDraft";
import MultipleChoiceQuestionDraft from "./MultipleChoiceQuestionDraft";

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
  const removeQuestion = () => {
    setQuestions((questions) => questions.filter((_, i) => i !== qNumber));
  };

  const modifyQuestion = (newData: QuestionObject) => {
    setQuestions((questions) =>
      questions.map((q, i) => (i === qNumber ? newData : q))
    );
  };

  return (
    <div style={{ border: "1px dashed black", margin: "8px", padding: "8px" }}>
      Question {qNumber + 1}
      <br />
      <div>
        {type === "multipleChoice" && (
          <MultipleChoiceQuestionDraft
            qNumber={qNumber}
            question={data as MultipleChoiceQuestionType}
            modifyQuestion={modifyQuestion}
          />
        )}
        {type === "shortAnswer" && (
          <ShortAnswerQuestionDraft
            qNumber={qNumber}
            question={data as ShortAnswerQuestionType}
            modifyQuestion={modifyQuestion}
          />
        )}
      </div>
      <button onClick={removeQuestion} style={{ fontSize: "small" }}>
        Remove Question
      </button>
    </div>
  );
}

export default Question;
