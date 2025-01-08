import axios from "axios";

// URL base de la API
const BASE_URL = "https://tesis-backend-xro2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Tiempo de espera para las solicitudes
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
