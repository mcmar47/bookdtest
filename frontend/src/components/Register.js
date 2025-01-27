import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password1: '', password2: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Sending Registration Data:", JSON.stringify(formData, null, 2));

    try {
      const response = await axios.post({API_URL}, formData);
      console.log("✅ Registration Success:", response.data);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      alert(`⚠️ Failed to register: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <input type="password" name="password1" placeholder="Password" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required className="p-2 border rounded w-full mb-3" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;
