import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="w-64 h-screen bg-[#747474] text-white p-6 sticky top-0 shadow-lg">
      <nav>
        <ul className="space-y-4">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Orders", path: "/orders" },
            { name: "Products", path: "/products" },
            { name: "Users", path: "/users" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-center transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-[#4a4a4a]" // Active link color
                    : "bg-[#5c5c5c] hover:bg-[#4a4a4a]"
                }`}
              >
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
