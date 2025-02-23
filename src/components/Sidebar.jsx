import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useUser } from "../context/UserContext";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { user, logout } = useUser();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiHome size={20} /> },
    { name: "Orders", path: "/orders", icon: <FiShoppingCart size={20} /> },
    { name: "Products", path: "/products", icon: <FiBox size={20} /> },
    { name: "Users", path: "/users", icon: <FiUsers size={20} /> },
    { name: "Profile", path: "/profile", icon: <FiUser size={20} /> },
  ];

  return (
    <div className="static w-1/4">
      <div
        className={`fixed top-0 left-0 h-full bg-[#1E1E2F] text-white w-64 p-6 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"
          } lg:relative lg:translate-x-0 lg:flex flex-col z-40`}
      >
        <nav className="flex-1 pt-16">
          {" "}
          {/* Push content below Navbar */}
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium gap-3 ${location.pathname === item.path
                    ? "bg-[#34344A]"
                    : "hover:bg-[#2A2A3A]"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info Section */}
        {user && (
          <div className="mt-auto flex flex-col gap-3 p-4 bg-[#34344A] rounded-lg text-center">
            <img
              src="https://symbl-world.akamaized.net/i/webp/a4/aac58eba06b016ce93d9ecf7184a3f.webp"
              alt="Avatar"
              className="w-14 h-14 mx-auto rounded-full"
            />
            <p className="text-sm font-medium">{user.username}</p>
            <button
              onClick={logout}
              className="flex items-center justify-center bg-[#2A2A3A] hover:bg-red-700  text-white px-4 py-2 rounded mt-5 transition-all w-full transition duration-300"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
