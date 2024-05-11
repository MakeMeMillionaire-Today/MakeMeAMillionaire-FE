import { useState } from "react";
import { MainCanvas } from "./MainCanvas";
import { rtConnection } from "../service/socket";
import Chat from "./Chat";
import mmmLogo from "../assets/mmmLogo.png";
import Loader from "./Loader";

const Home = () => {
  const [matrix, setMatrix] = useState([[]]);
  rtConnection.on("/canvas", (data) => {
    setMatrix(data);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center">
            <img
              className="rounded max-w-sm h-20"
              src={mmmLogo}
              alt="Extra large avatar"
            />
          </div>
          <Chat />
        </div>
      </div>
      <div className="md:col-span-2">
        {
          matrix.length > 2  ? 
            <MainCanvas matrix={matrix}/> : 
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
        }
      </div>
    </div>
  );
};

export default Home;
