import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all investors
router.get('/', async (req, res) => {
  try {
    const investors = await prisma.investorProfile.findMany({
      include: { user: { include: { profile: true } } }
    });
    res.json(investors);
  } catch (error) {
    console.error('Error fetching investors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST register as investor
router.post('/', async (req, res) => {
  try {
    const { userId, companyName, country, focusSectors } = req.body;

    if (!userId || !focusSectors) {
      return res.status(400).json({ error: 'User ID and focus sectors are required' });
    }

    const investor = await prisma.investorProfile.create({
      data: {
        userId,
        companyName,
        country,
        focusSectors
      }
    });

    res.status(201).json(investor);
  } catch (error) {
    console.error('Error creating investor profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
