import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductList from "../components/Products/ProductList";
import ProductForm from "../components/Products/ProductForm";
import { Navigate } from "react-router-dom";

const Products = () => {

  if (localStorage.getItem('loggedInUser') == null) {
    return <Navigate to="/login" />
  }

  const { fetchProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts(); // Fetch products from API when page loads
  }, []);

  // Open modal for adding a product
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // Open modal for editing a product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 ">
      <header className="flex justify-between mb-5 px-4 sm:px-8 lg:px-16 mb-5">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <button
          onClick={handleAddProduct}
          className="bg-[#747474] text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition-all duration-150 "
        >
          Add Product
        </button>
      </header>

      <ProductList onEdit={handleEditProduct} />

      {/* Modal for ProductForm */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg ">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <ProductForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              initialProduct={selectedProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
