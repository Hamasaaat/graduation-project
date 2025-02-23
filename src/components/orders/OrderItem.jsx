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
        <td className="py-4 px-6 text-sm text-gray-900">{order.id}</td>
        <td className="py-4 px-6 text-sm text-gray-900">
          {order.customerName}
        </td>
        <td className="py-4 px-6 text-sm text-gray-900">
          {order.customerEmail}
        </td>
        <td className="py-4 px-6 text-sm">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
        <td className="py-4 px-6 text-sm">
          <button
            onClick={handleView}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
          >
            View
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-2 transition-colors shadow-sm"
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
