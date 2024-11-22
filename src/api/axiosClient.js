import axios from 'axios';
import { API_BASE_URL } from '../config/base_url.js';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

// Request interceptor to insert auth token if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }

    return res;
  },
  (error) => {
    if(error.response?.data)
      throw error.response.data;
    else { 
      const newError = {
        message: "Server Error"
      }
      throw newError
    }
  }
);

export default axiosClient;
