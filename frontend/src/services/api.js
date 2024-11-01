import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL del backend
  withCredentials: true,
});

export default api;
