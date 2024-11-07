// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Import the useUser hook
import './Auth.css'; // Import the Auth.css file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('API Base URL:', API_BASE_URL); // This will show different values based on your environment

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useUser(); // Access the login function from context
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const users = await response.json();
  
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (foundUser) {
        login(foundUser); // Sets the user and isAuthenticated
        setSuccess('Login successful!');
        navigate('/projects'); // Redirect after login
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={onLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="auth-message auth-message--error">{error}</p>}
          {success && <p className="auth-message auth-message--success">{success}</p>}
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
