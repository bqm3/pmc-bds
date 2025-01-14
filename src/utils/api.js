// src/api.js
import axios from 'axios';

// Base URL for the API (replace with your actual API endpoint)
const BASE_URL = 'https://api.pmcweb.vn/'; // replace with your API URL

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the Authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Login API
export const login = async (username, password) => {
  const response = await api.post('api/v1/user/login', { UserName: username, Password: password });
  return response.data; // Expecting the server to return { accessToken: '...' }
};

// Token validation API
export const validateToken = async () => {
  const response = await api.get('api/v1/validate-token');
  return response.data; // Expecting the server to return user data or validation status
};

export default api;
