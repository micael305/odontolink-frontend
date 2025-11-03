import axios from 'axios';
import { useAuthStore } from '../context/authStore';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
});

/**
 * Interceptor de Axios:
 * Se ejecuta ANTES de cada petición.
 * Toma el token del store de Zustand y lo inyecta
 * en la cabecera 'Authorization'.
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
