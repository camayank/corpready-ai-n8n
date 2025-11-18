import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../utils/db';
import { Response } from 'express';

const router = Router();

router.get('/stats', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const [coursesEnrolled, certificatesEarned, totalWatchTime, streakDays] = await Promise.all([
      prisma.courseProgress.count({ where: { userId: req.userId } }),
      prisma.certificate.count({ where: { userId: req.userId } }),
      prisma.videoProgress.aggregate({
        where: { userId: req.userId },
        _sum: { watchedDuration: true },
      }),
      // Simple streak calculation - days with activity
      prisma.videoProgress.findMany({
        where: { userId: req.userId },
        select: { lastWatchedAt: true },
        orderBy: { lastWatchedAt: 'desc' },
        take: 30,
      }),
    ]);

    const stats = {
      coursesEnrolled,
      certificatesEarned,
      totalWatchTime: Math.round((totalWatchTime._sum.watchedDuration || 0) / 60), // in minutes
      streakDays: streakDays.length,
      xpPoints: coursesEnrolled * 100 + certificatesEarned * 500,
      badges: [],
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

router.get('/recommendations', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    const [courses, internships] = await Promise.all([
      prisma.course.findMany({
        where: user?.areaOfStudy ? { domain: { contains: user.areaOfStudy } } : {},
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.internship.findMany({
        where: { isActive: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({ courses, internships });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

export default router;
