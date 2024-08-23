import React, { useState, useEffect } from "react";

const TwitchPastStreams = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    // Check if the access token is in the URL fragment
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      fetchPastStreams(token);
    } else {
      // Redirect to Twitch OAuth authorization if no token is present
      redirectToTwitchAuth();
    }
  }, []);

  const redirectToTwitchAuth = () => {
    const clientId = process.env.twitch; // Assuming you're using a .env file with this variable
    const redirectUri = "https://imchronokross.onrender.com"; // Your website URL
    const scopes = "user:read:email";

    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
  };

  const fetchPastStreams = async (token) => {
    const response = await fetch(
      `https://api.twitch.tv/helix/videos?user_id=YOUR_TWITCH_USER_ID&type=archive`,
      {
        headers: {
          "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID, // Using the environment variable
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setStreams(data.data);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Past Streams</h2>
      {!accessToken && <p>Redirecting to Twitch for authorization...</p>}
      {streams.length > 0 ? (
        <ul>
          {streams.map((stream) => (
            <li key={stream.id} className="mb-4">
              <a
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {stream.title}
              </a>
              <p>{new Date(stream.created_at).toLocaleDateString()}</p>
              <p>{stream.view_count} views</p>
            </li>
          ))}
        </ul>
      ) : (
        accessToken && <p>Loading past streams...</p>
      )}
    </div>
  );
};

export default TwitchPastStreams;
