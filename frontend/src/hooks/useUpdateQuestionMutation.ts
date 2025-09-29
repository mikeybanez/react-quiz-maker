import { useMutation } from "@tanstack/react-query";
import type { QuestionSchema } from "../types/Schema";
import { BACKEND_URL } from "../constants/Url";

function useUpdateQuestionMutation() {
  return useMutation({
    mutationFn: (question: QuestionSchema) => {
      return fetch(`${BACKEND_URL}/questions/${question.id}`, {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error updating the question: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
}

export default useUpdateQuestionMutation;