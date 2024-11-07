// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';


const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useUser();
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
