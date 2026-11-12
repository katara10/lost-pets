import axios from 'axios';
import { authService } from './auth';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = authService.getRefreshToken();
        const res = await axios.post('http://127.0.0.1:8000/api/auth/refresh', { refresh_token: refresh });
        authService.saveTokens(res.data.access_token, res.data.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        authService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;