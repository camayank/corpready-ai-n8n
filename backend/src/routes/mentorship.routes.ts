import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../utils/db';
import { Response } from 'express';

const router = Router();

router.post('/book', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { mentorId, sessionDate, duration, topic } = req.body;

    const booking = await prisma.mentorshipBooking.create({
      data: {
        userId: req.userId!,
        mentorId,
        sessionDate: new Date(sessionDate),
        duration,
        topic,
        meetingLink: `https://meet.skillpath.in/${Date.now()}`,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book mentorship session' });
  }
});

router.get('/my-bookings', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.mentorshipBooking.findMany({
      where: { userId: req.userId },
      include: {
        mentor: true,
      },
      orderBy: { sessionDate: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.delete('/bookings/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.mentorshipBooking.deleteMany({
      where: {
        id,
        userId: req.userId,
      },
    });

    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router;
