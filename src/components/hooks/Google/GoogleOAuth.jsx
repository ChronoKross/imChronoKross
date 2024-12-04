import useGoogleOauth from "./useGoogleOauth";

const GoogleOauth = () => {
  const { isLoading, error } = useGoogleOauth();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default GoogleOauth;
