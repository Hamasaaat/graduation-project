import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiBox, FiUsers, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation(); // Get the current route

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Orders", path: "/orders", icon: <FiShoppingCart size={20} /> },
    { name: "Products", path: "/products", icon: <FiBox size={20} /> },
    { name: "Users", path: "/users", icon: <FiUsers size={20} /> },
    { name: "Profile", path: "/profile", icon: <FiUser size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-[#1E1E2F] text-white p-6 sticky top-0 shadow-lg flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium gap-3
                  ${location.pathname === item.path ? "bg-[#34344A]" : "hover:bg-[#2A2A3A]"}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
