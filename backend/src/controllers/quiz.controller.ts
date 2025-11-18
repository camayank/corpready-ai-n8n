import { Response } from 'express';
import prisma from '../utils/db';
import { AuthRequest } from '../middleware/auth';

export const getQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            options: true,
            order: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const getCourseQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;

    const quiz = await prisma.quiz.findFirst({
      where: { courseId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            options: true,
            order: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found for this course' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const getQuizAttempts = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        quizId: id,
        userId: req.userId,
      },
      orderBy: { completedAt: 'desc' },
    });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attempts' });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.userId!,
        quizId: id,
        answers,
        score,
        passed,
      },
    });

    // If passed, check if we should generate certificate
    if (passed) {
      const existingCert = await prisma.certificate.findFirst({
        where: {
          userId: req.userId,
          courseId: quiz.courseId,
        },
      });

      if (!existingCert) {
        const certificateCode = `SP-${Date.now()}-${req.userId?.substring(0, 6).toUpperCase()}`;
        await prisma.certificate.create({
          data: {
            userId: req.userId!,
            courseId: quiz.courseId,
            certificateCode,
          },
        });
      }
    }

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

export const canTakeQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        quizId: id,
        userId: req.userId,
        passed: true,
      },
    });

    res.json({ canTake: attempts.length === 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check quiz eligibility' });
  }
};
