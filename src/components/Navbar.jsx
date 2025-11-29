import React from "react";
import { Users, UserPlus, Edit, LogOut } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { name: "Student List", path: "student-list", icon: Users },
    { name: "Register Student", path: "register", icon: UserPlus },
    { name: "Update Record", path: "update", icon: Edit },
  ];

  return (
    <nav className="bg-[#D0006F] shadow sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">

          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-md p-2 shadow">
              <span className="text-[#D0006F] font-bold">IIMT</span>
            </div>

            <div>
              <h1 className="text-lg font-semibold text-white">IIMT StudentPortal</h1>
              <p className="text-xs text-pink-100">Admin Console</p>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => setCurrentPage(item.path)}
                  className={`flex items-center px-4 py-2 rounded-lg transition text-sm ${
                    active
                      ? "bg-white text-[#D0006F] shadow"
                      : "text-white/90 hover:bg-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </button>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-white/20 transition text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
