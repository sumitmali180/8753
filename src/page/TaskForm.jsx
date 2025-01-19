import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames'; // For conditional styling (optional, install with npm/yarn)

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [timeSpent, setTimeSpent] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage the submission state
  const [focusedField, setFocusedField] = useState(null); // Track focus state for dynamic styles

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set the submitting state

    const newTask = {
      name: taskName,
      assignee,
      priority,
      status,
      timeSpent,
    };

    try {
      // Post the new task to Firebase
      const response = await axios.post('https://userauth-4478f-default-rtdb.firebaseio.com/tasks.json', newTask);

      // Update the task list with the new task and its ID
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: response.data.name, ...newTask },
      ]);

      // Clear the form fields
      setTaskName('');
      setAssignee('');
      setPriority('Medium');
      setStatus('Pending');
      setTimeSpent('');

      // Show success alert
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field); // Set the currently focused field
  };

  const handleBlur = () => {
    setFocusedField(null); // Reset focus when input loses focus
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
            onFocus={() => handleFocus('taskName')}
            onBlur={handleBlur}
            className={classNames(
              "mt-2 w-full px-4 py-2 border rounded-md",
              {
                "border-blue-500": focusedField === 'taskName', // Highlight on focus
                "border-red-500": isSubmitting && !taskName, // Highlight on submit if empty
                "border-gray-300": !focusedField && !isSubmitting, // Default border
              }
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            onFocus={() => handleFocus('assignee')}
            onBlur={handleBlur}
            className={classNames(
              "mt-2 w-full px-4 py-2 border rounded-md",
              {
                "border-blue-500": focusedField === 'assignee',
                "border-red-500": isSubmitting && !assignee,
                "border-gray-300": !focusedField && !isSubmitting,
              }
            )}
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

        <button
          type="submit"
          disabled={isSubmitting} // Disable the button while submitting
          className={classNames(
            "w-full px-4 py-2 rounded-md text-white",
            {
              "bg-blue-500": !isSubmitting, // Default button style
              "bg-gray-400": isSubmitting, // Disabled button style
              "cursor-not-allowed": isSubmitting,
            }
          )}
        >
          {isSubmitting ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
