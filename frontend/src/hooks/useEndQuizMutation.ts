import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";

function useEndQuizMutation() {
  return useMutation({
    mutationFn: (attemptId: number) => {
      return fetch(`${BACKEND_URL}/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer dev-token',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error submitting entire attempt: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
};

export default useEndQuizMutation;