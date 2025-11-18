import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:id', authenticate, quizController.getQuiz);
router.get('/:id/attempts', authenticate, quizController.getQuizAttempts);
router.post('/:id/submit', authenticate, quizController.submitQuiz);
router.get('/:id/can-take', authenticate, quizController.canTakeQuiz);

export default router;
