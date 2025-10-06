import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Authenticator'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
