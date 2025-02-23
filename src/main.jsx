import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </UserProvider>
  </BrowserRouter>
);
