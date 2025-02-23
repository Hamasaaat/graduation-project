
import React from 'react';
import DashboardMetrics from "../components/dashboard/DashboardMetrics";
import SalesChart from "../components/dashboard/SalesChart";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {

  if (localStorage.getItem('loggedInUser') == null) {
    return <Navigate to="/login" />
  }

  const [metrics, setMetrics] = useState([
    { title: "Users", value: 1200 },
    { title: "Orders", value: 350 },
    { title: "Products", value: 78 },
    { title: "Total Sales", value: "$45,000" },
  ]);

  const [salesData, setSalesData] = useState([
    { label: "Jan", value: 5000 },
    { label: "Feb", value: 7000 },
    { label: "Mar", value: 6500 },
    { label: "Apr", value: 8000 },
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
