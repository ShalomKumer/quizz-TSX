import React from "react";
import type { question } from "./Typs";

type ListProps = {
  q: question | null;
  hendlLiClick: (ans: string) => void;
  selected: string | null;
};

const Ul: React.FC<ListProps> = ({ q, hendlLiClick }) => {
  if (!q) return null;

  return (
    <ul className="answers">
      {q.all_answers.map((ans, index) => {
        const chosen = q.chosen_answers ?? [];
        const isCorrect = ans === q.correct_answer;
        const wasPickedWrong = chosen.includes(ans) && !isCorrect;
        const showCorrect = (q.currect ?? false) && isCorrect;

        const pickedClass = showCorrect
          ? "picked-correct"
          : wasPickedWrong
          ? "picked-wrong"
          : "";
        const disabled = q.currect === true;

        return (
          <li key={index}>
            <button
              type="button"
              className={`answer-btn ${pickedClass}`}
              onClick={() => hendlLiClick(ans)}
              disabled={disabled}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Ul;
