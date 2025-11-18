import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

export const getMyCertificates = async (req: AuthRequest, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      where: { userId: req.userId },
      orderBy: { issuedAt: 'desc' },
    });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};

export const getCertificate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
};

export const verifyCertificate = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { certificateCode: code },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found', valid: false });
    }

    res.json({
      valid: true,
      certificate,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify certificate' });
  }
};

export const downloadCertificate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        user: true,
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // TODO: Generate PDF certificate
    res.json({ message: 'PDF generation not yet implemented', certificate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download certificate' });
  }
};
