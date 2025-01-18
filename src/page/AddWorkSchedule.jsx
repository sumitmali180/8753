import React, { useState } from 'react';

const AddWorkSchedule = ({ memberId }) => {
  const [schedule, setSchedule] = useState({
    date: '',
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    taskName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleRef = database.ref(`teamMembers/${memberId}/workSchedule/${schedule.date}`);
    await scheduleRef.set({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      breaks: [{ breakStart: schedule.breakStart, breakEnd: schedule.breakEnd }],
      tasks: [{ task: schedule.taskName, startTime: schedule.startTime, endTime: schedule.endTime }],
    });

    setSchedule({
      date: '',
      startTime: '',
      endTime: '',
      breakStart: '',
      breakEnd: '',
      taskName: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="date" className="font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={schedule.date}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="startTime" className="font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={schedule.startTime}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="endTime" className="font-medium text-gray-700">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={schedule.endTime}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="breakStart" className="font-medium text-gray-700">Break Start</label>
        <input
          type="time"
          id="breakStart"
          name="breakStart"
          value={schedule.breakStart}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="breakEnd" className="font-medium text-gray-700">Break End</label>
        <input
          type="time"
          id="breakEnd"
          name="breakEnd"
          value={schedule.breakEnd}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="taskName" className="font-medium text-gray-700">Task Name</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={schedule.taskName}
          onChange={handleChange}
          placeholder="Enter task name"
          required
          className="border px-3 py-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Schedule
      </button>
    </form>
  );
};

export default AddWorkSchedule;
