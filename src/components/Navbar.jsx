import { FiSearch, FiBell, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="bg-[#6441A5] text-white p-4 shadow-innerNavbar">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Twitch</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">
            Browse
          </a>
          <a href="#" className="hover:text-gray-300">
            Esports
          </a>
          <a href="#" className="hover:text-gray-300">
            Music
          </a>
          <a href="#" className="hover:text-gray-300">
            Chat
          </a>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <FiSearch className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          <FiBell className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          <FiUser className="h-6 w-6 cursor-pointer hover:text-gray-300" />

          <button className="bg-[#9146FF] hover:bg-[#772ce8] text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
          <button className="border border-white hover:bg-white hover:text-[#6441A5] text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
