import { Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import TaskForm from './page/TaskForm';
import Home from './page/Home';
import Task from './page/Task';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Sidebar from './Components/sidebar';
import TeamMembersDashboard from './page/TeamMembersDashboard';
import AddWorkSchedule from './page/AddWorkSchedule';
import WorkScheduleDashboard from './page/WorkScheduleDashboard';
import Register from './Components/Register';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-800 z-10">
        <Navbar />
      </div>

      <div className="flex flex-1 mt-16"> 
        <div className="fixed left-0 top-16 w-64 bg-gray-800 text-white hidden md:block z-20">
          <Sidebar />
        </div>
       
        {/* Main Content */}
        <div className="flex-1 ml-64 p-4 bg-gray-100 overflow-auto"> 
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<Task />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/taskform" element={<TaskForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/TeamMembersDashboard" element={<TeamMembersDashboard />} />
            <Route path="/WorkScheduleDashboard" element={<WorkScheduleDashboard />} />
            <Route path="/WorkSchedule" element={<AddWorkSchedule />} />

           
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
