// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Импорт файла Auth.css
var API_BASE_URL = ""

if (import.meta.env.MODE === 'development') {
  API_BASE_URL = 'http://localhost:3001';
} else {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL
}
console.log('API Base URL:', API_BASE_URL); // Это покажет разные значения в зависимости от вашей среды


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const onRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Оба поля обязательны для заполнения.');
      return;
    }

    const newUser = {
      username,
      password,
      isAuthenticated: false,
    };

    // POST-запрос к endpoint /users
    await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    setSuccess('Регистрация прошла успешно!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Регистрация</h2>
        <form onSubmit={onRegister}>
          <div>
            <label>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="auth-message auth-message--error">{error}</p>}
          {success && <p className="auth-message auth-message--success">{success}</p>}
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
