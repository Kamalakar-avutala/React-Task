import React from "react";
import { Navigate } from "react-router-dom";
import { DASHBOARD } from "../constants/routes";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (isAuthenticated) {
    return <Navigate to={DASHBOARD} replace />;
  }
  return children;
};

export default PublicRoute;
