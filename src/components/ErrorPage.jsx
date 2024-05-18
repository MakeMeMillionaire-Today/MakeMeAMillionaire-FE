function ErrorPage() {
  return (
    <div className="lg:px-24 lg:py-24  items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="w-full">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-4 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-4 text-gray-800">
                Sorry about that! It seems that this section is in progress.
              </p>
              <a
                className="sm:w-full lg:w-auto my-4 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                href="/"
              >
                Go back!
              </a>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}
export default ErrorPage;
