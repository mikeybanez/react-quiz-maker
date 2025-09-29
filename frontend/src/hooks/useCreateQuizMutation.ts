import { useMutation } from "@tanstack/react-query";
import type { NewQuizSchema } from "../types/Schema";
import { BACKEND_URL } from "../constants/Url";

function useCreateQuizzesMutation() {
  return useMutation({
    mutationFn: (newQuiz : NewQuizSchema) => {
      return fetch(`${BACKEND_URL}/quizzes`, {
        method: "POST",
        body: JSON.stringify(newQuiz),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error creating the quiz: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
}

export default useCreateQuizzesMutation;