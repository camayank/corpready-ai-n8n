import { Response } from 'express';
import axios from 'axios';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

export const generateCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { domain, topics, targetAudience, skillLevel } = req.body;

    // Call n8n webhook or AI service to generate course
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    let courseData;

    if (n8nUrl) {
      const response = await axios.post(n8nUrl, {
        domain,
        topics,
        targetAudience,
        skillLevel,
      });
      courseData = response.data;
    } else {
      // Fallback: create basic course structure
      courseData = {
        title: `${domain} Learning Path`,
        description: `Comprehensive ${domain} course`,
        estimatedHours: 10,
      };
    }

    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        domain,
        targetAudience,
        skillLevel,
        estimatedHours: courseData.estimatedHours || 10,
        modules: {
          create: courseData.modules || [],
        },
      },
      include: {
        modules: {
          include: {
            videos: true,
          },
        },
      },
    });

    // Enroll user in course
    await prisma.courseProgress.create({
      data: {
        userId: req.userId!,
        courseId: course.id,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Generate course error:', error);
    res.status(500).json({ error: 'Failed to generate course' });
  }
};

export const getCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            videos: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const getMyCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await prisma.courseProgress.findMany({
      where: { userId: req.userId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                videos: true,
              },
            },
          },
        },
      },
      orderBy: { lastAccessedAt: 'desc' },
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getRecommendedCourses = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    // Simple recommendation: courses in user's area of study
    const courses = await prisma.course.findMany({
      where: user?.areaOfStudy
        ? { domain: { contains: user.areaOfStudy } }
        : {},
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        modules: {
          take: 1,
          include: {
            videos: {
              take: 1,
            },
          },
        },
      },
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: req.userId!,
          courseId: id,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
};
