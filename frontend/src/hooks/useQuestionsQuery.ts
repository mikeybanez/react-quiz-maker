import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";
import type { QuizSchema, QuestionSchema } from "../types/Schema";

function useQuestionsQuery(quizId: number | null) {
  return useQuery({
    queryKey: ["questions", quizId],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/quizzes/${quizId}`, {
        headers: {
          'Authorization': 'Bearer dev-token',
        }
      });
      if (!res.ok) {
        // TODO: better error handling
        throw new Error("Failed to fetch questions");
      }
      return await res.json() as QuizSchema & { questions: QuestionSchema[]};
    },
    enabled: quizId !== null,
  });
}

export default useQuestionsQuery;