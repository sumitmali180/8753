import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [timeSpent, setTimeSpent] = useState('');
  const [tasks, setTasks] = useState([]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      name: taskName,
      assignee,
      priority,
      status,
      timeSpent,
    };

    try {
      
      const response = await axios.post('https://userauth-4478f-default-rtdb.firebaseio.com/tasks.json', newTask);

      
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: response.data.name, ...newTask }, 
      ]);

      
      setTaskName('');
      setAssignee('');
      setPriority('Medium');
      setStatus('Pending');
      setTimeSpent('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Create New Task</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Spent</label>
          <input
            type="text"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
          Create Task
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Task List</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mt-2 p-4 bg-gray-100 rounded-md">
              <h4 className="font-medium">{task.name}</h4>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Time Spent:</strong> {task.timeSpent}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
