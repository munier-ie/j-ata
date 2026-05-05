import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all grazing permits
router.get('/', async (req, res) => {
  try {
    const permits = await prisma.grazingPermit.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(permits);
  } catch (error) {
    console.error('Error fetching grazing permits:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single grazing permit by ID or receipt ID
router.get('/:idOrReceiptId', async (req, res) => {
  try {
    const { idOrReceiptId } = req.params;
    
    // Try to find by ID first, then by receiptId
    let permit = await prisma.grazingPermit.findUnique({
      where: { id: idOrReceiptId }
    });
    
    if (!permit) {
      permit = await prisma.grazingPermit.findUnique({
        where: { receiptId: idOrReceiptId }
      });
    }
    
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }
    res.json(permit);
  } catch (error) {
    console.error('Error fetching grazing permit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create grazing permit
router.post('/', async (req, res) => {
  try {
    const { 
      receiptId, receipt_id,
      nin,
      fullName, full_name,
      phone,
      lga,
      ward,
      community,
      address,
      yardLength, yard_length,
      amount,
      paymentStatus, payment_status
    } = req.body;
    
    const newPermit = await prisma.grazingPermit.create({
      data: {
        receiptId: receiptId || receipt_id,
        nin,
        fullName: fullName || full_name,
        phone: phone || null,
        lga,
        ward,
        community: community || null,
        address: address || null,
        yardLength: yardLength || yard_length,
        amount,
        paymentStatus: paymentStatus || payment_status || 'completed'
      }
    });
    res.status(201).json(newPermit);
  } catch (error) {
    console.error('Error creating grazing permit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET stats for grazing permits
router.get('/stats/summary', async (req, res) => {
  try {
    const [total, totalAmount] = await Promise.all([
      prisma.grazingPermit.count(),
      prisma.grazingPermit.aggregate({
        _sum: { amount: true }
      })
    ]);
    
    res.json({
      totalPermits: total,
      totalRevenue: totalAmount._sum.amount || 0
    });
  } catch (error) {
    console.error('Error fetching permit stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
