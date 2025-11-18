import { prisma } from '../lib/prisma';

export interface AuditLogData {
  adminId: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, any>;
  reason?: string;
  ipAddress?: string;
}

export const createAuditLog = async (data: AuditLogData): Promise<void> => {
  try {
    await prisma.adminActionLog.create({
      data: {
        adminId: data.adminId,
        action: data.action,
        targetType: data.targetType,
        targetId: data.targetId,
        details: data.details,
        reason: data.reason,
        ipAddress: data.ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error - audit logging should not break the main operation
  }
};

// Helper function to get IP address from request
export const getIpAddress = (req: any): string => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    'unknown'
  );
};

// Common audit log actions
export const AuditActions = {
  // User management
  USER_CREATED: 'USER_CREATED',
  USER_UPDATED: 'USER_UPDATED',
  USER_DELETED: 'USER_DELETED',
  USER_ROLE_CHANGED: 'USER_ROLE_CHANGED',
  USER_ACTIVATED: 'USER_ACTIVATED',
  USER_DEACTIVATED: 'USER_DEACTIVATED',
  USER_IMPERSONATED: 'USER_IMPERSONATED',

  // Course management
  COURSE_CREATED: 'COURSE_CREATED',
  COURSE_UPDATED: 'COURSE_UPDATED',
  COURSE_DELETED: 'COURSE_DELETED',
  COURSE_FLAGGED: 'COURSE_FLAGGED',
  COURSE_REGENERATED: 'COURSE_REGENERATED',
  VIDEO_REPLACED: 'VIDEO_REPLACED',

  // Domain/Topic management
  DOMAIN_CREATED: 'DOMAIN_CREATED',
  DOMAIN_UPDATED: 'DOMAIN_UPDATED',
  DOMAIN_DELETED: 'DOMAIN_DELETED',
  TOPIC_CREATED: 'TOPIC_CREATED',
  TOPIC_UPDATED: 'TOPIC_UPDATED',
  TOPIC_DELETED: 'TOPIC_DELETED',

  // Internship management
  INTERNSHIP_CREATED: 'INTERNSHIP_CREATED',
  INTERNSHIP_UPDATED: 'INTERNSHIP_UPDATED',
  INTERNSHIP_DELETED: 'INTERNSHIP_DELETED',
  INTERNSHIP_APPROVED: 'INTERNSHIP_APPROVED',
  INTERNSHIP_REJECTED: 'INTERNSHIP_REJECTED',

  // Certificate management
  CERTIFICATE_REGENERATED: 'CERTIFICATE_REGENERATED',
  CERTIFICATE_REVOKED: 'CERTIFICATE_REVOKED',

  // Mentor management
  MENTOR_CREATED: 'MENTOR_CREATED',
  MENTOR_UPDATED: 'MENTOR_UPDATED',
  MENTOR_DELETED: 'MENTOR_DELETED',

  // System actions
  API_KEY_CREATED: 'API_KEY_CREATED',
  API_KEY_ROTATED: 'API_KEY_ROTATED',
  API_KEY_DISABLED: 'API_KEY_DISABLED',
  SETTINGS_UPDATED: 'SETTINGS_UPDATED',
};

export const TargetTypes = {
  USER: 'User',
  COURSE: 'Course',
  DOMAIN: 'Domain',
  TOPIC: 'Topic',
  INTERNSHIP: 'Internship',
  CERTIFICATE: 'Certificate',
  MENTOR: 'Mentor',
  API_KEY: 'ApiKey',
  SETTINGS: 'Settings',
};
