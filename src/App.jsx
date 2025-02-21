import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";
import { ProductProvider } from "./context/ProductContext"; 
import "./App.css";

const App = () => {
  return (
    <ProductProvider> {/* Wrap the entire app inside ProductProvider */}
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </ProductProvider>
  );
};

export default App;
