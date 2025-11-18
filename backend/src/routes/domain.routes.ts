import { Router } from 'express';
import prisma from '../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(domains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
});

export default router;
