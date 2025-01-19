import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle,  Home, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">Employee Task</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
            <Link to="/register" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
              <UserCircle size={20} />
              <span>Login</span>
            </Link>
           
          </div>
          <div>
            
          </div>

          <div className="md:hidden flex items-center" onClick={toggleMenu}>
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="flex flex-col space-y-4 px-4 py-2">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600" onClick={toggleMenu}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600" onClick={toggleMenu}>
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
