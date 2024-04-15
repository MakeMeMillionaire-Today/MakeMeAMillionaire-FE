const Chat = () => {
  return (
    <a
      href="#"
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {/* <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Chat in process
      </h5> */}
      <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <span class="font-medium">Hello!</span> chat in progress...
</div>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Get ready for the next chat! Let's connect differently.
      </p>
    </a>
  );
};
export default Chat;