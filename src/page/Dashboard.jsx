import React from 'react';
import ProductivityGraph from './ProductivityGraph';
import TaskTable from './TaskTable';
import PerformanceCard from './PerformanceCard';
import Home from './Home';
import DeskTimeDashboard from './DeskTimeDashboard';
import TaskTimeline from './TaskTimeline';


const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employer Dashboard</h1>

      <div className="mt-8">
        <DeskTimeDashboard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProductivityGraph />
        </div>

        <div>
          <PerformanceCard />
        </div>
      </div>

      <div className="mt-8">
        <TaskTable />
      </div>

      <div className="mt-8">
        <Home />
      </div>


      <div className="mt-8">
        <TaskTimeline />
      </div>
     

      
    </div>
  );
};

export default Dashboard;
