import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all veterinary clinics
router.get('/', async (req, res) => {
  try {
    const clinics = await prisma.veterinaryClinic.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(clinics);
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single clinic
router.get('/:id', async (req, res) => {
  try {
    const clinic = await prisma.veterinaryClinic.findUnique({
      where: { id: req.params.id }
    });
    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }
    res.json(clinic);
  } catch (error) {
    console.error('Error fetching clinic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create clinic
router.post('/', async (req, res) => {
  try {
    const {
      name, facilityType, facility_type, lga, zone, address, 
      latitude, longitude, capacity, status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      services,
      contactPhone, contact_phone,
      contactEmail, contact_email
    } = req.body;
    
    const newClinic = await prisma.veterinaryClinic.create({
      data: {
        name,
        facilityType: facilityType || facility_type,
        lga,
        zone: zone || null,
        address: address || null,
        latitude: latitude || null,
        longitude: longitude || null,
        capacity: capacity || null,
        status: status || 'planned',
        completionPercentage: completionPercentage ?? completion_percentage ?? 0,
        budgetAllocated: budgetAllocated ?? budget_allocated ?? null,
        budgetSpent: budgetSpent ?? budget_spent ?? null,
        hasWater: hasWater ?? has_water ?? false,
        hasPower: hasPower ?? has_power ?? false,
        services: services || [],
        contactPhone: contactPhone || contact_phone || null,
        contactEmail: contactEmail || contact_email || null
      }
    });
    res.status(201).json(newClinic);
  } catch (error) {
    console.error('Error creating clinic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update clinic
router.put('/:id', async (req, res) => {
  try {
    const {
      name, facilityType, facility_type, lga, zone, address, 
      latitude, longitude, capacity, status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      services,
      contactPhone, contact_phone,
      contactEmail, contact_email
    } = req.body;
    
    const updatedClinic = await prisma.veterinaryClinic.update({
      where: { id: req.params.id },
      data: {
        name,
        facilityType: facilityType || facility_type,
        lga,
        zone,
        address,
        latitude,
        longitude,
        capacity,
        status,
        completionPercentage: completionPercentage ?? completion_percentage,
        budgetAllocated: budgetAllocated ?? budget_allocated,
        budgetSpent: budgetSpent ?? budget_spent,
        hasWater: hasWater ?? has_water,
        hasPower: hasPower ?? has_power,
        services,
        contactPhone: contactPhone || contact_phone,
        contactEmail: contactEmail || contact_email
      }
    });
    res.json(updatedClinic);
  } catch (error) {
    console.error('Error updating clinic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE clinic
router.delete('/:id', async (req, res) => {
  try {
    await prisma.veterinaryClinic.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting clinic:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
