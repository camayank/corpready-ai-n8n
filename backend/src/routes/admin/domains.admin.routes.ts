import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireCurator } from '../../middleware/adminAuth';
import * as domainsController from '../../controllers/admin/domains.admin.controller';

const router = Router();
router.use(authenticate, requireCurator);

router.get('/', domainsController.getAllDomains);
router.post('/', domainsController.createDomain);
router.patch('/:id', domainsController.updateDomain);
router.delete('/:id', domainsController.deleteDomain);
router.post('/topics', domainsController.createTopic);
router.patch('/topics/:id', domainsController.updateTopic);
router.delete('/topics/:id', domainsController.deleteTopic);

export default router;
