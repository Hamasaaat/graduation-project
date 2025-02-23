import React from "react";
import { Navigate } from "react-router-dom";

const Orders = () => {

  if (localStorage.getItem('users') == null) {
    return <Navigate to="/login" />
  }

  return <div>Orders Page</div>;
};

export default Orders;
