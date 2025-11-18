import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/generate', authenticate, async (req, res) => {
  try {
    const { domain, answers } = req.body;

    // AI topic generation would go here
    // For now, return sample topics
    const topics = [
      { id: '1', name: `${domain} Fundamentals`, description: 'Core concepts' },
      { id: '2', name: `Advanced ${domain}`, description: 'Advanced topics' },
    ];

    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate topics' });
  }
});

export default router;
