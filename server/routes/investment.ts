import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all investment opportunities
router.get('/opportunities', async (req, res) => {
  try {
    const opportunities = await prisma.investmentOpportunity.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all project pipelines
router.get('/pipeline', async (req, res) => {
  try {
    const pipeline = await prisma.projectPipeline.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(pipeline);
  } catch (error) {
    console.error('Error fetching pipeline:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
