import { useEffect, useState } from "react";
import { rtConnection } from "../service/socket";
import imgCoin from "../assets/coin.png";

const Coin = ({ userName }) => {
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    if (!userName) {
      console.error("No username provided");
      return;
    }

    const handleAuthCoin = (data) => {
      if (data && typeof data.coin === "number") {
        setCoin(data.coin);
      } else {
        console.error("Invalid coin data received:", data);
      }
    };

    const handleAuthCoinUpdate = (data) => {
      if (data && data.username === userName && typeof data.coin === "number") {
        setCoin(data.coin);
      } else {
        console.error("Invalid coin update data received:", data);
      }
    };

    rtConnection.emit("auth_coin", { username: userName });
    rtConnection.on("auth_coin", handleAuthCoin);
    rtConnection.on("auth_coin_update", handleAuthCoinUpdate);

    return () => {
      rtConnection.off("auth_coin", handleAuthCoin);
      rtConnection.off("auth_coin_update", handleAuthCoinUpdate);
    };
  }, [userName]);

  return (
    <>
      <img
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-4"
        src={imgCoin}
        alt={"coinLogo"}
      />
      <p className="flex justify-center items-center text-black">{coin}</p>
    </>
  );
};

export default Coin;
