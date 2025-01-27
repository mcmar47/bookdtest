import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken'); // ✅ Get token from localStorage
        if (!token) {
          console.error("❌ No auth token found.");
          return;
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Token ${token}` }  // ✅ Include Token in Headers
        });

        setUser(response.data);
      } catch (error) {
        console.error("❌ Profile Fetch Error:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>⚠️ Not logged in. Please log in.</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
