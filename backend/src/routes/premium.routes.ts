import { Router } from 'express';
import prisma from '../utils/db';

const router = Router();

router.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const lead = await prisma.premiumLead.create({
      data: { name, email, phone, message },
    });

    res.status(201).json({ message: 'Lead submitted successfully', lead });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit lead' });
  }
});

export default router;
