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
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>


  );
};

export default LoginPage;
