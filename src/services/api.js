// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: false,
});

// interceptor to add token when present
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
