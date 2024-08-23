import { useState, useEffect } from "react";

const TwitchPastStreams = () => {
  const [accessToken, setAccessToken] = useState(null);
    const [streams, setStreams] = useState([]);
    const clientId = ""ljum8l41466mhloezvbxhcqzn3er2o"";

  useEffect(() => {
    const token = extractAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
      fetchPastStreams(token);
    } else {
      redirectToTwitchAuth();
    }
  }, []);

  const extractAccessTokenFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    return params.get("access_token");
  };

  const redirectToTwitchAuth = () => {
    
    console.log("Hardcoded Twitch Client ID:", clientId);
    const redirectUri = "https://imchronokross.onrender.com";
    const scopes = "user:read:email";

    const authUrl = new URL("https://id.twitch.tv/oauth2/authorize");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "token");
    authUrl.searchParams.append("scope", scopes);

    window.location.href = authUrl.toString();
  };

  const fetchPastStreams = async (token) => {
    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=YOUR_TWITCH_USER_ID&type=archive`,
        {
          headers: {
            "Client-ID": {clientId},
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch streams");
      }

      const data = await response.json();
      setStreams(data.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
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
