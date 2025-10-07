import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import {
  DASHBOARD,
  LOGIN,
  SIGNUP,
  EXPENSE_FORM,
  EXPENSE_LIST,
  HOME,
} from "../constants/routes";

const Login = React.lazy(() => import("../pages/Login/Login"));
const SignUp = React.lazy(() => import("../pages/Signup/Signup"));
const Dashboard = React.lazy(() => import("../components/dashboard/dashboard"));
const ExpenseForm = React.lazy(() =>
  import("../components/expense-form/expenseForm")
);
const ExpenseList = React.lazy(() =>
  import("../components/expense-list/expenseList")
);

// Helper to wrap element with a route guard
const withRouteGuard = (element, isProtected = true) => {
  return isProtected ? (
    <ProtectedRoute>{element}</ProtectedRoute>
  ) : (
    <PublicRoute>{element}</PublicRoute>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path={HOME}
          element={withRouteGuard(<Navigate to={DASHBOARD} replace />)}
        />
        <Route path={LOGIN} element={withRouteGuard(<Login />, false)} />
        <Route path={SIGNUP} element={withRouteGuard(<SignUp />, false)} />
        <Route path={DASHBOARD} element={withRouteGuard(<Dashboard />)} />
        <Route path={EXPENSE_FORM} element={withRouteGuard(<ExpenseForm />)} />
        <Route path={EXPENSE_LIST} element={withRouteGuard(<ExpenseList />)} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
