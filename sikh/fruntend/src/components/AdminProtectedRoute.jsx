import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ user, children }) => {
  // Check if user is logged in and is an admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />; // redirect non-admins to home
  }

  return children;
};

export default AdminProtectedRoute;
