import { useContext } from "react";
import { myContext } from "./Context";
import type { question } from "./Typs";

type listProp = {
  q: question;
  hendlLiClick: (ans: string) => void;
  selected: string | null;
};

const Ul: React.FC<listProp> = ({ hendlLiClick, selected }) => {
  const ctx = useContext(myContext);
  if (!ctx) return null;
  const { question, answers, setAnswers} = ctx;
  console.log(`q`,question)
  console.log(`q.A`,question?.chosen_answers)
  console.log(`selcted`,selected)
  return (
    <>
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
                disabled={picked}
              >
                {ans}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Ul;