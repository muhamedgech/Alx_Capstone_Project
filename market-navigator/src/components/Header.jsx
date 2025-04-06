import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 text-white p-4 m-2 rounded-lg shadow sm:mb-6">
      {/* Logo/Image */}
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <img
          src="/bahirdar.png" // Assuming this path is correct
          alt="Market Center"
          className="h-20 w-20 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">Bahir Dar Market Place Navigator</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-6 sm:space-y-0">
        <Link to="/login" className="text-white hover:text-gray-400">
          Login
        </Link>
        <Link to="/register" className="text-white hover:text-gray-400">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
