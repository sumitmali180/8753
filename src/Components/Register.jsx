import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('https://userauth-4478f-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Registration successful');
      setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'employee' }); // Clear form

      // Redirect to login page after successful registration
      navigate('/login');  // Adjust the path as per your routing setup
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
