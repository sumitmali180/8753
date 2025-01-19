import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-semibold p-4 border-b border-gray-700">
        DeskTime
      </h2>
      <ul className="flex-1">
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/dashboard" className="block">Dashboard</Link>
        </li>
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/taskform" className="block">Add Task</Link>
        </li>
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/TeamMembersDashboard" className="block">Team Members</Link>
        </li>
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/colleagues" className="block">Colleagues</Link>
        </li>
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/taskform" className="block">Projects</Link>
        </li>
        <li className="p-4 text-sm hover:bg-gray-700 transition-colors cursor-pointer">
          <Link to="/WorkScheduleDashboard" className="block">Work Schedules</Link>
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;




