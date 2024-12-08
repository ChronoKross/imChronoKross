import { IconBrandGoogle } from "@tabler/icons-react";
import useGoogleAuth from "./useGoogleOAuth";

const GoogleOAuth = () => {
  const { login: googleOAuthLogin } = useGoogleAuth();

  return (
    <button
      onClick={googleOAuthLogin}
      className="flex items-center gap-2 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 rounded-md shadow-md border border-neutral-300 dark:border-neutral-600 transition duration-200"
      aria-label="Login with Google"
    >
      <IconBrandGoogle className=" text-black h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-black dark:text-neutral-300 text-sm">Google</span>
    </button>
  );
};

export default GoogleOAuth;
