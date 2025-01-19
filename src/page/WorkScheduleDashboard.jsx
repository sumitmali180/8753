import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import axios from 'axios'; 
import 'react-calendar/dist/Calendar.css'; 

const WorkScheduleDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teamMembers, setTeamMembers] = useState([]);
  const [schedules, setSchedules] = useState({}); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [scheduleForm, setScheduleForm] = useState({
    memberId: '',
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
    taskName: '',
  });

  // Dummy data to replace API calls
  const dummyTeamMembers = [
    { id: '1', name: 'Andy Bernard' },
    { id: '2', name: 'Charles Malkins' },
    { id: '3', name: 'Creed Bratton' },
    { id: '4', name: 'Darryl Philbin' },
    { id: '5', name: 'Dwight Schrute' },
  ];

  const dummySchedules = {
    '1': {
      startTime: '09:00',
      endTime: '17:00',
      breaks: [
        { breakStart: '12:00', breakEnd: '12:30' }
      ],
      tasks: [
        { task: 'Meeting with HR', startTime: '09:00', endTime: '11:00' },
        { task: 'Email follow-ups', startTime: '11:00', endTime: '12:00' },
      ],
    },
    '2': {
      startTime: '08:30',
      endTime: '16:30',
      breaks: [
        { breakStart: '12:15', breakEnd: '12:45' }
      ],
      tasks: [
        { task: 'Financial report', startTime: '08:30', endTime: '11:30' },
        { task: 'Team call', startTime: '11:30', endTime: '12:30' },
      ],
    },
    '3': null, // No schedule for Creed
    '4': {
      startTime: '10:00',
      endTime: '18:00',
      breaks: [
        { breakStart: '13:00', breakEnd: '13:30' }
      ],
      tasks: [
        { task: 'Product launch meeting', startTime: '10:00', endTime: '12:00' },
        { task: 'Task delegation', startTime: '12:30', endTime: '14:00' },
      ],
    },
    '5': {
      startTime: '07:30',
      endTime: '15:30',
      breaks: [
        { breakStart: '11:30', breakEnd: '12:00' }
      ],
      tasks: [
        { task: 'Client meeting', startTime: '07:30', endTime: '09:30' },
        { task: 'Inventory check', startTime: '09:30', endTime: '11:00' },
      ],
    },
  };

  // Mimic API call to fetch team members and their schedules
  useEffect(() => {
    setTeamMembers(dummyTeamMembers);
    setSchedules(dummySchedules);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedDate = selectedDate.toISOString().split('T')[0]; 

  // Open the modal to add/edit a schedule
  const openModal = (memberId) => {
    setIsModalOpen(true);
    setScheduleForm({ ...scheduleForm, memberId });
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setScheduleForm({
      memberId: '',
      startTime: '',
      endTime: '',
      breakStart: '',
      breakEnd: '',
      taskName: '',
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberId, startTime, endTime, breakStart, breakEnd, taskName } = scheduleForm;

    const scheduleData = {
      startTime,
      endTime,
      breaks: [{ breakStart, breakEnd }],
      tasks: [{ task: taskName, startTime, endTime }],
    };

    // Update the schedule for the team member
    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [memberId]: scheduleData,
    }));

    closeModal();
    alert('Schedule added/updated successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Work Schedule for {formattedDate}</h1>

      <div className="mb-6">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => openModal('')} 
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Work Schedule
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Breaks</th>
              <th className="px-4 py-2">Tasks</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="px-4 py-2">{member.name}</td>
                {schedules[member.id] ? (
                  <>
                    <td className="px-4 py-2">{schedules[member.id].startTime}</td>
                    <td className="px-4 py-2">{schedules[member.id].endTime}</td>
                    <td className="px-4 py-2">
                      {schedules[member.id].breaks.map((breakItem, index) => (
                        <div key={index}>
                          {breakItem.breakStart} - {breakItem.breakEnd}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {schedules[member.id].tasks.map((task, index) => (
                        <div key={index}>
                          {task.task} ({task.startTime} - {task.endTime})
                        </div>
                      ))}
                    </td>
                  </>
                ) : (
                  <td colSpan="5" className="px-4 py-2 text-center">No schedule available</td>
                )}
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(member.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Add Work Schedule</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={scheduleForm.startTime}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={scheduleForm.endTime}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="breakStart" className="block text-sm font-medium text-gray-700">Break Start</label>
                <input
                  type="time"
                  id="breakStart"
                  name="breakStart"
                  value={scheduleForm.breakStart}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="breakEnd" className="block text-sm font-medium text-gray-700">Break End</label>
                <input
                  type="time"
                  id="breakEnd"
                  name="breakEnd"
                  value={scheduleForm.breakEnd}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={scheduleForm.taskName}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded-md w-full"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkScheduleDashboard;
