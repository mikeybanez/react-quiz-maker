import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants/Url";

function useQuizzesQuery() {
  return useQuery({
    queryKey: ["quizList"],
    queryFn: () =>
      fetch(`${BACKEND_URL}/quizzes`, {
        headers: {
          Authorization: "Bearer dev-token",
        },
        // TODO: better error handling
      }).then((res) => res.json()),
  });
}

export default useQuizzesQuery;