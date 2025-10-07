import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ExpenseForm from '../components/expense-form/expenseForm';
import ExpenseList from '../components/expense-list/expenseList';
import ProtectedRoute from './ProtectedRoute';

const Login = React.lazy(() => import('../pages/Login/Login'));
const SignUp = React.lazy(() => import('../pages/Signup/Signup'));
const Dashboard = React.lazy(() => import('../components/dashboard/dashboard'));

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/logout"
          element={
            <PublicRoute>
              <Navigate to="/dashboard" replace />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

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
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
