import React from "react";

const OrderView = ({ order, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Order Details</h3>
        <div className="space-y-2">
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
            onClick={onEdit} // Call onEdit when the Edit button is clicked
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
