import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api', // Убедись, что REACT_APP_API_URL задан в .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Можно добавить интерцепторы для токена авторизации
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient; 