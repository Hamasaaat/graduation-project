import React from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-md">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white text-2xl focus:outline-none"
      >
        <FiMenu size={28} />
      </button>

      <Link to="/"><h1 className="text-lg font-bold">Business Management</h1></Link>

      <ul className="hidden lg:flex space-x-6">
        <li>
          <Link to="/home" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-gray-400 transition">
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Navbar;
