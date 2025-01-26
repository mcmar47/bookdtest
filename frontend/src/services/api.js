import axios from 'axios';

// Change this to match your Django backend URL
const API_URL = 'http://localhost:8000/api';

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
