import type { GradedResult } from "../../types/Schema";

function ScoreBoard({
  endQuizData,
  totalQuestions,
}: {
  endQuizData: GradedResult;
  totalQuestions: number;
}) {
  return (
    <div>
      {`You scored: ${endQuizData.score} out of ${totalQuestions}`}
      <br />
      <div>
        <table>
          <tbody>
            {(endQuizData as GradedResult).details.map((question, index) => {
              return (
                <tr key={question.questionId}>
                  <td>{`${index + 1}`}</td>
                  <td>{question.correct ? "✅" : "❌"}</td>
                  <td>
                    {question.expected !== undefined &&
                      ` Expected result: ${question.expected}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreBoard;
