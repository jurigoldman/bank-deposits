import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Импортируй apiClient
import { AxiosError } from 'axios'; // Оставь для типизации ошибок

interface LoginResponse {
  access_token: string;
  user: { email: string; role: string }; // Добавь user, так как бэкенд возвращает его
}

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Добавь состояние загрузки
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    setLoading(true); // Начало загрузки
    try {
      console.log('Sending login request to:', `${apiClient.defaults.baseURL}/auth/login`);
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      console.log('Login response:', response.data); // Для отладки
      localStorage.setItem('token', response.data.access_token);
      navigate('/deposits');
    } catch (err) {
      console.error('Login failed:', err);
      if (err instanceof AxiosError) { // Измени проверку на instanceof
        const axiosError = err as AxiosError<{ message?: string }>;
        const errorMessage = axiosError.response?.data?.message || axiosError.message;
        alert(`Login failed: ${errorMessage}`);
      } else {
        alert('Login failed. An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Завершение загрузки
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        disabled={loading} // Отключи поле во время загрузки
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        disabled={loading} // Отключи поле во время загрузки
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Loading...' : 'Login'} {/* Показывай статус загрузки */}
      </button>
    </div>
  );
};

export default Login;