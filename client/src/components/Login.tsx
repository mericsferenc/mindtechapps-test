import React, { useState } from 'react';
import useLogin from '../api/backend/authHooks/useLogin';

const Login: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
