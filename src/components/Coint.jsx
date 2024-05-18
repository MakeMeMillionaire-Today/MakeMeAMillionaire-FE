import { useEffect, useState } from "react";
import { rtConnection } from "../service/socket";

const Coin = (userName) => {
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    if (!userName) {
      console.error("No username provided");
      return;
    }
    rtConnection.emit("auth_coin", { username: userName });
    const handleAuthCoin = (data) => {
      if (data && typeof data.coin === "number") {
        setCoin(data.coin);
      } else {
        console.error("Invalid coin data received:", data);
      }
    };
    rtConnection.on("auth_coin", handleAuthCoin);
    return () => {
      rtConnection.off("auth_coin", handleAuthCoin);
    };
  }, [userName]);

  return (
    <>
      <div className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 aspect-square w-8 flex justify-center items-center text-yellow-700">
        $
      </div>
      <p className="flex justify-center items-center text-black">{coin}</p>
    </>
  );
};

export default Coin;
