import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/adminAuth';
import * as internshipsController from '../../controllers/admin/internships.admin.controller';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/', internshipsController.getAllInternships);
router.post('/', internshipsController.createInternship);
router.patch('/:id', internshipsController.updateInternship);
router.delete('/:id', internshipsController.deleteInternship);
router.post('/:id/approve', internshipsController.approveInternship);
router.post('/:id/reject', internshipsController.rejectInternship);

export default router;
