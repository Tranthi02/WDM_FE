import { Navigate } from 'react-router-dom';

const RequireAuth = (p) => {
  const { children } = p
  const token = localStorage.getItem('token');

  if (!token) {
      // If the user is not authenticated, redirect to the login page
      return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;