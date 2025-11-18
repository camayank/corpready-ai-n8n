import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { UserRole } from '@prisma/client';

export const requireRole = (allowedRoles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRole = req.user.role as UserRole;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: allowedRoles,
          current: userRole,
        });
      }

      // Check if user account is active
      if (!req.user.isActive) {
        return res.status(403).json({ error: 'Account is deactivated' });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({ error: 'Authorization failed' });
    }
  };
};

// Convenience middleware for common roles
export const requireAdmin = requireRole([UserRole.ADMIN]);
export const requireCurator = requireRole([UserRole.ADMIN, UserRole.CURATOR]);
export const requireOps = requireRole([UserRole.ADMIN, UserRole.OPS]);
export const requirePartner = requireRole([UserRole.ADMIN, UserRole.PARTNER]);

// Middleware to check for any admin-level access
export const requireAnyAdmin = requireRole([
  UserRole.ADMIN,
  UserRole.CURATOR,
  UserRole.OPS,
  UserRole.PARTNER,
]);
