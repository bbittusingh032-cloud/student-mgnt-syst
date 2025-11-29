import React from "react";
import { Users, UserPlus, Edit, LogOut } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { name: "Student List", path: "student-list", icon: Users },
    { name: "Register Student", path: "register", icon: UserPlus },
    { name: "Update Record", path: "update", icon: Edit },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-md p-2">
              <span className="text-white font-bold">IIMT</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">IIMT StudentPortal</h1>
              <p className="text-xs text-gray-500">Admin Console</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => setCurrentPage(item.path)}
                  className={`flex items-center px-4 py-2 rounded-lg transition ${
                    active ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}

            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
