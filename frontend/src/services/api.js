import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Добавляем завершающий слэш к URL, если его нет
  if (!config.url.endsWith('/')) {
    config.url = `${config.url}/`;
  }
  const token = localStorage.getItem('access_token');
  console.log('Request URL:', config.url);
  console.log('Request Method:', config.method);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Sending request with token:', token.substring(0, 20) + '...');
  } else {
    console.log('No token found in localStorage for request:', config.url);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Response error:', error.response?.status, error.response?.data, 'URL:', originalRequest.url);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          console.log('Attempting to refresh token');
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            token: refreshToken,
          });
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          console.log('Retrying request with new token:', access_token.substring(0, 20) + '...');
          // Добавляем слэш к URL при повторном запросе
          if (!originalRequest.url.endsWith('/')) {
            originalRequest.url = `${originalRequest.url}/`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError.response?.data || refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/signin';
        }
      } else {
        console.log('No refresh token found, redirecting to /signin');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;