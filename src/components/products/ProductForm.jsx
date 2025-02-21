import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";

const ProductForm = ({ isOpen, onClose, initialProduct }) => {
  const { addProduct, saveEditedProduct } = useProducts();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        description: "",
        image: "",
      });
    }
  }, [initialProduct]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialProduct) {
      saveEditedProduct(formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialProduct ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex gap-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded"
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded"
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded h-24 resize-none"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#747474] text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300"
          >
            {initialProduct ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#747474] text-white px-4 py-2 rounded mb-4 hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
