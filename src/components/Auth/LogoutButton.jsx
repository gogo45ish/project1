// src/components/Auth/LogoutButton.jsx
import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the Auth.css file
var API_BASE_URL = ""

if (import.meta.env.MODE === 'development') {
  API_BASE_URL = 'http://localhost:3001';
} else {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL
}
console.log('API Base URL:', API_BASE_URL); // This will show different values based on your environment


const LogoutButton = () => {
  const { logout } = useUser(); // Get the logout function from the context
  const navigate = useNavigate();

  const handleLogout = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      await fetch(`${API_BASE_URL}/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAuthenticated: false }),
      });
    }

    logout(); // Clear the user context
    localStorage.removeItem('currentUser'); // Clear user info from local storage
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;
