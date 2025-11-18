import { Router } from 'express';
import * as youtubeController from '../controllers/youtube.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required for search/preview)
router.get('/search', youtubeController.searchVideos);
router.get('/videos', youtubeController.getVideoDetails);
router.get('/educational', youtubeController.searchEducationalVideos);
router.get('/config', youtubeController.checkConfiguration);

export default router;
