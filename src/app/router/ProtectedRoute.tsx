import { Navigate } from 'react-router-dom';
import { authService } from '../../shared/api/auth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};