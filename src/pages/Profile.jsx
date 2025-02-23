import React from "react";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, logout } = useUser();

  if (!user) return <p className="text-center mt-10">No user logged in.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">{user.username}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-5 transition-all w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
