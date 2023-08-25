import React, { useState } from 'react';
import axios from 'axios';

interface RegisterProps {
  setUser: (user: any) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: refactor
  const HOST = 'http://localhost:8080/api'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axios({
        method: 'POST',
        url: `${HOST}/register`,
        data: { email, password }
      });
      
      setUser(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
