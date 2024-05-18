import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./service/socket";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SuccessPage from "./components/SuccessPage";
import ErrorPage from "./components/ErrorPage";
import BankCoin from "./components/BankCoin";
// import Login from "./components/Login";
// import Register from "./components/Register";

function App() {
  const [imageURL, setImageURL] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home imageURL={imageURL} />} />
        <Route path="/bank" element={<BankCoin />} />
        <Route path="/bank/success" element={<SuccessPage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <div>
        <Navbar imageURL={setImageURL} />
      </div>
    </>
  );
}

export default App;
