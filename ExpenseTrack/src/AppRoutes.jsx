import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login/Login'));
const SignUp = React.lazy(() => import('./pages/Signup/Signup'));
const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;