import { useEffect, useRef, useState } from "react";
import { rtConnection } from "../service/socket";
import { useAuth0 } from "@auth0/auth0-react";

const ModalPaint = ({ showModal, col, row, dataItem }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [paintImg, setPaintImg] = useState("");
  const [coin, setCoin] = useState(0);

  const updateAndCheckCoin = () => {
    rtConnection.emit("auth_coin", { username: user.name });

    rtConnection.on("auth_coin", (data) => {
      const newCoinValue = data.coin - 100;
      rtConnection.emit("auth_coin_update", {
        username: user.name,
        amount: newCoinValue,
      });
      rtConnection.on("auth_coin_update", (updatedData) => {
        setCoin(updatedData.coin);
      });
    });
  };

  const handleBuy = () => {
    updateAndCheckCoin();
    exportImage();
  };

  // ************ TOOL DRAWER *************
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

  // ************ EXPORT FILE *************
  const exportImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setPaintImg(image);
  };

  const handleImageUpload = (event) => {
    // Descuento de coin:
    updateAndCheckCoin();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setPaintImg(`data:image/png;base64,${base64String}`);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    showModal(false);
  };

  // ************ CONDITIONAL RENDERING EXISTENT(image or canvas) *************
  const content = dataItem?.image ? (
    <img src={dataItem.image} alt="Previous Image" />
  ) : (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      style={{ border: "1px solid black", cursor: "crosshair" }}
    />
  );

  // ************ HANDLE DATA TO BACKEND *************
  useEffect(() => {
    const sendImageData = () => {
      if (paintImg !== "") {
        rtConnection.emit("/canvas/update", {
          y: row,
          x: col,
          image: paintImg,
          userName: user.name,
          email: user.email,
        });
        alert("the paint has been saved!");
        handleCloseModal();
      }
    };
    sendImageData();
  }, [paintImg, row, col]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center item-center gap-5">
        <div className="flex justify-center items-center max-w-40 ml-24">{content}</div>
        <div className="w-full max-w-md mx-auto">
          <div className="px-7 bg-white shadow-lg rounded-2xl">
            {dataItem?.image ? (
              <>
                <div
                  className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  <span className="font-medium">Sorry!</span> art existing...{" "}
                  <span className="font-medium">Created for:</span>{" "}
                  {dataItem.userName}
                </div>
                <div className="flex-1 group">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                  >
                    <span className="block px-1 pt-1 pb-1">
                      <i className="far fa-times-circle text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-2">Close</span>
                      <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex">
                <div className="flex-1 group">
                  <button
                    onClick={cleanCanvas}
                    className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                  >
                    <span className="block px-1 pt-1 pb-1">
                      <i className="far fa-magic text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-2">Clear</span>
                      <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                    </span>
                  </button>
                </div>
                <div className="flex-1 group">
                  <div className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
                    <label className="block px-1 pt-1 pb-1">
                      <i className="far fa-cloud-upload text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-2">Upload</span>
                      <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        onChange={isAuthenticated ? handleImageUpload : loginWithRedirect}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex-1 group">
                  <button
                    onClick={isAuthenticated ? handleBuy : loginWithRedirect}
                    className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                  >
                    <span className="block px-1 pt-1 pb-1">
                      <i className="far fa-share-square text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-2">Save</span>
                      <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                    </span>
                  </button>
                </div>
                <div className="flex-1 group">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                  >
                    <span className="block px-1 pt-1 pb-1">
                      <i className="far fa-times-circle text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-2">Close</span>
                      <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPaint;
