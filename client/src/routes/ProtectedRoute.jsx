import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('user');

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
