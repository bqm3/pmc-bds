// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
