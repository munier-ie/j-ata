import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// POST submit a new contact form
router.post('/', async (req, res) => {
  try {
    const { fullName, full_name, email, phone, subject, message } = req.body;

    const name = fullName || full_name;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required contact submission fields.' });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        subject: subject.trim(),
        message: message.trim()
      }
    });

    res.status(201).json(submission);
  } catch (error: any) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack
    });
  }
});

export default router;
