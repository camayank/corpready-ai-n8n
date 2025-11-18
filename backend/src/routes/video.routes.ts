import { Router } from 'express';
import * as videoController from '../controllers/video.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:id/progress', authenticate, videoController.getVideoProgress);
router.post('/:id/progress', authenticate, videoController.updateVideoProgress);
router.get('/:id/notes', authenticate, videoController.getVideoNotes);
router.post('/:id/notes', authenticate, videoController.createVideoNote);

export default router;
