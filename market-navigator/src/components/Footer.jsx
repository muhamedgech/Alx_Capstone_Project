import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6 mt-1">
      <div className="container mx-auto text-center">
        <div className="mb-0">
          <p>&copy; {new Date().getFullYear()} Bahir Dar Market Place. All rights reserved.</p>
        </div>
        <div className="text-sm text-gray-400">
          <p>Developed by Getasew Abeba</p>
          <p className="mt-2">
            <span>Made with ❤️ in Bahir Dar, Ethiopia</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
