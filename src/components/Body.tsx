import { useEffect, useContext, useState } from "react";
import { myContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { question } from "./Typs";
import Ul from "./Ul";
import "./Body.css";

const Body = () => {
  const [activ, setActiv] = useState<boolean>(true); // פעיל או לא
  const [count, setCount] = useState<number>(1); // כמה שאלות כמה עשית
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const ctx = useContext(myContext);
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
  } = ctx;
  useEffect(() => {
    if (list.length < 1) {
      navigate("/");
      return;
    }
  }, []);
  const hendlLiClick = (ans: string) => {
    if (!question) return ;
    let A_answer:question = list.find((q: question) => q.all_answers.find((a) => a === ans));
    if(!A_answer)return;
    setSelected(() => ans);
    // setAnswers(A_answer?.chosen_answers ?? []);
    setAnswers((prev: question[] | []) => [...prev, ans]);


    if (ans === A_answer.correct_answer) {
      const currentIndex = list.findIndex(
        (q: question) => q.question === question.question
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < list.length) {
        let moveQ = setInterval(() => {
          setQuestion(list[nextIndex]);
          setCount((c) => c + 1);
          toast.info(`Next Question.`);
          setScore((s: any) => s + 1);
          toast.success("Nice :)");
        }, 1000);
        clearTimeout(moveQ);
      }
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
    <>
      <div className="quiz-container">
        <header className="quiz-header">
          <h1 className="quiz-title">Trivia Quiz</h1>
          <p className="quiz-subtitle">
            Level: <strong className="pill">{difficulty}</strong> · Questions:{" "}
            <strong className="pill">
              {count}/{num}
            </strong>{" "}
            · Category: <strong className="pill">{category}</strong>{" "}
            {/*  need to change the category name  */}
          </p>
        </header>
        <main className="quiz-body">
          <div className="question-text">
            <strong>{question?.question}</strong>
          </div>
          <div className="ulList">
            <Ul q={question} hendlLiClick={hendlLiClick} selected={selected} />
          </div>
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
    </>
  );
};
export default Body;
