import { useMutation } from "@tanstack/react-query";
import type { QuizSchema } from "../types/Schema";
import { BACKEND_URL } from "../constants/Url";

function useUpdateQuizMetadataMutation() {
  return useMutation({
    mutationFn: (quiz: Omit<QuizSchema, "createdAt" | "isPublished">) => {
      return fetch(`${BACKEND_URL}/quizzes/${quiz.id}`, {
        method: "PATCH",
        body: JSON.stringify(quiz),
        headers: {
          'Authorization': 'Bearer dev-token',
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error updating the quiz: ${res.statusText}`);
        }
        return res.json();
      });
    }
  });
}

export default useUpdateQuizMetadataMutation;