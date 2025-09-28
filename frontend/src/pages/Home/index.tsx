import type { PageState } from "../../types/Pages";

function Home({ setPage }: { setPage: (page: PageState) => void }) {
  return (
    <>
      <div>
        <h1>Quiz Maker</h1>
      </div>
      <div>
        <button onClick={() => setPage("createQuiz")}>Create a quiz</button>
        <button onClick={() => setPage("takeQuiz")}>Take a quiz</button>
      </div>
    </>
  );
}

export default Home;
