import { useAuth0 } from "@auth0/auth0-react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";

export default function BankCoin() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [preferenceId, setPreferenceId] = useState(null);
  const [amount, setAmount] = useState("");

  // MERCADO PAGO:
  initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await fetch(
        "https://makemeamillionaire-be.onrender.com/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Amount Coin",
            quantity: 1,
            price: amount,
          }),
        }
      );
      const data = await response.json();
      const { id } = data;
      return id;
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuy = async () => {
    localStorage.setItem('amount', amount);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="absolute bg-gray-900 py-16 sm:py-24 lg:py-32 h-full w-full">
      <div className="h-full mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bank Coin
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Enter amount: 
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="amount-address" className="sr-only">
                Amoun Pay
              </label>
              <input
                id="amount-address"
                name="amount"
                type="number"
                autoComplete="amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your amount"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={isAuthenticated ? handleBuy : loginWithRedirect}
              >
                Pay
              </button>
            </div>
            <div>
              {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">Recharge</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                If you ran out of coin, it's time to recharge by adding the amount you like.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">Conversion</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Remember that the coin conversion is every M$1 to USD$1.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
