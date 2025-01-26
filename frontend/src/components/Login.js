import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/login/';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      localStorage.setItem('authToken', response.data.key);
      alert('Login successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      alert('Failed to log in. Check console for details.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
