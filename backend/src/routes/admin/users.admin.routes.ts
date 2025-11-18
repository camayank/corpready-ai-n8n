import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/adminAuth';
import * as usersAdminController from '../../controllers/admin/users.admin.controller';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate, requireAdmin);

// Get all users (with pagination and filters)
router.get('/', usersAdminController.getAllUsers);

// Get single user
router.get('/:id', usersAdminController.getUserById);

// Update user
router.patch('/:id', usersAdminController.updateUser);

// Change user role
router.post('/:id/change-role', usersAdminController.changeUserRole);

// Toggle user active status
router.post('/:id/toggle-active', usersAdminController.toggleUserActive);

// Impersonate user
router.post('/:id/impersonate', usersAdminController.impersonateUser);

// Delete user (soft delete)
router.delete('/:id', usersAdminController.deleteUser);

// Export user data
router.get('/:id/export-data', usersAdminController.exportUserData);

export default router;
