const TwitchCTA = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white mt-80 rounded-lg shadow-lg max-w-md mx-auto">
      <img
        src="https://d3h0048cs86i3g.cloudfront.net/Screenshot%202024-08-23%20004129.png"
        alt="Twitch Channel Preview"
        className="rounded-lg shadow-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">Join My Twitch Stream!</h2>
      <p className="text-lg mb-4">Catch all the action live at</p>
      <a
        href="https://twitch.tv/imchronokross"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      >
        Watch Now
      </a>
    </div>
  );
};

export default TwitchCTA;
