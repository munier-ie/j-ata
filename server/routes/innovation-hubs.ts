import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all innovation hubs
router.get('/', async (req, res) => {
  try {
    const hubs = await prisma.innovationHub.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(hubs);
  } catch (error) {
    console.error('Error fetching innovation hubs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single innovation hub
router.get('/:id', async (req, res) => {
  try {
    const hub = await prisma.innovationHub.findUnique({
      where: { id: req.params.id }
    });
    if (!hub) {
      return res.status(404).json({ error: 'Innovation Hub not found' });
    }
    res.json(hub);
  } catch (error) {
    console.error('Error fetching innovation hub:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create innovation hub
router.post('/', async (req, res) => {
  try {
    const {
      name, facilityType, facility_type, lga, zone, address, latitude, longitude,
      capacity, status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      services, contactPhone, contact_phone, contactEmail, contact_email
    } = req.body;
    
    const newHub = await prisma.innovationHub.create({
      data: {
        name,
        facilityType: facilityType || facility_type || 'innovation_hub',
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
    res.status(201).json(newHub);
  } catch (error) {
    console.error('Error creating innovation hub:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update innovation hub
router.put('/:id', async (req, res) => {
  try {
    const {
      name, facilityType, facility_type, lga, zone, address, latitude, longitude,
      capacity, status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      services, contactPhone, contact_phone, contactEmail, contact_email
    } = req.body;
    
    const updatedHub = await prisma.innovationHub.update({
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
    res.json(updatedHub);
  } catch (error) {
    console.error('Error updating innovation hub:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE innovation hub
router.delete('/:id', async (req, res) => {
  try {
    await prisma.innovationHub.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting innovation hub:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
