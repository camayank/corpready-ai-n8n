import { Router } from 'express';
import * as internshipController from '../controllers/internship.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, internshipController.getInternships);
router.get('/recommended', authenticate, internshipController.getRecommendedInternships);
router.get('/saved', authenticate, internshipController.getSavedInternships);
router.post('/save', authenticate, internshipController.saveInternship);
router.delete('/save/:id', authenticate, internshipController.unsaveInternship);
router.get('/applications', authenticate, internshipController.getApplications);
router.post('/apply', authenticate, internshipController.applyToInternship);
router.get('/:id', authenticate, internshipController.getInternship);

export default router;
