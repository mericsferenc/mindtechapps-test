import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  setUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: refactor
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      setUser(response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
