import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/admin';

interface AdminGuardProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

export const AdminGuard = ({ allowedRoles, children }: AdminGuardProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.role as UserRole;

  // If no specific roles are specified, check if user has any admin role
  if (!allowedRoles) {
    const adminRoles = [UserRole.ADMIN, UserRole.CURATOR, UserRole.OPS, UserRole.PARTNER];
    if (!adminRoles.includes(userRole)) {
      return <Navigate to="/app" replace />;
    }
  } else {
    // Check if user has one of the allowed roles
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/app" replace />;
    }
  }

  // Check if user is active
  if (user.isActive === false) {
    return <Navigate to="/app" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
