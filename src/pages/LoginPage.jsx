import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      console.log("✅ User Found:", foundUser); 
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); 
      setUser(foundUser); 
      navigate("/profile"); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <LoginForm onLogin={handleLogin} />
        <div className="text-center mt-4">
          <span className="text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
