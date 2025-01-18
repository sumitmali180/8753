import React from 'react';

const PerformanceCard = () => {
  const performanceData = [
    { name: 'John Doe', tasksCompleted: 15, avgTime: '1.5h', performance: 'High' },
    { name: 'Jane Smith', tasksCompleted: 10, avgTime: '2h', performance: 'Medium' },
    { name: 'Alice Brown', tasksCompleted: 8, avgTime: '3h', performance: 'Low' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Performance Trends</h2>
      <ul>
        {performanceData.map((employee, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{employee.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${employee.performance === 'High' ? 'bg-green-100 text-green-700' : employee.performance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {employee.performance}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Tasks Completed: {employee.tasksCompleted}</p>
            <p className="text-gray-500 text-sm">Average Time: {employee.avgTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceCard;
