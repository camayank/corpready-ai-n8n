import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        gender: true,
        areaOfStudy: true,
        graduationYear: true,
        isEmailVerified: true,
        isOnboardingComplete: true,
        consentGiven: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, gender, areaOfStudy, graduationYear } = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(gender && { gender }),
        ...(areaOfStudy && { areaOfStudy }),
        ...(graduationYear && { graduationYear }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        gender: true,
        areaOfStudy: true,
        graduationYear: true,
        isEmailVerified: true,
        isOnboardingComplete: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  try {
    const { phone, gender, areaOfStudy, graduationYear, consentGiven } = req.body;

    if (!consentGiven) {
      return res.status(400).json({ error: 'Consent is required' });
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        phone,
        gender,
        areaOfStudy,
        graduationYear,
        consentGiven,
        isOnboardingComplete: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        gender: true,
        areaOfStudy: true,
        graduationYear: true,
        isEmailVerified: true,
        isOnboardingComplete: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
};
