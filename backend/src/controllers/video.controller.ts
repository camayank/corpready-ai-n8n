import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import { sendCertificateEmail, sendCourseCompletionEmail } from '../utils/email';

export const getVideoProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const progress = await prisma.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId: req.userId!,
          videoId: id,
        },
      },
    });

    res.json(progress || { watchedDuration: 0, isCompleted: false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video progress' });
  }
};

export const updateVideoProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { watchedDuration, isCompleted } = req.body;

    const progress = await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId: req.userId!,
          videoId: id,
        },
      },
      update: {
        watchedDuration,
        isCompleted,
        lastWatchedAt: new Date(),
      },
      create: {
        userId: req.userId!,
        videoId: id,
        watchedDuration,
        isCompleted,
      },
    });

    // Check if course is now complete (all videos watched)
    if (isCompleted) {
      await checkAndIssueCertificate(req.userId!, id);
    }

    res.json(progress);
  } catch (error) {
    console.error('Update video progress error:', error);
    res.status(500).json({ error: 'Failed to update video progress' });
  }
};

// Helper function to check course completion and issue certificate
async function checkAndIssueCertificate(userId: string, videoId: string) {
  try {
    // Get the video's course
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        module: {
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
        },
      },
    });

    if (!video) return;

    const course = video.module.course;

    // Get all video IDs in this course
    const allVideoIds = course.modules.flatMap((module) =>
      module.videos.map((v) => v.id)
    );

    // Check if user has completed all videos
    const completedVideos = await prisma.videoProgress.count({
      where: {
        userId,
        videoId: { in: allVideoIds },
        isCompleted: true,
      },
    });

    // If all videos are completed, issue certificate
    if (completedVideos === allVideoIds.length) {
      // Check if certificate already exists
      const existingCertificate = await prisma.certificate.findFirst({
        where: {
          userId,
          courseName: course.title,
        },
      });

      if (!existingCertificate) {
        // Generate unique certificate code
        const certificateCode = uuidv4().substring(0, 8).toUpperCase();

        // Create certificate
        const certificate = await prisma.certificate.create({
          data: {
            userId,
            courseName: course.title,
            certificateCode,
            issuedAt: new Date(),
          },
        });

        // Get user details
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (user) {
          // Send emails (async, don't wait)
          Promise.all([
            sendCourseCompletionEmail(user.email, user.name, course.title),
            sendCertificateEmail(user.email, user.name, course.title, certificate.id),
          ]).catch((err) => console.error('Email send error:', err));
        }

        // Update course progress
        await prisma.courseProgress.updateMany({
          where: {
            userId,
            courseId: course.id,
          },
          data: {
            completedAt: new Date(),
          },
        });
      }
    }
  } catch (error) {
    console.error('Check and issue certificate error:', error);
    // Don't throw - this is a background operation
  }
}

export const getVideoNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const notes = await prisma.videoNote.findMany({
      where: {
        userId: req.userId,
        videoId: id,
      },
      orderBy: { timestamp: 'asc' },
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const createVideoNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content, timestamp } = req.body;

    const note = await prisma.videoNote.create({
      data: {
        userId: req.userId!,
        videoId: id,
        content,
        timestamp,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const note = await prisma.videoNote.updateMany({
      where: {
        id,
        userId: req.userId,
      },
      data: { content },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await prisma.videoNote.deleteMany({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
