import { Router } from 'express';
import prismaInstance from '../lib/prisma';

const router = Router();
const prisma = prismaInstance as any;

// GET all PPP applications
router.get('/', async (req, res) => {
  try {
    const applications = await prisma.pppApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching PPP applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create PPP application
router.post('/', async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, selectedProject, proposedInvestment, expectedRoi } = req.body;

    if (!companyName || !contactPerson || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const application = await prisma.pppApplication.create({
      data: {
        companyName,
        contactPerson,
        email,
        phone,
        selectedProject,
        proposedInvestment,
        expectedRoi,
        status: 'pending'
      }
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating PPP application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
