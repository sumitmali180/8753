import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('https://userauth-4478f-default-rtdb.firebaseio.com/users.json');

      if (!response.ok) {
        setError('Failed to connect to the server.');
        return;
      }

      const data = await response.json();

      const user = Object.values(data).find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/dashboard');  
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && (
            <div className="text-sm text-red-500 mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
