import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/Api';

export default function Register() {
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post(`${api}/register`, form);

      const token = res.data.token;
      localStorage.setItem('authToken', token);

      console.log('User registered:', res.data);
      navigate('/'); 
    } catch (error) {
      console.error('Registration error:', error);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Sign Up</legend>

            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Sign Up
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                Something went wrong!
              </p>
            )}
          </fieldset>
        </form>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-sky-500">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
