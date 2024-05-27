import { useEffect, useState } from "react";
import succesfullyImg from "../assets/successfullyIcon.png";
import { rtConnection } from "../service/socket";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const { user, isLoading } = useAuth0();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    const storedAmount = localStorage.getItem('amount');
    if (!isLoading && user && status === "approved" && storedAmount) {
      const updateAndCheckCoin = () => {
        rtConnection.emit("auth_coin", { username: user.name });
        rtConnection.on("auth_coin", (data) => {
          const newCoinValue = data.coin + storedAmount;
          rtConnection.emit("auth_coin_update", {
            username: user.name,
            amount: newCoinValue,
          });
          rtConnection.on("auth_coin_update", (updatedData) => {
            setCoin(updatedData.coin);
          });
        });
      };

      updateAndCheckCoin();
    } else if (!isLoading && user) {
      console.log("error from pay!");
    }
  }, [isLoading, user, status]);

  return (
    <div className="md:px-44 px-4 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="w-full">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-4 text-gray-800 font-bold text-2xl">
                Your Payment has been made successfully!
              </h1>
              <p className="my-4 text-gray-800">
                Now your 'coin' is: {coin}
              </p>
              <p className="my-4 text-gray-800">
                Return to the dashboard to view your art.
              </p>
              <a
                className="sm:w-full lg:w-auto my4 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                href="/"
              >
                Go back!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={succesfullyImg} />
      </div>
    </div>
  );
};

export default SuccessPage;