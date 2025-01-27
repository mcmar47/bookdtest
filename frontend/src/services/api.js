import axios from 'axios';

const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'  // ✅ Local development
    : 'https://bookdtest.onrender.com';  // ✅ Deployed on Render
	
console.log("🛠 API URL:", API_URL); 

export { API_URL }; 

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/registration/`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/auth/login/`, credentials);
};


export const getVenues = async () => {
  return axios.get(`${API_URL}/venues/`);
};

export const getVenueDetail = async (id) => {
  return axios.get(`${API_URL}/venues/${id}/`);
};

export const requestBooking = async (venueId, data) => {
  return axios.post(`${API_URL}/bookings/`, {
    venue: venueId,
    date: data.date,
    message: data.message
  });
};

export const getMessages = async () => {
  return axios.get(`${API_URL}/messages/`);
};

export const sendMessageApi = async (msg) => {
  return axios.post(`${API_URL}/messages/`, msg);
};

export const addVenue = async (venueData) => {
  try {
    const response = await axios.post(`${API_URL}/venues/`, venueData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateVenue = async (id, venueData) => {
  // PUT /venues/:id/ to update an existing venue
  return axios.put(`${API_URL}/venues/${id}/`, venueData);
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/user/`, {
      headers: {
        Authorization: `Token ${token}`,  // ✅ Fix: Ensure token is included
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};