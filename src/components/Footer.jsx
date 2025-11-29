import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Student Management System</h3>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} IIMT. All Rights Reserved.</p>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a className="text-sm text-gray-600 hover:text-blue-600">About</a>
          <a className="text-sm text-gray-600 hover:text-blue-600">Contact</a>
          <a className="text-sm text-gray-600 hover:text-blue-600">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
