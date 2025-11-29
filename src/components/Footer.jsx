import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#D0006F] mt-8 shadow-inner">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Student Management System
          </h3>
          <p className="text-xs text-pink-100">
            © {new Date().getFullYear()} IIMT. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="text-sm text-white/90 hover:text-white transition">
            About
          </button>
          <button className="text-sm text-white/90 hover:text-white transition">
            Contact
          </button>
          <button className="text-sm text-white/90 hover:text-white transition">
            Privacy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
