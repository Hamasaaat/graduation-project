import { useState } from "react";
import OrderList from "../components/orders/OrderList";
import OrderForm from "../components/orders/OrderForm";
import { OrderProvider } from "../context/OrderContext";
import { Navigate } from "react-router-dom";

const Orders = () => {
  if (localStorage.getItem("loggedInUser") == null) {
    return <Navigate to="/login" />;
  }

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleOpenForm = (order = null) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingOrder(null);
    setIsFormOpen(false);
  };

  return (
    <OrderProvider>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with "Add New Order" Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <button
            onClick={() => handleOpenForm()}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
          >
            Add New Order
          </button>
        </div>

        {/* Order List */}
        <OrderList onEdit={handleOpenForm} />

        {/* Order Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {editingOrder ? "Edit Order" : "Add New Order"}
              </h2>
              <OrderForm
                onClose={handleCloseForm}
                initialOrder={editingOrder}
              />
            </div>
          </div>
        )}
      </div>
    </OrderProvider>
  );
};

export default Orders;
