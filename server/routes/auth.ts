import { Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password with bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user data (without password)
    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.profile?.fullName || null,
        avatarUrl: user.profile?.avatarUrl || null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/auth/me - Check current session (based on localStorage token/id)
router.get('/me/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.profile?.fullName || null,
        avatarUrl: user.profile?.avatarUrl || null
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
