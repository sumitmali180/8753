import { useState, useEffect, useRef } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const inputRefs = useRef([]);
  inputRefs.current = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in with' : 'Registering with', formData);
    // Add logic for login/register
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      if (index === inputRefs.current.length - 1) {
        handleSubmit(e); // Submit when Enter is pressed on last field
      } else {
        inputRefs.current[index + 1]?.focus(); // Focus next input field
      }
    }
  };

  const handleToggleForm = () => {
    setIsLogin((prev) => {
      const newIsLogin = !prev;
      if (newIsLogin) {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
      return newIsLogin;
    });
  };

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus the first input on load
  }, [isLogin]);

  return (
    <div className="max-w-sm mx-auto mt-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              ref={(el) => inputRefs.current[0] = el}
              className="pl-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            ref={(el) => inputRefs.current[1] = el}
            className="pl-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            ref={(el) => inputRefs.current[2] = el}
            className="pl-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              ref={(el) => inputRefs.current[3] = el}
              className="pl-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={handleToggleForm}
          className="text-indigo-600 hover:text-indigo-700 focus:outline-none"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
