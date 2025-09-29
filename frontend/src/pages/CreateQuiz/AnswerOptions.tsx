import TextInput from "../../components/TextInput";

// a list of options for a multiple choice question
// Let's just go with index for correct answer, to avoid running into duplicate answers
function AnswerOptions({
  options,
  setOptions,
  questionId,
  correctAnswer,
  setCorrectAnswer,
}: {
  options: string[];
  setOptions: (newOptions: string[]) => void;
  questionId: number;
  correctAnswer: number;
  setCorrectAnswer: (answer: number) => void;
}) {
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
                  setOptions(newOptions);
                }}
                size={20}
              />
              <button
                onClick={() => {
                  setCorrectAnswer(i);
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
                  let newCorrectIndex = correctAnswer;
                  if (i === correctAnswer) {
                    newCorrectIndex = 0; // ensure there's always a correct answer
                  } else if (i < correctAnswer) {
                    newCorrectIndex = correctAnswer - 1;
                  }
                  setCorrectAnswer(newCorrectIndex);
                  setOptions(newOptions);
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
          setOptions([...options, ""]);
        }}
      >
        Add Option
      </button>
      <hr />
    </div>
  );
}

export default AnswerOptions;
