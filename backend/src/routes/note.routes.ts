import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import prisma from '../utils/db';
import { Response } from 'express';

const router = Router();

router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    await prisma.videoNote.updateMany({
      where: {
        id,
        userId: req.userId,
      },
      data: { content },
    });

    res.json({ message: 'Note updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.videoNote.deleteMany({
      where: {
        id,
        userId: req.userId,
      },
    });

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
