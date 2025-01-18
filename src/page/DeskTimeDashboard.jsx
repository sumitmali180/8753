import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const MetricCard = ({ title, value, subvalue, color = "text-green-500" }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
    <div className={`text-2xl font-semibold ${color}`}>
      {value}
      {subvalue && <span className="text-lg">{subvalue}</span>}
    </div>
    <div className="mt-4 h-12 bg-green-100 rounded-lg"></div>
  </div>
);

const generateDayData = () => Array(24).fill(null).map((_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  productive: Math.random() * 60 + 40,
  neutral: Math.random() * 20,
  unproductive: Math.random() * 20,
}));

const generateWeekData = () => Array(7).fill(null).map((_, i) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return {
    time: days[i],
    productive: Math.random() * 60 + 40,
    neutral: Math.random() * 20,
    unproductive: Math.random() * 20,
  };
});

const generateMonthData = () => Array(31).fill(null).map((_, i) => ({
  time: i + 1,
  productive: Math.random() * 60 + 40,
  neutral: Math.random() * 20,
  unproductive: Math.random() * 20,
}));

const DatePicker = ({ date, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
      >
        <CalendarIcon className="w-4 h-4" />
        <span>{date.toLocaleDateString()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-4 z-50 max-w-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold">
              {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-gray-500 text-sm font-semibold">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="p-2"></div>
            ))}
            {days.map(day => (
              <button
                key={day}
                onClick={() => {
                  const newDate = new Date(currentMonth.setDate(day));
                  onDateChange(newDate);
                  setIsOpen(false);
                }}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  date.getDate() === day &&
                  date.getMonth() === currentMonth.getMonth() &&
                  date.getFullYear() === currentMonth.getFullYear()
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DeskTimeDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day');
  
  const chartData = {
    day: generateDayData(),
    week: generateWeekData(),
    month: generateMonthData(),
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">My DeskTime</h1>
        <div className="flex items-center gap-4">
          <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
          <div className="flex gap-2">
            {['day', 'week', 'month'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded capitalize ${
                  view === viewType
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Arrival time" value="05:17" />
        <MetricCard title="Left time" value="18:35" />
        <MetricCard title="Productive time" value="5" subvalue="h 20m" />
        <MetricCard title="Desktime time" value="8" subvalue="h 3m" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Time at work" value="13" subvalue="h 18m" />
        <MetricCard title="Place in team/company" value="2" subvalue="nd" />
        <MetricCard 
          title="Effectiveness" 
          value="66.71%" 
          color="text-red-400"
        />
        <MetricCard 
          title="Productivity" 
          value="66.27%" 
          color="text-red-400"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-gray-600 text-sm mb-4">
          Productivity {view} view
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData[view]} stackOffset="expand">
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="productive" stackId="a" fill="#4ade80" name="Productive" />
              <Bar dataKey="neutral" stackId="a" fill="#e5e7eb" name="Neutral" />
              <Bar dataKey="unproductive" stackId="a" fill="#fca5a5" name="Unproductive" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DeskTimeDashboard;
