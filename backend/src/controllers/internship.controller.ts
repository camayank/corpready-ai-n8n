import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

export const getInternships = async (req: AuthRequest, res: Response) => {
  try {
    const { location, skills, company } = req.query;

    const where: any = { isActive: true };
    if (location) where.location = { contains: location as string };
    if (company) where.company = { contains: company as string };

    const internships = await prisma.internship.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

export const getInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const internship = await prisma.internship.findUnique({
      where: { id },
    });

    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internship' });
  }
};

export const getRecommendedInternships = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    const internships = await prisma.internship.findMany({
      where: { isActive: true },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommended internships' });
  }
};

export const getSavedInternships = async (req: AuthRequest, res: Response) => {
  try {
    const saved = await prisma.savedInternship.findMany({
      where: { userId: req.userId },
      include: {
        internship: true,
      },
      orderBy: { savedAt: 'desc' },
    });

    res.json(saved.map((s) => s.internship));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch saved internships' });
  }
};

export const saveInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { internshipId } = req.body;

    const saved = await prisma.savedInternship.create({
      data: {
        userId: req.userId!,
        internshipId,
      },
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save internship' });
  }
};

export const unsaveInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.savedInternship.deleteMany({
      where: {
        internshipId: id,
        userId: req.userId,
      },
    });

    res.json({ message: 'Internship unsaved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unsave internship' });
  }
};

export const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.internshipApplication.findMany({
      where: { userId: req.userId },
      include: {
        internship: true,
      },
      orderBy: { appliedAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const applyToInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { internshipId } = req.body;

    const application = await prisma.internshipApplication.create({
      data: {
        userId: req.userId!,
        internshipId,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply to internship' });
  }
};
