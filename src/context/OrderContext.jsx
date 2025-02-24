import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const OrderContext = createContext();

// Custom hook to use the OrderContext
export const useOrders = () => useContext(OrderContext);

// OrderProvider component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      // Check if orders already exist in localStorage
      const storedOrders = JSON.parse(localStorage.getItem("orders"));
      if (storedOrders && storedOrders.length > 0) {
        setOrders(storedOrders);
        return;
      }

      // Fetch carts from Fake Store API
      try {
        const response = await fetch("https://fakestoreapi.com/carts");
        const carts = await response.json();

        // Transform carts into orders with additional information
        const transformedOrders = carts.map((cart) => ({
          id: cart.id,
          customerName: `User ${cart.userId}`, // Use userId to generate a customer name
          customerEmail: `user${cart.userId}@example.com`, // Generate a fake email
          customerAddress: `Address for User ${cart.userId}`, // Generate a fake address
          products: cart.products.map((product) => ({
            name: `Product ${product.productId}`, // Use productId to generate a product name
            quantity: product.quantity,
          })),
          status: "Pending", // Default status
          date: cart.date, // Include the date from the API
        }));

        // Save transformed orders to localStorage
        localStorage.setItem("orders", JSON.stringify(transformedOrders));
        setOrders(transformedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Save orders to local storage whenever orders state changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Function to add a new order
  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), status: "Pending" }; // Default status is "Pending"
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
  };

  // Function to edit an existing order
  const editOrder = (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  // Function to delete an order
  const deleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, editOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
