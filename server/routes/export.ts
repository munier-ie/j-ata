import { Router } from 'express';
import prismaInstance from '../lib/prisma';

const router = Router();
const prisma = prismaInstance as any;

// ============= PRODUCT BATCHES & WAREHOUSES =============

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

// GET all certificates (Batch Quality Certificates)
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


// ============= EXPORT CERTIFICATION APPLICATIONS =============

// GET all export applications (Admin View)
router.get('/applications', async (req, res) => {
  try {
    const applications = await prisma.exportApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (error: any) {
    console.error('Error fetching export applications:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});

// GET single export application
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error fetching export application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST submit new export application
router.post('/applications', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      rcNumber,
      businessAddress,
      commodityType,
      userId
    } = req.body;

    if (!fullName || !email || !phone || !companyName || !rcNumber || !businessAddress || !commodityType) {
      return res.status(400).json({ error: 'Missing required application fields.' });
    }

    const applicationNo = `JATA-EXP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApplication = await prisma.exportApplication.create({
      data: {
        applicationNo,
        fullName,
        email,
        phone,
        companyName,
        rcNumber,
        businessAddress,
        commodityType,
        paymentStatus: 'pending',
        paymentAmount: 15200.0,
        status: 'pending',
        userId: userId || null
      }
    });

    res.status(201).json(newApplication);
  } catch (error: any) {
    console.error('Error creating export application:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});

// POST pay fee (₦15,200) for application
router.post('/applications/:id/pay', async (req, res) => {
  try {
    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const updatedApplication = await prisma.exportApplication.update({
      where: { id: req.params.id },
      data: {
        paymentStatus: 'paid'
      }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error processing application payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST admin issue certificate (Verify & Issue)
router.post('/applications/:id/issue', async (req, res) => {
  try {
    const { signatoryName, signatoryTitle } = req.body;

    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const issuedAt = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(issuedAt.getFullYear() + 1); // Valid for 1 year

    const certificateNo = `JATA-EXP-CERT-${Math.floor(10000 + Math.random() * 90000)}`;

    const updatedApplication = await prisma.exportApplication.update({
      where: { id: req.params.id },
      data: {
        status: 'approved',
        issuedAt,
        expiryDate,
        certificateNo,
        signatoryName: signatoryName || 'Dr. Saifullahi Umar',
        signatoryTitle: signatoryTitle || 'Director General, J-ATA'
      }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST update signatory details for an approved certificate
router.post('/applications/:id/update-signatory', async (req, res) => {
  try {
    const { signatoryName, signatoryTitle } = req.body;

    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (application.status !== 'approved') {
      return res.status(400).json({ error: 'Application is not approved' });
    }

    const updatedApplication = await prisma.exportApplication.update({
      where: { id: req.params.id },
      data: {
        signatoryName: signatoryName || 'Dr. Saifullahi Umar',
        signatoryTitle: signatoryTitle || 'Director General, J-ATA'
      }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating signatory details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST admin reject application
router.post('/applications/:id/reject', async (req, res) => {
  try {
    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const updatedApplication = await prisma.exportApplication.update({
      where: { id: req.params.id },
      data: {
        status: 'rejected'
      }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST renew expired certificate (requires re-payment)
router.post('/applications/:id/renew', async (req, res) => {
  try {
    const application = await prisma.exportApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const updatedApplication = await prisma.exportApplication.update({
      where: { id: req.params.id },
      data: {
        status: 'pending',
        paymentStatus: 'pending',
        issuedAt: null,
        expiryDate: null,
        certificateNo: null
      }
    });

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error renewing certificate application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
