import { useContext, useState } from "react"
import { myContext } from "./Context"
import type { question } from "./Typs";
import { toast } from "react-toastify";
import './Body.css'


const Body = () => { 
  const [activ, setActiv] = useState<Boolean> (true)
  const [count, setCount] = useState<number>(1)
  const [locked, setLocked] = useState<boolean>(false)
  const context = useContext(myContext)
  if (!context) return null;

  const {
    list,
    question, 
    setQuestion,
    fetchData,
    difficulty,
    num,
    category
  } = context;

  const hendlLiClick = (ans: string) => {
    if (!question || locked) return;
    if(ans === question?.correct_answer){
      toast.success(`nice :)`)
      setLocked(true);
    }
    else{
      toast.error(`Sorry :( `)
    }
    console.log(ans)
  }
  const NextBtb = () => {
    if (!question) return;

    const currentIndex = list.findIndex(
      (q: question) => q.question === question.question);

    const nextIndex = currentIndex + 1;
    if (nextIndex < list.length) {
      setQuestion(list[nextIndex]);
      toast.info(`Next Question.`)
      setCount((c)=> c + 1)
      setLocked(false);
    } 
    else {
      setQuestion(null);
      toast.info(`Game Ended.`)
      setActiv(false)
      setLocked(false);
    }
  }
  const NewGame = async () => {
    setActiv(true);
    setCount(1);
    setLocked(false);
    await fetchData();
    // toast.success("New game loaded!");
  }
  return (
    <> <div className="quiz-container">
      <header className="quiz-header">
        <h1 className="quiz-title">Trivia Quiz</h1>
        <p className="quiz-subtitle">
          Level: <strong className="pill">{difficulty}</strong> ·{" "}
          Questions: <strong className="pill">{count}/{num}</strong> ·{" "}
          Category: <strong className="pill">{category}</strong>
        </p>
      </header>

      <main className="quiz-body">
        <div className="question-text">
          <strong>{question?.question ?? "No question loaded"}</strong>
        </div>

        <ul className="answers">
          {question?.all_answers?.map((ans: string, index: number) => {
            const isCorrect = question && ans === question.correct_answer;
            return (
              <li key={index}>
                <button
                  type="button"
                  className={`answer-btn ${locked ? (isCorrect ? "correct" : "disabled") : ""}`}
                  onClick={() => hendlLiClick(ans)}
                  disabled={locked}
                >
                  {ans}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="actions">
          {activ ? (
            <button className="primary" onClick={NextBtb}>
              Next
            </button>
          ) : (
            <button className="primary" onClick={NewGame}>
              New Game
            </button>
          )}
        </div>
      </main>
    </div>
    </>
  )
}

export default Body