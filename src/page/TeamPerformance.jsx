import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const TeamPerformance = () => {
  const [taskData, setTaskData] = useState([]);
  const [teamPerformance, setTeamPerformance] = useState([]);

  // Fetch task data from Firebase when component mounts
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch('https://userauth-4478f-default-rtdb.firebaseio.com/tasks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        const tasks = Object.keys(data).map(key => ({
          ...data[key],
          id: key, // Add Firebase generated id to each task
        }));
        setTaskData(tasks);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, []);

  // Process the fetched task data to calculate team performance
  useEffect(() => {
    if (taskData.length > 0) {
      const processedData = calculateTeamPerformance(taskData);
      setTeamPerformance(processedData);
    }
  }, [taskData]);

  const calculateTeamPerformance = (tasks) => {
    const performanceData = {};

    tasks.forEach(task => {
      if (!performanceData[task.assignee]) {
        performanceData[task.assignee] = {
          quality: 0,
          quantity: 0,
          completionTime: 0,
          taskCount: 0,
        };
      }

      performanceData[task.assignee].quality += task.quality;
      performanceData[task.assignee].quantity += task.quantity;
      performanceData[task.assignee].completionTime += task.completionTime;
      performanceData[task.assignee].taskCount += 1;
    });

    // Calculate average quality and completion time for each assignee
    for (let assignee in performanceData) {
      performanceData[assignee].quality /= performanceData[assignee].taskCount;
      performanceData[assignee].completionTime /= performanceData[assignee].taskCount;
    }

    return performanceData;
  };

  const getChartData = () => {
    const labels = Object.keys(teamPerformance);
    const qualityData = labels.map(assignee => teamPerformance[assignee].quality);
    const quantityData = labels.map(assignee => teamPerformance[assignee].quantity);

    return {
      labels,
      datasets: [
        {
          label: 'Quality (%)',
          data: qualityData,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
        {
          label: 'Quantity',
          data: quantityData,
          borderColor: 'rgba(255,99,132,1)',
          fill: false,
        },
      ],
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Performance Trends</h2>
      <div className="mb-6">
        {teamPerformance && teamPerformance.length > 0 ? (
          <Line data={getChartData()} />
        ) : (
          <p>Loading performance data...</p>
        )}
      </div>
      <ul className="space-y-4">
        {Object.entries(teamPerformance).map(([assignee, performance]) => (
          <li key={assignee} className="flex justify-between items-center border-b py-2">
            <span className="font-medium text-gray-700">{assignee}</span>
            <span className="text-gray-600">
              Quality: {performance.quality.toFixed(2)}%, 
              Quantity: {performance.quantity}, 
              Avg Time: {performance.completionTime.toFixed(2)} hrs
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPerformance;
