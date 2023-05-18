// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4003/login', {
        username,
        password,
      });

      // Lógica de autenticação bem-sucedida
      console.log(response.data);
    } catch (error) {
      // Lógica de tratamento de erro
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
