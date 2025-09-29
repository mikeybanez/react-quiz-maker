import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";

function useAttemptMutation() {
  return useMutation({
    mutationFn: (quizId: number) => {
      return fetch(`${BACKEND_URL}/attempts`, {
        method: "POST",
        body: JSON.stringify({ quizId: quizId }),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error creating attempt: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
};

export default useAttemptMutation;