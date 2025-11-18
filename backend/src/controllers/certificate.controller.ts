import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';
import { generateCertificatePDF } from '../utils/pdf';
import fs from 'fs';

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

    // Generate PDF certificate
    const pdfPath = await generateCertificatePDF({
      id: certificate.id,
      userName: certificate.user.name,
      courseName: certificate.courseName,
      completionDate: certificate.issuedAt,
      certificateCode: certificate.certificateCode,
    });

    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(500).json({ error: 'Failed to generate certificate PDF' });
    }

    // Send file
    res.download(pdfPath, `${certificate.courseName}-Certificate.pdf`, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Failed to download certificate' });
      }
    });
  } catch (error) {
    console.error('Certificate download error:', error);
    res.status(500).json({ error: 'Failed to download certificate' });
  }
};
