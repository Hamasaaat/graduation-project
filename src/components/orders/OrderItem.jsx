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
    onEdit(order); // Call the onEdit function passed from the parent
    setIsViewing(false); // Close the view modal
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="py-3 px-4 border-b">{order.customerName}</td>
        <td className="py-3 px-4 border-b">{order.customerEmail}</td>
        <td className="py-3 px-4 border-b">{order.customerAddress}</td>
        <td className="py-3 px-4 border-b">
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.name} (Quantity: {product.quantity})
              </li>
            ))}
          </ul>
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
          onEdit={handleEdit} // Pass handleEdit to OrderView
        />
      )}
    </>
  );
};

export default OrderItem;
