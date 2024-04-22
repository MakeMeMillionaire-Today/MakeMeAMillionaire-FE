const Chat = () => {
  return (
    <div className="flex flex-col items-center justify-center w-100 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div
        class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span class="font-medium">Hello!</span> chat in progress...
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Get ready for the next chat! Let's connect differently.
      </p>
    </div>
  );
};
export default Chat;
