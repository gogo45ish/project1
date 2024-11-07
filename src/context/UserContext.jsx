import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
var API_BASE_URL = ""

if (import.meta.env.MODE === 'development') {
  API_BASE_URL = 'http://localhost:3001';
} else {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL
}
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  


  useEffect(() => {
    // Sync isAuthenticated with the presence of a user
    setIsAuthenticated(!!user);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
