// Email Verification Guard - Ensures user has verified their email

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface EmailVerifiedGuardProps {
  children: React.ReactNode;
}

export const EmailVerifiedGuard: React.FC<EmailVerifiedGuardProps> = ({ children }) => {
  const { user } = useAuth();

  if (user && !user.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};
