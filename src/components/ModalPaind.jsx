import { useEffect, useRef, useState } from "react";
import { rtConnection } from "../service/socket";

const ModalPaint = ({ showModal, col, row }) => {
  const [paintImg, setPaintImg] = useState("");

  const canvasRef = useRef(null);
  let isDrawing = false;

  const draw = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    if (isDrawing) {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, 2, 2);
    }
  };

  const cleanCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (event) => {
    isDrawing = true;
    draw(event);
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setPaintImg(image);
  };

  const handleCloseModal = () => {
    showModal(false);
  };

  // handle data to backend:
  useEffect(() => {
    const sendImageData = () => {
      if (paintImg !== "") {
        rtConnection.emit("/canvas/update", {
          y: row,
          x: col,
          image: paintImg,
        });
        alert("the canvas has been saved!");
        handleCloseModal();
      }
    };
    sendImageData();
  }, [paintImg, row, col]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center item-center gap-5">
        <div className="flex justify-center items-center">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            style={{ border: "1px solid black", cursor: "crosshair" }}
          />
        </div>
        <ul className="flex">
          <li className="flex-1 mr-2">
            <button
              className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={exportImage}
            >
              save
            </button>
          </li>
          <li className="flex-1 mr-2">
            <button
              className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={cleanCanvas}
            >
              clear
            </button>
          </li>
          <li className="text-center flex-1">
            <button
              className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleCloseModal}
            >
              close
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalPaint;
