// src/components/DashboardMetrics.jsx
import React from "react";

const DashboardMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{metric.title}</h3>
          <p className="text-xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
