import React from "react";

const OrderView = ({ order, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Order Details</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.customerEmail}
          </p>
          <p>
            <strong>Address:</strong> {order.customerAddress}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "Shipped"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <strong>Products:</strong>
          </p>
          <ul className="list-disc pl-5">
            {order.products.map((product, index) => (
              <li key={index}>
                {product.name} (Quantity: {product.quantity})
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
