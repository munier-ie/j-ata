import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all reports
router.get('/', async (req, res) => {
  try {
    const { published } = req.query;
    
    const where = published === 'true' ? { isPublished: true } : {};
    
    const reports = await prisma.report.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single report
router.get('/:id', async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: req.params.id }
    });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create report
router.post('/', async (req, res) => {
  try {
    const { title, description, category, fileUrl, file_url, isPublished, is_published, uploadedBy, uploaded_by } = req.body;
    
    const newReport = await prisma.report.create({
      data: {
        title,
        description: description || null,
        category: category || 'general',
        fileUrl: fileUrl || file_url || null,
        isPublished: isPublished ?? is_published ?? false,
        uploadedBy: uploadedBy || uploaded_by || null
      }
    });
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update report
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, fileUrl, file_url, isPublished, is_published } = req.body;
    
    const updatedReport = await prisma.report.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        category,
        fileUrl: fileUrl || file_url,
        isPublished: isPublished ?? is_published
      }
    });
    res.json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE report
router.delete('/:id', async (req, res) => {
  try {
    await prisma.report.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
