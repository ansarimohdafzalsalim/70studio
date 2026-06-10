import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return <Navigate to="/admin/login" replace />;
      }
    } catch {
      localStorage.removeItem('token');
      return <Navigate to="/admin/login" replace />;
    }
  }
  return token ? children : <Navigate to="/admin/login" replace />;
}
