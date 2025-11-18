import { Router } from 'express';
import * as courseController from '../controllers/course.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/generate', authenticate, courseController.generateCourse);
router.get('/my-courses', authenticate, courseController.getMyCourses);
router.get('/recommended', authenticate, courseController.getRecommendedCourses);
router.get('/:id', authenticate, courseController.getCourse);
router.get('/:id/progress', authenticate, courseController.getCourseProgress);

export default router;
