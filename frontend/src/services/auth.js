import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    localStorage.setItem('authToken', response.data.key);
    return response.data;
};

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/registration/`, userData);
};

export const logoutUser = async () => {
    localStorage.removeItem('authToken');
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    return axios.get(`${API_URL}/user/`, {
        headers: { Authorization: `Token ${token}` },
    });
};