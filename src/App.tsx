import Context from "./components/Context";
import Inputs from "./components/Inputs";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Context>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Inputs />} />
            <Route path="/body" element={<Body/>} />
          </Routes>
        </BrowserRouter>
      </Context>
    </>
  );
}

export default App;
