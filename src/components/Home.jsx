import { useState } from "react";
import { MainCanvas } from "./MainCanvas";
import { rtConnection } from "../service/socket";
import Chat from "./Chat";
import mmmLogo from "../assets/mmmLogo.png";
import Loader from "./Loader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

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

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              Chat :
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Chat messages are not saved, be careful when leaving the site.
                </p>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              Imagen :
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  When uploading an image, consider the size! A size larger than 50KB is not allowed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        {matrix.length > 2 ? (
          <MainCanvas matrix={matrix} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
