'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // redirect on success
      router.push('/auth/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Logo Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cyan-700 to-emerald-600 items-center justify-center p-8">
        <div className="text-center">
          <img src="/holaio.png" alt="Holaio Logo" />
        </div>
      </div>

      {/* Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl text-gray-800 mb-6 text-center">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'company', 'mobile', 'email', 'password'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field === 'mobile' ? 'Mobile' : field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  name={field}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  placeholder={`Enter your ${field}`}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  required={field === 'firstName' || field === 'lastName' || field === 'email' || field === 'password'}
                  disabled={loading}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full text-white p-2 rounded-md transition duration-200 bg-gradient-to-r from-cyan-700 to-emerald-600 hover:from-cyan-800 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
