import { React, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./context/ProductContext";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const adminUser = {
      id: uuidv4(),
      username: "admin",
      email: "admin@admin.com",
      password: "admin",
      role: "admin",
      isBlocked: false,
      createdDate: "2/20/2025, 8:42:45 PM",
    };

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = savedUsers.some(
      (user) => user.username === adminUser.username && user.role === "admin"
    );

    if (!adminExists) {
      savedUsers.push(adminUser);
      localStorage.setItem("users", JSON.stringify(savedUsers));
    }
  }, []);

  return (
    <ProductProvider>
      <div className="flex h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-1 p-4 mt-10 overflow-auto">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </ProductProvider>
  );
};

export default App;
