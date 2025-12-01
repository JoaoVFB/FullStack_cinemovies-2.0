import axios from 'axios';

const API_BASE_URL = "http://localhost:3001/api"; // URL base do backend

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
