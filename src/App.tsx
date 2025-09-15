import Context from './components/Context'
import Inputs from './components/Inputs'
import { ToastContainer } from 'react-toastify';
import { }

import './App.css'

function App() {


  return (
    <>
    <Context>
      <ToastContainer /> 
      <h1>WellCome To The Quizz <strong>2025!</strong></h1>
      <Inputs /> 
    </Context>
    </>
  )
}

export default App
