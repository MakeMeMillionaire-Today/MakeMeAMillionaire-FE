import { useEffect, useRef, useState } from "react";
import { rtConnection } from "../service/socket";

const ModalPaint = ({ showModal, col, row }) => {
  const [paintImg, setPaintImg] = useState("");

  const canvasRef = useRef(null);
  let isDrawing = false;

  const dibujar = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    if (isDrawing) {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, 1, 1);
    }
  };

  const comenzarDibujo = (event) => {
    isDrawing = true;
    dibujar(event);
  };

  const detenerDibujo = () => {
    isDrawing = false;
  };

  const exportarImagen = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setPaintImg(image);
    handleCloseModal();
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
      }
    };
    sendImageData();
  }, [paintImg, row, col]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center item-center gap-5">
        <div>
          <canvas
            ref={canvasRef}
            width={100}
            height={100}
            onMouseDown={comenzarDibujo}
            onMouseMove={dibujar}
            onMouseUp={detenerDibujo}
            style={{ border: "1px solid black", cursor: "crosshair" }}
          />
        </div>
        <ul class="flex">
          <li class="flex-1 mr-2">
            <button
              class="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={exportarImagen}
            >
              save
            </button>
          </li>
          <li class="flex-1 mr-2">
            <button
              class="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              // onClick={clear}
            >
              clear
            </button>
          </li>
          <li class="text-center flex-1">
            <button
              class="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
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