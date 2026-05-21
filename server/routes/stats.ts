import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET dashboard stats
router.get('/', async (req, res) => {
  try {
    const [
      totalFarmers,
      totalNews,
      totalReports
    ] = await Promise.all([
      prisma.farmer.count(),
      prisma.newsArticle.count(),
      prisma.report.count()
    ]);

    res.json({
      totalFarmers,
      totalNews,
      totalReports
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET farmer stats by LGA
router.get('/farmers', async (req, res) => {
  try {
    const byLGA = await prisma.farmer.groupBy({
      by: ['lga'],
      _count: { lga: true },
      _sum: { farmSize: true }
    });
    
    const byStatus = await prisma.farmer.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    res.json({ byLGA, byStatus });
  } catch (error) {
    console.error('Error fetching farmer stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
