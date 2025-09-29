import { useMutation } from "@tanstack/react-query";
import type { NewQuestionSchema } from "../types/Schema";
import { BACKEND_URL } from "../constants/Url";

function useCreateQuizzesMutation() {
  return useMutation({
    mutationFn: ({ quizId, question} : { quizId: number, question: NewQuestionSchema}) => {
      return fetch(`${BACKEND_URL}/quizzes/${quizId}/questions`, {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error creating the question: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
}

export default useCreateQuizzesMutation;