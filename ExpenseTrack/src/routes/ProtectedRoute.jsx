import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Authenticator';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuth();
  const location = useLocation();

  // ✅ Always re-check token on navigation
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
