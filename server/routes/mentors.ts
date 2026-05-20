import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await prisma.mentorProfile.findMany({
      include: { user: { include: { profile: true } } }
    });
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST register as mentor
router.post('/', async (req, res) => {
  try {
    const { userId, expertise, bio } = req.body;

    if (!userId || !expertise) {
      return res.status(400).json({ error: 'User ID and expertise are required' });
    }

    const mentor = await prisma.mentorProfile.create({
      data: {
        userId,
        expertise,
        bio
      }
    });

    res.status(201).json(mentor);
  } catch (error) {
    console.error('Error creating mentor profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET mentor sessions
router.get('/:mentorId/sessions', async (req, res) => {
  try {
    const sessions = await prisma.mentorshipSession.findMany({
      where: { mentorId: req.params.mentorId },
      include: { startup: true }
    });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
