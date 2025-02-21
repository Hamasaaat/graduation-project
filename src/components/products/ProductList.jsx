import React from "react";
import { useProducts } from "../../context/ProductContext";

const ProductList = ({ onEdit }) => {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between 
            transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
        >
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-full object-contain mb-2 rounded"
            />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-green-600 font-semibold">${product.price}</p>
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="bg-[#747474] text-white px-3 py-1 rounded w-1/2 mr-1 transition-all duration-300 hover:bg-blue-600"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className="bg-[#5c5c5c] text-white px-3 py-1 rounded w-1/2 ml-1 transition-all duration-300 hover:bg-red-600"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
