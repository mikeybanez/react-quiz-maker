import TextInput from "../../components/TextInput";
import type { McqQuestionSchema, QuestionSchema } from "../../types/Schema";

// a list of options for a multiple choice question
// Let's just go with index for correct answer, to avoid running into duplicate answers
function AnswerOptions({
  question,
  setQuestion,
}: {
  question: McqQuestionSchema;
  setQuestion: (newData: QuestionSchema) => void;
}) {
  const { options, id: questionId } = question;
  const correctAnswer = Number(question.correctAnswer);
  return (
    <div>
      <h4>Choices</h4>
      <br />
      <div>
        {options.map((option, i) => {
          return (
            <div key={`q${questionId}o${i}`}>
              <TextInput
                name={`q${questionId}o${i}`}
                label={`Option ${i + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[i] = e.target.value;
                  setQuestion({
                    ...question,
                    options: newOptions,
                  });
                }}
                size={20}
              />
              <button
                onClick={() => {
                  setQuestion({
                    ...question,
                    correctAnswer: String(i),
                  });
                }}
                disabled={correctAnswer === i}
              >
                {correctAnswer === i
                  ? "✔️ Mark as correct answer"
                  : "❌ Mark as correct answer"}
              </button>
              <button
                onClick={() => {
                  const newOptions = options.filter((_, index) => i !== index);
                  let newCorrectIndex: string;
                  if (i === correctAnswer) {
                    newCorrectIndex = "0"; // ensure there's always a correct answer after removing an option
                  } else if (i < correctAnswer) {
                    newCorrectIndex = String(correctAnswer - 1);
                  } else {
                    newCorrectIndex = String(correctAnswer);
                  }
                  setQuestion({
                    ...question,
                    options: newOptions,
                    correctAnswer: newCorrectIndex,
                  });
                }}
                disabled={options.length <= 1}
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
          setQuestion({
            ...question,
            options: [...options, ""],
          });
        }}
      >
        Add Option
      </button>
      <hr />
    </div>
  );
}

export default AnswerOptions;
