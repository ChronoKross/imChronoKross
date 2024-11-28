import { NavLink } from "react-router-dom";
import React from "react";
import useAuth from "../context/useAuth";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
  const { user, logout } = useAuth(); // Access user and logout function from context

  return (
    <>
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-medium"
        >
          <NavLink
            to="/"
            className="flex items-center hover:text-red-800 transition-colors"
          >
            Home
          </NavLink>
        </Typography>

        {!user && (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
          >
            <NavLink
              to="/register"
              className="flex items-center hover:text-red-800 transition-colors"
            >
              Register
            </NavLink>
          </Typography>
        )}

        {!user && (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
          >
            <NavLink
              to="/login"
              className="flex items-center hover:text-red-800 transition-colors"
            >
              Login
            </NavLink>
          </Typography>
        )}
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-medium"
        >
          <NavLink
            to="/privacy"
            className="flex items-center hover:text-red-800 transition-colors"
          >
            Privacy & Terms
          </NavLink>
        </Typography>

        {user && (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
          >
            <button
              onClick={logout} // Call logout function on click
              className="flex items-center hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          </Typography>
        )}
      </ul>
    </>
  );
}

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-black text-white border-none">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="cursor-pointer py-1.5 text-white"
        >
          Chrono
          <span className="text-cyan-600 font-extrabold inner-shadow-text">
            Kross
          </span>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
