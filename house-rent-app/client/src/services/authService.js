import axios from 'axios';

const API_URL = 'https://house-rent-app-s6kb.onrender.com/api/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// Get user profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'profile', config);
  return response.data;
};

const authService = {
  register,
  login,
  getProfile,
};

export default authService;
