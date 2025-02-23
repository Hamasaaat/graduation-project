import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLocation, Navigate } from "react-router-dom";

const Profile = () => {

  if (localStorage.getItem('loggedInUser') == null) {
    return <Navigate to="/login" />
  }

  const { user, setUser, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("📌 Profile loaded user:", storedUser);
    if (storedUser) {
      setUser(storedUser);
      setUserData(storedUser);
    }
  }, [location.pathname]);

  if (!userData) return <p className="text-center mt-10">No user logged in.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex items-center gap-4">
        <img
          src="https://symbl-world.akamaized.net/i/webp/a4/aac58eba06b016ce93d9ecf7184a3f.webp"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">{userData.username}</p>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">Role: {userData.role}</p>
          <p className="text-gray-600">Created Date: {userData.createdDate}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="bg-[#2A2A3A] hover:bg-red-700  text-white px-4 py-2 rounded mt-5 transition-all w-full transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
