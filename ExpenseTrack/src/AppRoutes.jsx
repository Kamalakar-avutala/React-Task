import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/login/signIn';
import SignUp from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;