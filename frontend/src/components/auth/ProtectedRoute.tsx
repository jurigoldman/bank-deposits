import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    // Перенаправляем на страницу входа, если пользователь не аутентифицирован
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Проверяем роль, если она требуется
  if (requiredRole && user?.role !== requiredRole) {
    // Перенаправляем на домашнюю страницу, если у пользователя нет нужной роли
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
