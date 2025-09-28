import type {
  MultipleChoiceQuestion,
  QuestionObject,
} from "../../types/Questions";
import TextInput from "../../components/TextInput";

// a list of options for a multiple choice question
function AnswerOptions({
  qNumber,
  question,
  modifyQuestion,
}: {
  qNumber: number;
  question: MultipleChoiceQuestion;
  modifyQuestion: (newData: QuestionObject) => void;
}) {
  return (
    <div>
      <h4>Choices</h4>
      <br />
      <div>
        {question.options.map((option, i) => {
          return (
            <div key={`q${qNumber}o${i}`}>
              <TextInput
                name={`q${qNumber}o${i}`}
                label={`Option ${i + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[i] = e.target.value;
                  modifyQuestion({
                    type: "multipleChoice",
                    questionData: {
                      ...question,
                      options: newOptions,
                    },
                  });
                }}
                size={20}
              />
              <button
                onClick={() => {
                  modifyQuestion({
                    type: "multipleChoice",
                    questionData: {
                      ...question,
                      correctOptionIndex: i,
                    },
                  });
                }}
                disabled={question.correctOptionIndex === i}
              >
                {question.correctOptionIndex === i
                  ? "✔️ Mark as correct answer"
                  : "❌ Mark as correct answer"}
              </button>
              <button
                onClick={() => {
                  const newOptions = question.options.filter(
                    (_, index) => i !== index
                  );
                  let newCorrectIndex = question.correctOptionIndex;
                  if (i === question.correctOptionIndex) {
                    newCorrectIndex = 0; // ensure there's always a correct answer
                  } else if (i < question.correctOptionIndex) {
                    newCorrectIndex -= 1;
                  }
                  modifyQuestion({
                    type: "multipleChoice",
                    questionData: {
                      ...question,
                      options: newOptions,
                      correctOptionIndex: newCorrectIndex,
                    },
                  });
                }}
                disabled={question.options.length <= 1}
              >
                Remove
              </button>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <button
        style={{ marginLeft: "8px" }}
        onClick={() => {
          const newOptions = [...question.options, ""];
          modifyQuestion({
            type: "multipleChoice",
            questionData: {
              ...question,
              options: newOptions,
            },
          });
        }}
      >
        Add Option
      </button>
      <hr />
      <br />
    </div>
  );
}

export default AnswerOptions;
