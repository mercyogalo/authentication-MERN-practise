import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/Api';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post(`${api}/login`, form);
      const token = res.data.token;
      localStorage.setItem('authToken', token);

      console.log('User logged in:', res.data);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

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
              Login
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                Invalid email or password
              </p>
            )}
          </fieldset>
        </form>

        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-sky-500">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
