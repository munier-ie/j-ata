import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET all ranches
router.get('/', async (req, res) => {
  try {
    const ranches = await prisma.ranch.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(ranches);
  } catch (error) {
    console.error('Error fetching ranches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single ranch
router.get('/:id', async (req, res) => {
  try {
    const ranch = await prisma.ranch.findUnique({
      where: { id: req.params.id }
    });
    if (!ranch) {
      return res.status(404).json({ error: 'Ranch not found' });
    }
    res.json(ranch);
  } catch (error) {
    console.error('Error fetching ranch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create ranch
router.post('/', async (req, res) => {
  try {
    const {
      name, lga, zone, address, latitude, longitude,
      totalHectares, total_hectares,
      capacityCattle, capacity_cattle,
      status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      hasVeterinaryClinic, has_veterinary_clinic,
      hasFeedFacilities, has_feed_facilities,
      hasSchool, has_school,
      hasHealthCenter, has_health_center
    } = req.body;
    
    const newRanch = await prisma.ranch.create({
      data: {
        name,
        lga,
        zone: zone || null,
        address: address || null,
        latitude: latitude || null,
        longitude: longitude || null,
        totalHectares: totalHectares ?? total_hectares ?? null,
        capacityCattle: capacityCattle ?? capacity_cattle ?? null,
        status: status || 'planned',
        completionPercentage: completionPercentage ?? completion_percentage ?? 0,
        budgetAllocated: budgetAllocated ?? budget_allocated ?? null,
        budgetSpent: budgetSpent ?? budget_spent ?? null,
        hasWater: hasWater ?? has_water ?? false,
        hasPower: hasPower ?? has_power ?? false,
        hasVeterinaryClinic: hasVeterinaryClinic ?? has_veterinary_clinic ?? false,
        hasFeedFacilities: hasFeedFacilities ?? has_feed_facilities ?? false,
        hasSchool: hasSchool ?? has_school ?? false,
        hasHealthCenter: hasHealthCenter ?? has_health_center ?? false
      }
    });
    res.status(201).json(newRanch);
  } catch (error) {
    console.error('Error creating ranch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update ranch
router.put('/:id', async (req, res) => {
  try {
    const {
      name, lga, zone, address, latitude, longitude,
      totalHectares, total_hectares,
      capacityCattle, capacity_cattle,
      status,
      completionPercentage, completion_percentage,
      budgetAllocated, budget_allocated,
      budgetSpent, budget_spent,
      hasWater, has_water,
      hasPower, has_power,
      hasVeterinaryClinic, has_veterinary_clinic,
      hasFeedFacilities, has_feed_facilities,
      hasSchool, has_school,
      hasHealthCenter, has_health_center
    } = req.body;
    
    const updatedRanch = await prisma.ranch.update({
      where: { id: req.params.id },
      data: {
        name,
        lga,
        zone,
        address,
        latitude,
        longitude,
        totalHectares: totalHectares ?? total_hectares,
        capacityCattle: capacityCattle ?? capacity_cattle,
        status,
        completionPercentage: completionPercentage ?? completion_percentage,
        budgetAllocated: budgetAllocated ?? budget_allocated,
        budgetSpent: budgetSpent ?? budget_spent,
        hasWater: hasWater ?? has_water,
        hasPower: hasPower ?? has_power,
        hasVeterinaryClinic: hasVeterinaryClinic ?? has_veterinary_clinic,
        hasFeedFacilities: hasFeedFacilities ?? has_feed_facilities,
        hasSchool: hasSchool ?? has_school,
        hasHealthCenter: hasHealthCenter ?? has_health_center
      }
    });
    res.json(updatedRanch);
  } catch (error) {
    console.error('Error updating ranch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE ranch
router.delete('/:id', async (req, res) => {
  try {
    await prisma.ranch.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting ranch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
