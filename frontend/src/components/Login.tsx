import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  access_token: string;
}

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/deposits');
    } catch (err) {
      console.error('Login failed:', err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        alert(`Login failed: ${axiosError.response?.data?.message || axiosError.message}`);
      } else {
        alert('Login failed. An unexpected error occurred.');
      }
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login; 