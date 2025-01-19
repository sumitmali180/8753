import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTimeline = () => {
  const [tasks, setTasks] = useState([]);
  
  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://userauth-4478f-default-rtdb.firebaseio.com/tasks.json');
        
        // Convert the response into an array and add the timestamp
        const taskData = Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
          timestamp: response.data[key].timestamp || new Date().toISOString(),
        }));

        // Sort tasks by timestamp to show them in chronological order
        taskData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="timeline-container bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Timeline</h2>
      <div className="timeline">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="timeline-item mb-6 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(task.timestamp).toLocaleString()}</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'Completed' ? 'bg-green-200 text-green-800' : task.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                  {task.status}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{task.name}</h3>
              <p className="mt-1 text-gray-600">Assigned to: {task.assignee}</p>
              <p className="mt-1 text-gray-500">Time Spent: {task.timeSpent}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskTimeline;
