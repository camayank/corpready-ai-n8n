import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { prisma } from '../../lib/prisma';
import { createAuditLog, getIpAddress, AuditActions, TargetTypes } from '../../utils/auditLog';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Get all users with pagination and filters
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '20',
      search,
      role,
      isActive,
      isEmailVerified,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (isEmailVerified !== undefined) {
      where.isEmailVerified = isEmailVerified === 'true';
    }

    // Get users
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy as string]: sortOrder },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          isEmailVerified: true,
          isOnboardingComplete: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              courseProgress: true,
              certificates: true,
              internshipApplications: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get single user by ID
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        courseProgress: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                domain: true,
              },
            },
          },
          orderBy: { lastAccessedAt: 'desc' },
          take: 10,
        },
        certificates: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: { issuedAt: 'desc' },
        },
        internshipApplications: {
          include: {
            internship: {
              select: {
                title: true,
                company: true,
              },
            },
          },
          orderBy: { appliedAt: 'desc' },
        },
        _count: {
          select: {
            videoProgress: true,
            quizAttempts: true,
            mentorshipBookings: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove sensitive data
    const { password, refreshToken, passwordResetToken, emailVerificationToken, ...safeUser } = user;

    res.json(safeUser);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update user
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, gender, areaOfStudy, graduationYear, isActive, isEmailVerified } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(gender && { gender }),
        ...(areaOfStudy && { areaOfStudy }),
        ...(graduationYear && { graduationYear }),
        ...(isActive !== undefined && { isActive }),
        ...(isEmailVerified !== undefined && { isEmailVerified }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.USER_UPDATED,
      targetType: TargetTypes.USER,
      targetId: id,
      details: { changes: req.body },
      ipAddress: getIpAddress(req),
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Change user role
export const changeUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role, reason } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.USER_ROLE_CHANGED,
      targetType: TargetTypes.USER,
      targetId: id,
      details: { oldRole: existingUser.role, newRole: role },
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Change role error:', error);
    res.status(500).json({ error: 'Failed to change user role' });
  }
};

// Toggle user active status
export const toggleUserActive = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newActiveStatus = !existingUser.isActive;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: newActiveStatus },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
      },
    });

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: newActiveStatus ? AuditActions.USER_ACTIVATED : AuditActions.USER_DEACTIVATED,
      targetType: TargetTypes.USER,
      targetId: id,
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Toggle active error:', error);
    res.status(500).json({ error: 'Failed to toggle user status' });
  }
};

// Impersonate user (generate token for user)
export const impersonateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason || reason.trim().length < 10) {
      return res.status(400).json({ error: 'Justification reason required (min 10 characters)' });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(400).json({ error: 'Cannot impersonate inactive user' });
    }

    // Generate short-lived token (1 hour)
    const token = jwt.sign(
      { userId: user.id, email: user.email, impersonatedBy: req.user!.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.USER_IMPERSONATED,
      targetType: TargetTypes.USER,
      targetId: id,
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('Impersonate error:', error);
    res.status(500).json({ error: 'Failed to impersonate user' });
  }
};

// Delete user (soft delete by deactivating)
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete by deactivating
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.USER_DELETED,
      targetType: TargetTypes.USER,
      targetId: id,
      reason,
      ipAddress: getIpAddress(req),
    });

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Export user data (GDPR)
export const exportUserData = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        courseProgress: true,
        videoProgress: true,
        videoNotes: true,
        quizAttempts: true,
        certificates: true,
        internshipApplications: true,
        savedInternships: true,
        mentorshipBookings: true,
        notifications: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove sensitive fields
    const { password, refreshToken, passwordResetToken, emailVerificationToken, ...exportData } = user;

    // Audit log
    await createAuditLog({
      adminId: req.user!.id,
      action: 'USER_DATA_EXPORTED',
      targetType: TargetTypes.USER,
      targetId: id,
      ipAddress: getIpAddress(req),
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="user-data-${id}.json"`);
    res.json(exportData);
  } catch (error) {
    console.error('Export user data error:', error);
    res.status(500).json({ error: 'Failed to export user data' });
  }
};
