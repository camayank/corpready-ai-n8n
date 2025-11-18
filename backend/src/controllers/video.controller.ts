import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

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

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video progress' });
  }
};

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
