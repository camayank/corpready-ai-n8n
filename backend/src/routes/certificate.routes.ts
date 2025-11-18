import { Router } from 'express';
import * as certificateController from '../controllers/certificate.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/my-certificates', authenticate, certificateController.getMyCertificates);
router.get('/verify/:code', certificateController.verifyCertificate);
router.get('/:id', authenticate, certificateController.getCertificate);
router.get('/:id/download', authenticate, certificateController.downloadCertificate);

export default router;
