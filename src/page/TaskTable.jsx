import React, { useState, useEffect } from 'react';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // Fetch tasks from Firebase when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://userauth-4478f-default-rtdb.firebaseio.com/tasks.json');
        const data = await response.json();

        // Format the data into an array of tasks
        const tasksArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        setTasks(tasksArray);
        setFilteredTasks(tasksArray); // Set filtered tasks initially to all tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures the fetch runs once when the component mounts

  useEffect(() => {
    let filtered = tasks;

    if (selectedStatus) {
      filtered = filtered.filter(task => task.status === selectedStatus);
    }
    if (selectedPriority) {
      filtered = filtered.filter(task => task.priority === selectedPriority);
    }

    setFilteredTasks(filtered);
  }, [selectedStatus, selectedPriority, tasks]);

  const handleSort = (field) => {
    const sorted = [...filteredTasks].sort((a, b) => {
      if (field === 'timeSpent') {
        return parseTime(a[field]) - parseTime(b[field]);
      }
      return a[field].localeCompare(b[field]);
    });
    setFilteredTasks(sorted);
  };

  const parseTime = (time) => {
    const timeParts = time.split('h');
    if (timeParts.length === 2) {
      return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    }
    const minutes = time.split('m')[0];
    return parseInt(minutes);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Breakdown</h2>

      <div className="mb-4 flex gap-4">
        <select
          className="border px-4 py-2 rounded"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th
              className="py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Task Name
            </th>
            <th
              className="py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort('assignee')}
            >
              Assignee
            </th>
            <th
              className="py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort('priority')}
            >
              Priority
            </th>
            <th
              className="py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
            </th>
            <th
              className="py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort('timeSpent')}
            >
              Time Spent
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-700">{task.name}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{task.assignee}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{task.priority}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{task.status}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{task.timeSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
