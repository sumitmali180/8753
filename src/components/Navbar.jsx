import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Image */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="https://i.ibb.co/QdPqJWd/download-1.png" alt="Logo" className="h-12 w-auto" />
        <Link to="/" className="flex items-center space-x-2">
        <img src="https://i.ibb.co/qmB3pQB/download-2-2.png" alt="Logoname" className="h-8 w-auto" />
      </Link>
      </Link>

      {/* Logo Name */}
      

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4">
            <NavLink icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" to="/" />
            <NavLink icon={<ClipboardDocumentListIcon className="h-5 w-5" />} text="Task Log" to="/task-log" />
            <NavLink icon={<ChartBarIcon className="h-5 w-5" />} text="Analytics" to="/analytics" />
            <NavLink icon={<UserCircleIcon className="h-5 w-5" />} text="Profile" to="/profile" />
            <NavLink icon={<UserCircleIcon className="h-5 w-5" />} text="Register" to="/register" />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="flex flex-col space-y-4 py-4">
          <NavLink icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" to="/" />
          <NavLink icon={<ClipboardDocumentListIcon className="h-5 w-5" />} text="Task Log" to="/task-log" />
          <NavLink icon={<ChartBarIcon className="h-5 w-5" />} text="Analytics" to="/analytics" />
          <NavLink icon={<UserCircleIcon className="h-5 w-5" />} text="Profile" to="/profile" />
          <NavLink icon={<UserCircleIcon className="h-5 w-5" />} text="Register" to="/register" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to = "/", icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;
