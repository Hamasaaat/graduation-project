import React, { useEffect } from "react";
import DashboardMetrics from "../components/dashboard/DashboardMetrics";
import SalesChart from "../components/dashboard/SalesChart";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useProducts } from "../context/ProductContext";

const DashboardPage = () => {
  const { fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (localStorage.getItem("loggedInUser") == null) {
    return <Navigate to="/login" />;
  }

  const users = JSON.parse(localStorage.getItem("users"));
  const userCount = users ? users.length : 0;

  const orders = JSON.parse(localStorage.getItem("orders"));
  const OrdersCount = orders ? orders.length : 0;

  const Products = JSON.parse(localStorage.getItem("products"));
  const ProductsCount = Products ? Products.length : 0;
  // Debugging: Log Orders and Products data to check if they are loaded correctly
  console.log("Orders:", orders);
  console.log("Products:", Products);

  // Calculate total sales in money (price * quantity)
  const totalSales = orders
    ? orders.reduce((total, order) => {
        order.products.forEach((orderProduct) => {
          // Debugging: Log the product and its corresponding order
          console.log(
            `Processing order product: ${orderProduct.id}, Quantity: ${orderProduct.quantity}`
          );
          const product = Products.find((p) => p.id === orderProduct.id); // Find the product by name
          if (product) {
            console.log(
              `Found product: ${product.id}, Price: ${product.price}`
            );
            total += product.price * orderProduct.quantity; // Multiply product price by quantity and add to total
          } else {
            console.log(`Product not found for ${orderProduct.id}`);
          }
        });
        return total;
      }, 0)
    : 0;

  // Debugging: Log total sales to check if it's calculating correctly
  console.log("Total Sales:", totalSales);

  // Format the total sales as currency
  const formattedTotalSales = `$${totalSales.toLocaleString()}`;

  const [metrics, setMetrics] = useState([
    { title: "Users", value: userCount },
    { title: "Orders", value: OrdersCount },
    { title: "Products", value: ProductsCount },
    { title: "Total Sales", value: formattedTotalSales },
  ]);

  const [salesData, setSalesData] = useState([
    { label: "Jan", value: 20 },
    { label: "Feb", value: 50 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 105.94 },
  ]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardMetrics metrics={metrics} />
      <SalesChart salesData={salesData} />
    </div>
  );
};

export default DashboardPage;
