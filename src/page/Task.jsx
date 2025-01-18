// src/components/Task.js
import React from 'react';

const Task = ({ task }) => {
  const { title, description, timeSpent, priority, category, reference, attachment } = task;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${priority === 'High' ? 'bg-red-500 text-white' : priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
          {priority}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-2 text-sm text-gray-600">
        <div>Category: {category}</div>
        <div>Time Spent: {timeSpent} hours</div>
        <div>Reference: {reference}</div>
        {attachment && <div>Attachment: <a href={URL.createObjectURL(attachment)} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a></div>}
      </div>
    </div>
  );
};

export default Task;
