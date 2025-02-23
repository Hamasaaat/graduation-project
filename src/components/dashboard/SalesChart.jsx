// src/components/SalesChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SalesChart = ({ salesData }) => {
  const data = {
    labels: salesData.map((item) => item.label),
    datasets: [
      {
        label: "Sales",
        data: salesData.map((item) => item.value),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg h-80">
      <h3 className="text-lg font-semibold mb-2">Sales Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
