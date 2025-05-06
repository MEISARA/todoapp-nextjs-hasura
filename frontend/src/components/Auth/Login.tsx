import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import clientNoAuth from '../../lib/apolloClientNoAuth'
import { LOGIN_USER } from '../../graphql/mutations/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loginUser, { loading }] = useMutation(LOGIN_USER, { client: clientNoAuth });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data?.login?.accessToken) {
        localStorage.setItem('token', data.login.accessToken);
        router.push('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-6">
        <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0z"/>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer transition duration-200">
            {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center text-sm mt-4">Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
    </div>
  );
};

export default Login;