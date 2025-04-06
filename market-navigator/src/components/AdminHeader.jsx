// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <nav>
        <Link to="/logout" className="text-white hover:text-gray-400">
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
