import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all startup applications
router.get('/', async (req, res) => {
  try {
    const applications = await prisma.incubatorApplication.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, startupName, sector, stage, description, goals, milestones, paymentMethod } = req.body;
    
    // Find or create a user for this application
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: 'password', // Default password for mock
          role: 'startup'
        }
      });
    }

    const application = await prisma.incubatorApplication.create({
      data: {
        userId: user.id,
        answers: {
          fullName,
          phone,
          startupName,
          sector,
          stage,
          description,
          goals,
          milestones,
          paymentMethod
        },
        status: 'pending'
      }
    });
    
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update application status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const application = await prisma.incubatorApplication.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create deliverable/milestone
router.post('/:id/deliverables', async (req, res) => {
  try {
    const { title, description, amount, proofUrl } = req.body;
    const milestone = await prisma.grantMilestone.create({
      data: {
        startupId: req.params.id,
        title,
        description,
        amount: parseFloat(amount),
        proofUrl,
        status: 'pending'
      }
    });
    res.status(201).json(milestone);
  } catch (error) {
    console.error('Error creating deliverable:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
