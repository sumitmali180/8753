import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import moment from 'moment';

const initialTasks = [
  { id: 1, name: 'Task 1', description: 'Description for Task 1', dueDate: '2025-01-19', status: 'Pending' },
  { id: 2, name: 'Task 2', description: 'Description for Task 2', dueDate: '2025-01-20', status: 'In Progress' },
  { id: 3, name: 'Task 3', description: 'Description for Task 3', dueDate: '2025-01-18', status: 'Completed' },
  { id: 4, name: 'Task 4', description: 'Description for Task 4', dueDate: '2025-01-19', status: 'Pending' },
  { id: 5, name: 'Task 5', description: 'Description for Task 5', dueDate: '2025-01-20', status: 'Completed' },
];

const TaskTimeline = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', status: 'Pending' });
  const [isAddingTask, setIsAddingTask] = useState(false);

  const fetchTasks = async () => {
    try {
      const dbRef = ref(database, 'tasks/');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const tasksFromDb = snapshot.val();
        setTasks(Object.values(tasksFromDb)); 
      } else {
        setTasks(initialTasks); 
      }
    } catch (error) {
      console.error("Error fetching tasks from Firebase:", error);
      setTasks(initialTasks); 
    }
  };

  const handleAddTask = async () => {
    if (newTask.name && newTask.dueDate) {
      const taskWithId = { ...newTask, id: Date.now() }; 
      const newTasks = [...tasks, taskWithId];
      setTasks(newTasks);

      try {
        const dbRef = ref(database, 'tasks/' + taskWithId.id);
        await set(dbRef, taskWithId);
      } catch (error) {
        console.error("Error saving task to Firebase:", error);
      }

      setIsAddingTask(false);
      setNewTask({ name: '', description: '', dueDate: '', status: 'Pending' });
    }
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const taskDate = moment(task.dueDate).format('YYYY-MM-DD');
    if (!acc[taskDate]) acc[taskDate] = [];
    acc[taskDate].push(task);
    return acc;
  }, {});

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Task Timeline</h1>

     
      <div className="mb-6">
        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

     
      {isAddingTask && (
        <div className="p-6 border rounded-lg mb-6">
          <h2 className="text-xl font-medium mb-4">Add a New Task</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Task Name</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddingTask(false)}
              className="px-4 py-2 text-gray-600 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

     
      <div>
        {Object.keys(groupedTasks).map((taskDate) => (
          <div key={taskDate} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              {moment(taskDate).format('dddd, MMMM D, YYYY')}
            </h3>
            <div className="border-t pt-4">
              {groupedTasks[taskDate].map((task) => (
                <div key={task.id} className="flex justify-between items-center mb-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {task.name[0]} 
                    </div>
                    <div>
                      <div className="font-medium">{task.name}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                      <div className="text-sm text-gray-400 mt-2">{task.status}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moment(task.dueDate).format('hh:mm A')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTimeline;
