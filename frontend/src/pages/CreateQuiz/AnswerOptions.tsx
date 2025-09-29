import TextInput from "../../components/TextInput";
import type { McqQuestionSchema, QuestionSchema } from "../../types/Schema";

// a list of options for a multiple choice question
// Let's just go with index for correct answer, to avoid running into duplicate answers
function AnswerOptions({
  question,
  modifyQuestion,
}: {
  question: McqQuestionSchema;
  modifyQuestion: (newData: QuestionSchema) => void;
}) {
  return (
    <div>
      <h4>Choices</h4>
      <br />
      <div>
        {question.options.map((option, i) => {
          return (
            <div key={`q${question.id}o${i}`}>
              <TextInput
                name={`q${question.id}o${i}`}
                label={`Option ${i + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[i] = e.target.value;
                  modifyQuestion({
                    ...question,
                    options: question.options.map((opt, j) => {
                      if (i !== j) return opt;
                      return e.target.value;
                    }),
                  });
                }}
                size={20}
              />
              <button
                onClick={() => {
                  modifyQuestion({
                    ...question,
                    correctAnswer: String(i),
                  });
                }}
                disabled={question.correctAnswer === String(i)}
              >
                {question.correctAnswer === String(i)
                  ? "✔️ Mark as correct answer"
                  : "❌ Mark as correct answer"}
              </button>
              <button
                onClick={() => {
                  const newOptions = question.options.filter(
                    (_, index) => i !== index
                  );
                  let newCorrectIndex = question.correctAnswer;
                  if (i === Number(question.correctAnswer)) {
                    newCorrectIndex = String(0); // ensure there's always a correct answer
                  } else if (i < Number(question.correctAnswer)) {
                    newCorrectIndex = String(
                      Number(question.correctAnswer) - 1
                    );
                  }
                  modifyQuestion({
                    ...question,
                    options: newOptions,
                    correctAnswer: newCorrectIndex,
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
