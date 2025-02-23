import React from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {

  if (localStorage.getItem('users') == null) {
    return <Navigate to="/login" />
  }

  return <div>Dashboard Page </div>;
};

export default Dashboard;
