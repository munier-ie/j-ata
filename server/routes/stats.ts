import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET dashboard stats
router.get('/', async (req, res) => {
  try {
    const [
      totalFarmEstates,
      totalInnovationHubs,
      totalFarmers,
      totalNews,
      totalReports,
      operationalFarmEstates
    ] = await Promise.all([
      prisma.farmEstate.count(),
      prisma.innovationHub.count(),
      prisma.farmer.count(),
      prisma.newsArticle.count(),
      prisma.report.count(),
      prisma.farmEstate.count({ where: { status: 'operational' } })
    ]);

    res.json({
      totalFarmEstates,
      totalInnovationHubs,
      totalFarmers,
      totalNews,
      totalReports,
      completedProjects: operationalFarmEstates
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET detailed farm estate stats
router.get('/farm-estates', async (req, res) => {
  try {
    const statuses = await prisma.farmEstate.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    
    const totalHectares = await prisma.farmEstate.aggregate({
      _sum: { totalHectares: true }
    });

    res.json({
      byStatus: statuses,
      totalHectares: totalHectares._sum.totalHectares || 0
    });
  } catch (error) {
    console.error('Error fetching farm estate stats:', error);
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
