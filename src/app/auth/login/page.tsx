'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!form.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // On success, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Side - Logo Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cyan-700 to-emerald-600 items-center justify-center p-8">
        <div className="text-center">
          <img src="/holaio.png" alt="Holaio Logo" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl text-gray-800 mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white p-2 rounded-md transition duration-200 bg-gradient-to-r from-cyan-700 to-emerald-600 hover:from-cyan-800 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/register" className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
