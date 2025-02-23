import { useState } from "react";
import OrderList from "../components/orders/OrderList";
import OrderForm from "../components/orders/OrderForm";
import { OrderProvider } from "../context/OrderContext";

const Orders = () => {
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
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header with "Add New Order" Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <button
            onClick={() => handleOpenForm()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Order
          </button>
        </div>
        {/* Order List */}
        <OrderList onEdit={handleOpenForm} /> {/* Pass onEdit here */}
        {/* Order Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
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
}


export default Orders;
