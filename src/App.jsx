import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./service/socket";

function App() {
  const [imageURL, setImageURL] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home imageURL={imageURL} />} />
      </Routes>
      <div>
        <Navbar imageURL={setImageURL} />
      </div>
    </>
  );
}

export default App;
