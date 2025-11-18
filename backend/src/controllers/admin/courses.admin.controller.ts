import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import prisma from '../../utils/db';
import { createAuditLog, getIpAddress, AuditActions, TargetTypes } from '../../utils/auditLog';

// Get all courses with filters
export const getAllCourses = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '20', search, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { domain: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status;

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy as string]: sortOrder },
        include: { modules: { include: { videos: true } }, _count: { select: { courseProgress: true } } },
      }),
      prisma.course.count({ where }),
    ]);

    res.json({ courses, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Flag course
export const flagCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const course = await prisma.course.update({ where: { id }, data: { status: 'flagged' } });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.COURSE_FLAGGED,
      targetType: TargetTypes.COURSE,
      targetId: id,
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to flag course' });
  }
};

// Delete course
export const deleteCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });

    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.COURSE_DELETED,
      targetType: TargetTypes.COURSE,
      targetId: id,
      ipAddress: getIpAddress(req),
    });

    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
