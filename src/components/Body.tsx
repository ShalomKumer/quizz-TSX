import { useContext, useState } from "react";
import { myContext } from "./Context";
import type { question } from "./Typs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Body.css";

const Body = () => {
  const [activ, setActiv] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  // const [locked, setLocked] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const context = useContext(myContext);
  const navigate = useNavigate();
  if (!context) return null;

  const {
    list,
    question,
    setQuestion,
    difficulty,
    num,
    category,
    score,
    setScore,
    answers,
    setAnswers,
  } = context;

  const hendlLiClick = (ans: string) => {
    if (!question) return;

    setSelected(ans);
    setAnswers((prev) => [...prev,ans])
    console.log(`question: `,question)
    console.log(`ansList: `,answers)

    if (ans === question.correct_answer) {
      let currerct = list.find((q) => q.correct_answer === ans);
      const currentIndex = list.findIndex(
        (q: question) => q.question === question.question
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < list.length) {
        setQuestion(list[nextIndex]);
        toast.info(`Next Question.`);
        setCount((c) => c + 1);
      }
      setScore((s) => s + 1);
      toast.success("Nice :)");
    } else {
      toast.error("Sorry :(");
    }
  };
  const NextBtb = () => {
    if (!question) return;
    const currentIndex = list.findIndex(
      (q: question) => q.question === question.question
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < list.length) {
      setQuestion(list[nextIndex]);
      toast.info(`Next Question.`);
      setCount((c) => c + 1);
      setSelected(null);
    } else {

      setQuestion(null);
      setActiv(false);
      setSelected(null);
      toast.info(`Game Ended.`);
      navigate("/result");
    }
  };
  const BackBtb = () => {
    if (!question) return;
    
    const currentIndex = list.findIndex(
      (q: question) => q.question === question.question
    );
    const backIndex = currentIndex - 1;
    if (backIndex >= 0) {
      setQuestion(list[backIndex]);
      toast.info(`Back Question.`);
      setCount((c) => c - 1);
      
      setSelected(null);
    } else {
      toast.error(`Can't go back.`);
    }
  };
  const NewGame = async () => {
    setActiv(true);
    setCount(1);
    setSelected(null);
    navigate("/");
  };
  const HomeBtn = () => {
    setActiv(true);
    setCount(1);
    setSelected(null);
    navigate("/");
  };
  const ResetBtn = () => {
    setQuestion(list[0]);
    setActiv(true);
    setCount(1);
    setSelected(null);
  };
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1 className="quiz-title">Trivia Quiz</h1>
        <p className="quiz-subtitle">
          Level: <strong className="pill">{difficulty}</strong> · Questions:{" "}
          <strong className="pill">
            {count}/{num}
          </strong>{" "}
          · Category: <strong className="pill">{category}</strong>
        </p>
      </header>

      <main className="quiz-body">
        <div className="question-text">
          <strong>{question?.question ?? "No question loaded"}</strong>
        </div>

        <ul className="answers">
          {question?.all_answers?.map((ans: string, index: number) => {
            const picked = selected === ans;
            const pickedClass =
              picked && question
                ? ans === question.correct_answer
                  ? "picked-correct"
                  : "picked-wrong"
                : "";
            return (
              <li key={index}>
                <button
                  type="button"
                  className={`answer-btn ${pickedClass}`}
                  onClick={() => hendlLiClick(ans)}
                >
                  {ans}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="actions">
          {activ ? (
            <>
              <button className="secondary" onClick={HomeBtn}>
                Home
              </button>
              <button className="secondary" onClick={BackBtb}>
                Back
              </button>
              <button className="secondary" onClick={ResetBtn}>
                Reset Game
              </button>
              <button className="primary" onClick={NextBtb}>
                Next
              </button>
            </>
          ) : (
            <button className="primary" onClick={() => navigate("/")}>
              New Game
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
export default Body;

// return (
//   <>
//     <div className="quiz-container">
//       <header className="quiz-header">
//         <h1 className="quiz-title">Trivia Quiz</h1>
//         <p className="quiz-subtitle">
//           Level: <strong className="pill">{difficulty}</strong> · Questions:{" "}
//           <strong className="pill">
//             {count}/{num}
//           </strong>{" "}
//           · Category: <strong className="pill">{category}</strong>
//         </p>
//       </header>

//       <main className="quiz-body">
//         <div className="question-text">
//           <strong>{question?.question ?? "No question loaded"}</strong>
//         </div>

//         <ul className="answers">
//           {question?.all_answers?.map((ans: string, index: number) => {
//             const isCorrect = question && ans === question.correct_answer;
//             return (
//               <li key={index}>
//                 <button
//                   type="button"
//                   className={`answer-btn ${
//                     locked ? (isCorrect ? "correct" : "disabled") : ""
//                   }`}
//                   onClick={() => hendlLiClick(ans)}
//                   disabled={locked}
//                 >
//                   {ans}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>

//         <div className="actions">
//           {activ ? (
//             <>
//               <button className="primary" onClick={HomeBtn}>
//                 Home
//               </button>
//               <button className="primary" onClick={BackBtb}>
//                 Back
//               </button>
//               <button className="primary" onClick={ResetBtn}>
//                 Reset Game
//               </button>
//               <button className="primary" onClick={NextBtb}>
//                 Next
//               </button>
//             </>
//           ) : (
//             <button className="primary" onClick={NewGame}>
//               New Game
//             </button>
//           )}
//         </div>
//       </main>
//     </div>
//   </>
// );
