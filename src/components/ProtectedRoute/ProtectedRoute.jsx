import { useAuthStore } from '../../context/authStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ¿Tiene el rol permitido para ver la página?
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Solo si esta loguado y tiene el rol permitido mostramos la pagina
  return <Outlet />;
};

export default ProtectedRoute;