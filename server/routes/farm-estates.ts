import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all farm estates
router.get('/', async (req, res) => {
  try {
    const estates = await prisma.farmEstate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(estates);
  } catch (error) {
    console.error('Error fetching farm estates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single farm estate
router.get('/:id', async (req, res) => {
  try {
    const estate = await prisma.farmEstate.findUnique({
      where: { id: req.params.id }
    });
    if (!estate) {
      return res.status(404).json({ error: 'Farm Estate not found' });
    }
    res.json(estate);
  } catch (error) {
    console.error('Error fetching farm estate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create farm estate
router.post('/', async (req, res) => {
  try {
    const {
      name, lga, zone, address, latitude, longitude,
      totalHectares, total_hectares,
      status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      hasAccessRoad, has_access_road,
      hasStorageFacility, has_storage_facility
    } = req.body;
    
    const newEstate = await prisma.farmEstate.create({
      data: {
        name,
        lga,
        zone: zone || null,
        address: address || null,
        latitude: latitude || null,
        longitude: longitude || null,
        totalHectares: totalHectares ?? total_hectares ?? null,
        status: status || 'planned',
        completionPercentage: completionPercentage ?? completion_percentage ?? 0,
        budgetAllocated: budgetAllocated ?? budget_allocated ?? null,
        budgetSpent: budgetSpent ?? budget_spent ?? null,
        hasWater: hasWater ?? has_water ?? false,
        hasPower: hasPower ?? has_power ?? false,
        hasAccessRoad: hasAccessRoad ?? has_access_road ?? false,
        hasStorageFacility: hasStorageFacility ?? has_storage_facility ?? false
      }
    });
    res.status(201).json(newEstate);
  } catch (error) {
    console.error('Error creating farm estate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update farm estate
router.put('/:id', async (req, res) => {
  try {
    const {
      name, lga, zone, address, latitude, longitude,
      totalHectares, total_hectares,
      status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      hasAccessRoad, has_access_road,
      hasStorageFacility, has_storage_facility
    } = req.body;
    
    const updatedEstate = await prisma.farmEstate.update({
      where: { id: req.params.id },
      data: {
        name,
        lga,
        zone,
        address,
        latitude,
        longitude,
        totalHectares: totalHectares ?? total_hectares,
        status,
        completionPercentage: completionPercentage ?? completion_percentage,
        budgetAllocated: budgetAllocated ?? budget_allocated,
        budgetSpent: budgetSpent ?? budget_spent,
        hasWater: hasWater ?? has_water,
        hasPower: hasPower ?? has_power,
        hasAccessRoad: hasAccessRoad ?? has_access_road,
        hasStorageFacility: hasStorageFacility ?? has_storage_facility
      }
    });
    res.json(updatedEstate);
  } catch (error) {
    console.error('Error updating farm estate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE farm estate
router.delete('/:id', async (req, res) => {
  try {
    await prisma.farmEstate.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting farm estate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
