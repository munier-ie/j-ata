import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all product batches
router.get('/batches', async (req, res) => {
  try {
    const batches = await prisma.productBatch.findMany({
      include: { logs: true, certificates: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all warehouses
router.get('/warehouses', async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(warehouses);
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all certificates
router.get('/certificates', async (req, res) => {
  try {
    const certificates = await prisma.qualityCertificate.findMany({
      orderBy: { issueDate: 'desc' }
    });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
