import { useState, useRef, useEffect } from 'react';

function TaskLog() {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    type: 'BAU',
    priority: 'Medium',
    timeSpent: '',
    reference: '',
    attachments: '',
  });

  const inputsRef = useRef([]);

  
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task submitted:', taskForm);
    
    setTaskForm({
      title: '',
      description: '',
      type: 'BAU',
      priority: 'Medium',
      timeSpent: '',
      reference: '',
      attachments: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
     
      e.preventDefault();

      
      if (index === inputsRef.current.length - 1) {
        handleSubmit(e);
      } else {
       
        if (inputsRef.current[index + 1]) {
          inputsRef.current[index + 1].focus();
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Log New Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded-lg p-6 space-y-4">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskForm.title}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={(el) => inputsRef.current[0] = el}
            className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(1,1,1,0.5)]"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskForm.description}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            ref={(el) => inputsRef.current[1] = el}
            rows="3"
            className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(1,1,1,0.5)]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Task Type</label>
            <select
              id="type"
              name="type"
              value={taskForm.type}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              ref={(el) => inputsRef.current[2] = el}
              className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(01,01,01,0.5)]"
            >
              <option value="BAU">BAU (Business as Usual)</option>
              <option value="Ad Hoc">Ad Hoc</option>
              <option value="Project">Project-Based</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              name="priority"
              value={taskForm.priority}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              ref={(el) => inputsRef.current[3] = el}
              className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(01,01,01,0.5)]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="timeSpent" className="block text-sm font-medium text-gray-700">Time Spent (hours)</label>
          <input
            type="number"
            id="timeSpent"
            name="timeSpent"
            value={taskForm.timeSpent}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 4)}
            ref={(el) => inputsRef.current[4] = el}
            min="0"
            step="0.5"
            className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(1,1,1,0.5)]"
          />
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Reference (optional)</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={taskForm.reference}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            ref={(el) => inputsRef.current[5] = el}
            className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(1,1,1,0.5)]"
            placeholder="Manager or colleague who assigned the task"
          />
        </div>

        <div>
          <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">Attachments (optional)</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 6)}
            ref={(el) => inputsRef.current[6] = el}
            className="pl-3 py-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500"
          />
          <input
            type="text"
            id="links"
            name="attachments"
            value={taskForm.attachments}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 7)}
            ref={(el) => inputsRef.current[7] = el}
            className="pl-3 py-1 mt-2 block w-full rounded-md border-gray-300 shadow-sm   focus:ring-indigo-500 focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-[0_0_10px_2px_rgba(1,1,1,0.5)]"
            placeholder="Or add a link to an email or document"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskLog;
