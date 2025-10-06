import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ExpenseForm from '../components/expense-form/expenseForm';
import ExpenseList from '../components/expense-list/expenseList';

import ProtectedRoute from './ProtectedRoute'; 

const Login = React.lazy(() => import('../pages/Login/Login'));
const SignUp = React.lazy(() => import('../pages/Signup/Signup'));
const Dashboard = React.lazy(() => import('../components/dashboard/dashboard'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expensive-form"
          element={
            <ProtectedRoute>
              <ExpenseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expensive-list"
          element={
            <ProtectedRoute>
              <ExpenseList />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback (optional): redirect unknown paths to /dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;