import coinLogo from '../assets/coinLogo.png'

const Loader = () => {
  return (
    <div
      className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce aspect-square w-16 flex justify-center items-center text-yellow-700"
    >
      <img src={coinLogo} alt='coinLogo' />
    </div>
  );
};

export default Loader;
