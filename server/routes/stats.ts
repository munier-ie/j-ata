import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET dashboard stats
router.get('/', async (req, res) => {
  try {
    const [
      totalRanches,
      totalClinics,
      totalFarmers,
      totalNews,
      totalReports,
      operationalRanches
    ] = await Promise.all([
      prisma.ranch.count(),
      prisma.veterinaryClinic.count(),
      prisma.farmer.count(),
      prisma.newsArticle.count(),
      prisma.report.count(),
      prisma.ranch.count({ where: { status: 'operational' } })
    ]);

    res.json({
      totalRanches,
      totalClinics,
      totalFarmers,
      totalNews,
      totalReports,
      completedProjects: operationalRanches
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET detailed ranch stats
router.get('/ranches', async (req, res) => {
  try {
    const statuses = await prisma.ranch.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    
    const totalHectares = await prisma.ranch.aggregate({
      _sum: { totalHectares: true }
    });
    
    const totalCapacity = await prisma.ranch.aggregate({
      _sum: { capacityCattle: true }
    });

    res.json({
      byStatus: statuses,
      totalHectares: totalHectares._sum.totalHectares || 0,
      totalCapacity: totalCapacity._sum.capacityCattle || 0
    });
  } catch (error) {
    console.error('Error fetching ranch stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET farmer stats by LGA
router.get('/farmers', async (req, res) => {
  try {
    const byLGA = await prisma.farmer.groupBy({
      by: ['lga'],
      _count: { lga: true },
      _sum: { herdSize: true }
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
