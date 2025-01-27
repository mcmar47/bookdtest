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
  return axios.get(`${API_URL}/api/venues/`);
};

export const getVenueDetail = async (id) => {
  return axios.get(`${API_URL}/api/venues/${id}/`);
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
    const response = await axios.post(`${API_URL}/api/venues/`, venueData);
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

export const getEvents = async (venueId) => {
  return fetch(`${API_URL}/api/events/?venueId=${venueId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
};


// Add a new event to the server

export const addEvent = async (eventData) => {
  console.log("API_URL in addEvent:", API_URL); // ✅ Debugging log
  console.log("Event Data Before Fix:", eventData); // ✅ Log eventData before sending

  // Fix: Use `start` as `date` if `date` is missing
  const fixedEventData = {
    title: eventData.title || "Untitled Event",
    date: eventData.date || eventData.start,  // ✅ Use `start` as fallback for `date`
    time: eventData.time || "00:00:00",  // Default time to midnight if not provided
    venue: eventData.venueId,  // ✅ Ensure 'venue' field is included
    description: eventData.description || "",  // Optional field
  };

  // Validate that date exists
  if (!fixedEventData.date) {
    console.error("❌ Still Missing 'date' field after fix:", fixedEventData);
    return Promise.reject({ error: "Date is required." });
  }

  console.log("Event Data After Fix:", fixedEventData); // ✅ Debugging log after fix

  return fetch(`${API_URL}/api/events/`, {  // ✅ Ensure trailing slash
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fixedEventData),
  }).then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  }).catch(error => console.error("❌ Error adding event:", error));
};
