import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";

function useRemoveQuestionMutation() {
  return useMutation({
    mutationFn: (questionId: number) => {
      return fetch(`${BACKEND_URL}/questions/${questionId}`, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer dev-token',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error removing the question: ${res.statusText}`);
        }
        return { id: questionId }; // this specific endpoint is HTTP 204 no content
      });
    }
  })
}

export default useRemoveQuestionMutation;