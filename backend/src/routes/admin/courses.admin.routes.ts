import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { requireCurator } from '../../middleware/adminAuth';
import * as coursesController from '../../controllers/admin/courses.admin.controller';

const router = Router();
router.use(authenticate, requireCurator);

router.get('/', coursesController.getAllCourses);
router.post('/:id/flag', coursesController.flagCourse);
router.delete('/:id', coursesController.deleteCourse);

export default router;
