import type { PageState } from "../../types/Pages";

function Home({ setPage }: { setPage: (page: PageState) => void }) {
  return (
    <>
      <div>
        <h1>Quiz Maker</h1>
      </div>
      <div>
        <button onClick={() => setPage("createQuiz")}>Quiz Builder</button>
        <button onClick={() => setPage("takeQuiz")}>Quiz Player</button>
      </div>
    </>
  );
}

export default Home;
