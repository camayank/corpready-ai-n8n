import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';
import { createAuditLog, getIpAddress, AuditActions, TargetTypes } from '../../utils/auditLog';

// Get all internships with filters
export const getAllInternships = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '20', search, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { company: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (status === 'pending') where.isApproved = false;
    if (status === 'approved') where.isApproved = true;

    const [internships, total] = await Promise.all([
      prisma.internship.findMany({ where, skip, take: limitNum, orderBy: { [sortBy as string]: sortOrder } }),
      prisma.internship.count({ where }),
    ]);

    res.json({ internships, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

// Approve internship
export const approveInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const internship = await prisma.internship.update({
      where: { id },
      data: { isApproved: true, approvedBy: req.user!.id, approvedAt: new Date() },
    });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.INTERNSHIP_APPROVED,
      targetType: TargetTypes.INTERNSHIP,
      targetId: id,
      ipAddress: getIpAddress(req),
    });

    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve internship' });
  }
};

// Reject internship
export const rejectInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const internship = await prisma.internship.update({
      where: { id },
      data: { isApproved: false, rejectionReason: reason },
    });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.INTERNSHIP_REJECTED,
      targetType: TargetTypes.INTERNSHIP,
      targetId: id,
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject internship' });
  }
};

// Create internship
export const createInternship = async (req: AuthRequest, res: Response) => {
  try {
    const internship = await prisma.internship.create({
      data: { ...req.body, postedBy: req.user!.id },
    });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.INTERNSHIP_CREATED,
      targetType: TargetTypes.INTERNSHIP,
      targetId: internship.id,
      ipAddress: getIpAddress(req),
    });

    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create internship' });
  }
};

// Update internship
export const updateInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const internship = await prisma.internship.update({ where: { id }, data: req.body });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.INTERNSHIP_UPDATED,
      targetType: TargetTypes.INTERNSHIP,
      targetId: id,
      ipAddress: getIpAddress(req),
    });

    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update internship' });
  }
};

// Delete internship
export const deleteInternship = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.internship.delete({ where: { id } });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.INTERNSHIP_DELETED,
      targetType: TargetTypes.INTERNSHIP,
      targetId: id,
      ipAddress: getIpAddress(req),
    });

    res.json({ message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete internship' });
  }
};
