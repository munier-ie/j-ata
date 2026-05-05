import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all management members
router.get('/', async (req, res) => {
  try {
    console.log('[Management] Fetching all members...');
    console.log('[Management] DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('[Management] DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 20));
    
    const members = await prisma.managementMember.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    
    console.log('[Management] Successfully fetched members:', members.length);
    res.json(members);
  } catch (error) {
    console.error('[Management] Error fetching management members:', error);
    console.error('[Management] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV !== 'production' ? (error instanceof Error ? error.message : String(error)) : undefined
    });
  }
});

// GET single management member
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.managementMember.findUnique({
      where: { id: req.params.id }
    });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching management member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create management member
router.post('/', async (req, res) => {
  try {
    const { name, role, imageUrl, image_url, bio, isCommissioner, is_commissioner, sortOrder, sort_order } = req.body;
    
    const newMember = await prisma.managementMember.create({
      data: {
        name,
        role,
        imageUrl: imageUrl || image_url || null,
        bio,
        isCommissioner: isCommissioner ?? is_commissioner ?? false,
        sortOrder: sortOrder ?? sort_order ?? 0
      }
    });
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating management member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update management member
router.put('/:id', async (req, res) => {
  try {
    const { name, role, imageUrl, image_url, bio, isCommissioner, is_commissioner, sortOrder, sort_order } = req.body;
    
    // If setting as commissioner, unset others first
    if (isCommissioner || is_commissioner) {
      await prisma.managementMember.updateMany({
        where: { isCommissioner: true },
        data: { isCommissioner: false }
      });
    }
    
    const updatedMember = await prisma.managementMember.update({
      where: { id: req.params.id },
      data: {
        name,
        role,
        imageUrl: imageUrl || image_url,
        bio,
        isCommissioner: isCommissioner ?? is_commissioner,
        sortOrder: sortOrder ?? sort_order
      }
    });
    res.json(updatedMember);
  } catch (error) {
    console.error('Error updating management member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE management member
router.delete('/:id', async (req, res) => {
  try {
    await prisma.managementMember.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting management member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
