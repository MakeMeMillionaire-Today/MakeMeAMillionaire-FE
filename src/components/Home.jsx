import { useState } from "react";
import { MainCanvas } from "./MainCanvas";
import { rtConnection } from "../service/socket";

const Home = () => {
  const [imageURL, setImageURL] = useState("");
  const [matrix, setMatrix] = useState([[]]);

  rtConnection.on("/canvas", (data) => {
    setMatrix(data);
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRandomMatrixUpdate = () => {
    rtConnection.emit("/canvas/update", {
      x: Math.floor(Math.random() * matrix.length),
      y: Math.floor(Math.random() * matrix.length),
      content: 1,
    });
  };


  return (
    <div className="home-container">
      <div className="section1">
        chat zone
        <div>
          <button onClick={handleRandomMatrixUpdate}>Random Matrix</button>
        </div>
      </div>
      <div className="section2">
        <MainCanvas matrix={matrix} />
      </div>
      <div className="section3">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
};

export default Home;
