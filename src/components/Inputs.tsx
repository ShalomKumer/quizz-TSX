import type React from "react"; 
import { useContext } from "react"
import { myContext } from "./Context"
import { useNavigate } from "react-router-dom";
import './InputsStles.css'

const Inputs = () => {
  const context = useContext(myContext)
  const navigate = useNavigate();
  if(!context) return null;
  
  const {
    num, setNum,
    difficulty, setDifficulty,
    category, setCategory, 
    fetchData
  } = context

  const hendelNum = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const value = Number(e.target.value)
    setNum(Number.isNaN(value) ? 0 : value)
  }
    const hendelDifficulty = (e: React.ChangeEvent<HTMLSelectElement>)=> {
      setDifficulty(e.target.value as "easy" | "medium" | "hard")

  }
    const hendelCategory = (e: React.ChangeEvent<HTMLSelectElement>)=> {
      setCategory(e.target.value)
  }
  const hendelSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchData();
    navigate("/quiz");
  }
  return (
    <><form className="form" onSubmit={hendelSubmit}>
  <div className="row">
    <label htmlFor="difficulty">Choose a difficulty level:</label>
    <select id="difficulty" value={difficulty} onChange={hendelDifficulty}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </div>

  <div className="row">
    <label htmlFor="category">Choose a Category</label>
    <select id="category" onChange={hendelCategory} value={category}>
      {/* <option value="">Any Category</option> */}
      <option value="27">Animals</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="22">Geography</option>
      <option value="9">General Knowledge</option>
      <option value="23">History</option>
      <option value="21">Sports</option>
    </select>
  </div>

  <div className="row">
    <label htmlFor="amount">Number of Questions:</label>
    <input
      id="amount"
      type="number"
      min={1}
      max={50}
      placeholder="10"
      onChange={hendelNum}
      value={num}
    />
  </div>

  <button type="submit">Start Quiz</button>
</form>

    </>
  )
}

export default Inputs