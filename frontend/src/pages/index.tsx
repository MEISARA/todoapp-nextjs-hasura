import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TodoList from '../components/Todo/TodoList';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-[calc(100vh-80px-64px)] flex flex-col justify-center items-center bg-gray-100">

      {!isAuthenticated && (
        <>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
        <p className="mb-8">
          {isAuthenticated
            ? 'You are logged in. Manage your tasks below.'
            : 'Manage your tasks efficiently with our application.'}
        </p>
          <div className="flex space-x-4 mb-8">
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Register
            </Link>
          </div>
        </>
      )}

      {isAuthenticated && (
        <div className="w-full p-6 max-w-2xl">
          <div className="w-full bg-white p-6 rounded shadow">
            <TodoList />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
