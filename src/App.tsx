import Context from "./components/Context";
import Inputs from "./components/Inputs";
import Body from "./components/Body";
import Result from "./components/Result";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Context>
        <BrowserRouter>
          <ToastContainer autoClose={2500}/>
          <Routes>
            <Route path="/" element={<Inputs />} />
            <Route path="/body" element={<Body/>} />
            <Route path="/result" element={<Result/>} />
          </Routes>
        </BrowserRouter>
      </Context>
    </>
  );
}

export default App;
