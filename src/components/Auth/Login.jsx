// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Импорт хука useUser
import './Auth.css'; // Импорт файла Auth.css
var API_BASE_URL = ""

if (import.meta.env.MODE === 'development') {
  API_BASE_URL = 'http://localhost:3001';
} else {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL
}
console.log('API Base URL:', API_BASE_URL); // Выводит разные значения в зависимости от среды

console.log(import.meta.env);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useUser(); // Доступ к функции входа из контекста
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}/users`);
      console.log(response.url);
      
      const users = await response.json();
  
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        login(foundUser); // Устанавливает пользователя и isAuthenticated
        setSuccess('Вход выполнен успешно!');
        navigate('/projects'); // Перенаправление после входа
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (err) {
      setError('Не удалось получить данные пользователей. Пожалуйста, попробуйте позже.');
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Вход</h2>
        <form onSubmit={onLogin}>
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
          <button type="submit">Войти</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Нет учетной записи? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
