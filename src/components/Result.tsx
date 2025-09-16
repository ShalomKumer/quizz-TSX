import { useContext } from "react";
import { myContext } from "./Context";
import { useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result() {
  const ctx = useContext(myContext);
  const navigate = useNavigate();
  if (!ctx) return null;

  const { score, num, setScore, setList, setQuestion } = ctx;
  const pct = num > 0 ? Math.round((score / num) * 100) : 0;
  const win = pct >= 70; // סף ניצחון

  const playAgain = () => {
    // אפס בסיסי — אתה יכול להשאיר או לאפס גם list/שאלה לפי הזרימה שלך
    setScore(0);
    setList([]);
    setQuestion(null);
    navigate("/");
  };

  return (
    <div className="result-wrap">
      <h1 className={`result-title ${win ? "win" : "lose"}`}>
        {win ? "You Win! 🎉" : "You Lose 😅"}
      </h1>
      <p className="result-stats">
        Score: <strong>{score}</strong> / {num} ({pct}%)
      </p>
      <div className="result-actions">
        <button className="primary" onClick={playAgain}>Play Again</button>
        <button className="secondary" onClick={() => navigate("/quiz")}>Back to Quiz</button>
        <button className="secondary" onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}
