import React, { useState } from 'react';
import TeamPerformance from './TeamPerformance';
import ProductivityReport from './ProductivityReport';


const Home = () => {
  const [taskData, setTaskData] = useState([
    {
      id: 1,
      assignee: 'John Doe',
      quality: 85,
      quantity: 5,
      completionTime: 4,
      status: 'completed',
    },
    {
      id: 2,
      assignee: 'Jane Smith',
      quality: 92,
      quantity: 8,
      completionTime: 3,
      status: 'completed',
    },
   
  ]);

  const [reportPeriod, setReportPeriod] = useState('weekly'); 
  return (
    <div className="bg-gray-50  py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Team Performance Dashboard</h1>
        <TeamPerformance taskData={taskData} />
        <ProductivityReport performanceData={taskData} period={reportPeriod} />
      </div>
    </div>
  );
};

export default Home;
