import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext"; // Import ProductProvider
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      {" "}
      {/* Wrap App with ProductProvider */}
      <App />
    </ProductProvider>
  </BrowserRouter>
);
