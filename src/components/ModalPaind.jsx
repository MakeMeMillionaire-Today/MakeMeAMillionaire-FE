import { useEffect, useRef, useState } from "react";
import { rtConnection } from "../service/socket";
import { useAuth0 } from "@auth0/auth0-react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import Loader from "./Loader";

const ModalPaint = ({ showModal, col, row, dataItem }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [paintImg, setPaintImg] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [loader, setLoader] = useState(false)
  console.log('loader ->', loader)

// MERCADO PAGO:
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
  locale: 'es-AR',
});

const createPreference = async () => {
  setLoader(true)
  try {
      const response = await fetch("http://localhost:3000/create_preference", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              title: 'MMM Paint',
              quantity: 1,
              price: 100,
          })
      });
      const data = await response.json();
      const { id } = data;
      setLoader(false)
      return id;
  } catch (e) {
      console.log(e);
  }
  
};

const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
        setPreferenceId(id)
    }
};

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result?.split(",")[1];
      setImageURL(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleCloseModal = () => {
    showModal(false);
  };

  // Conditional rendering of content (image or canvas)
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

  // handle data to backend:
  useEffect(() => {
    const sendImageData = () => {
      if (imageURL) {
        rtConnection.emit("/canvas/update", {
          y: row,
          x: col,
          userName: user.name,
          email: user.email,
        });
        alert("the image has been saved!");
        handleCloseModal();
      } else {
        if (paintImg !== "") {
          rtConnection.emit("/canvas/update", {
            y: row,
            x: col,
            image: paintImg,
            userName: user.name,
            email: user.email,
          });
          alert("the canvas has been saved!");
          handleCloseModal();
        }
      }
    };
    sendImageData();
  }, [paintImg, row, col, imageURL]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center item-center gap-5">
        <div className="flex justify-center items-center">{content}</div>
        <div className="w-full max-w-md mx-auto">
          <div className="px-7 bg-white shadow-lg rounded-2xl">
            {dataItem?.image ? (
              <>
                <div
                  className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  <span className="font-medium">Sorry!</span> art existing...{" "}
                  <span className="font-medium">Created for:</span> {dataItem.userName}
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
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
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
              </div>
            )}
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPaint;
