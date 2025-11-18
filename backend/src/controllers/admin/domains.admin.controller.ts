import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import prisma from '../../utils/db';
import { createAuditLog, getIpAddress, AuditActions, TargetTypes } from '../../utils/auditLog';

// Get all domains
export const getAllDomains = async (req: AuthRequest, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      include: { topics: true, _count: { select: { courses: true } } },
      orderBy: { name: 'asc' },
    });
    res.json(domains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
};

// Create domain
export const createDomain = async (req: AuthRequest, res: Response) => {
  try {
    const domain = await prisma.domain.create({ data: req.body });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.DOMAIN_CREATED,
      targetType: TargetTypes.DOMAIN,
      targetId: domain.id,
      ipAddress: getIpAddress(req),
    });
    res.json(domain);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create domain' });
  }
};

// Update domain
export const updateDomain = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const domain = await prisma.domain.update({ where: { id }, data: req.body });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.DOMAIN_UPDATED,
      targetType: TargetTypes.DOMAIN,
      targetId: id,
      ipAddress: getIpAddress(req),
    });
    res.json(domain);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update domain' });
  }
};

// Delete domain
export const deleteDomain = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.domain.delete({ where: { id } });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.DOMAIN_DELETED,
      targetType: TargetTypes.DOMAIN,
      targetId: id,
      ipAddress: getIpAddress(req),
    });
    res.json({ message: 'Domain deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete domain' });
  }
};

// Create topic
export const createTopic = async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.create({ data: req.body });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.TOPIC_CREATED,
      targetType: TargetTypes.TOPIC,
      targetId: topic.id,
      ipAddress: getIpAddress(req),
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

// Update topic
export const updateTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await prisma.topic.update({ where: { id }, data: req.body });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.TOPIC_UPDATED,
      targetType: TargetTypes.TOPIC,
      targetId: id,
      ipAddress: getIpAddress(req),
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update topic' });
  }
};

// Delete topic
export const deleteTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.topic.delete({ where: { id } });
    await createAuditLog({
      adminId: req.user!.id,
      action: AuditActions.TOPIC_DELETED,
      targetType: TargetTypes.TOPIC,
      targetId: id,
      ipAddress: getIpAddress(req),
    });
    res.json({ message: 'Topic deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete topic' });
  }
};
