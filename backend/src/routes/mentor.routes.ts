import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import prisma from '../utils/db';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany({
      include: {
        timeSlots: {
          where: { isBooked: false },
          take: 5,
        },
      },
    });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await prisma.mentor.findUnique({
      where: { id },
      include: {
        timeSlots: {
          where: { isBooked: false },
        },
      },
    });

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor' });
  }
});

export default router;
