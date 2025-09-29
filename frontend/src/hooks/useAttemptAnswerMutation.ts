import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";

function useAttemptAnswerMutation() {
  return useMutation({
    mutationFn: ({attemptId, questionId, answer}: {attemptId: number, questionId: number, answer: string}) => {
      return fetch(`${BACKEND_URL}/attempts/${attemptId}/answer`, {
        method: "POST",
        body: JSON.stringify({ questionId, value: answer }),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error sending answer attempt: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
};

export default useAttemptAnswerMutation;