import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProductivityGraph = () => {

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], 
    datasets: [
      {
        label: 'Productivity Over Time',
        data: [10, 20, 25, 18, 30], 
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Employee Productivity Over Time',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Tasks: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Productivity Score',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Productivity Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProductivityGraph;
