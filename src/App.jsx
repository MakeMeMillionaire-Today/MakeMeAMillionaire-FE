import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./service/socket";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [imageURL, setImageURL] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home imageURL={imageURL} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <div>
        <Navbar imageURL={setImageURL} />
      </div>
    </>
  );
}

export default App;
