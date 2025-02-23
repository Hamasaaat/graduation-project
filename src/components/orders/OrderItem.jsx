import React, { useState } from "react";
import OrderView from "./OrderView";

const OrderItem = ({ order, onDelete, onEdit }) => {
  const [isViewing, setIsViewing] = useState(false);

  const handleView = () => {
    setIsViewing(true);
  };

  const handleCloseView = () => {
    setIsViewing(false);
  };

  const handleEdit = () => {
    onEdit(order); // Pass the order to the parent component for editing
    setIsViewing(false); // Close the view modal
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="py-3 px-4 border-b">{order.id}</td>
        <td className="py-3 px-4 border-b">{order.customerName}</td>
        <td className="py-3 px-4 border-b">{order.customerEmail}</td>
        <td className="py-3 px-4 border-b">
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
        </td>
        <td className="py-3 px-4 border-b">
          <button
            onClick={handleView}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            View
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* View Modal */}
      {isViewing && (
        <OrderView
          order={order}
          onClose={handleCloseView}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default OrderItem;
