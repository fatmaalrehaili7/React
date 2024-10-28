import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const isSignedIn = localStorage.getItem("isSignedIn") === "true"; 

  return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
