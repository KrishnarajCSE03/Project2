import axios from 'axios';

const API = axios.create({
  baseURL: '  https://5c00339189c4.ngrok-free.app/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
