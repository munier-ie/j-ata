import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Helper to map Prisma Ranch (camelCase) to Frontend Ranch (snake_case)
const formatRanchResponse = (ranch: any) => {
  if (!ranch) return ranch;
  return {
    id: ranch.id,
    name: ranch.name,
    lga: ranch.lga,
    zone: ranch.zone,
    address: ranch.address,
    status: ranch.status,
    total_hectares: ranch.totalHectares,
    capacity_cattle: ranch.capacityCattle,
    completion_percentage: ranch.completionPercentage,
    budget_allocated: ranch.budgetAllocated,
    budget_spent: ranch.budgetSpent,
    has_feed_facilities: ranch.hasFeedFacilities,
    has_school: ranch.hasSchool,
    has_health_center: ranch.hasHealthCenter,
    has_veterinary_clinic: ranch.hasVeterinaryClinic,
    has_power: ranch.hasPower,
    has_water: ranch.hasWater,
    created_at: ranch.createdAt,
    updated_at: ranch.updatedAt
  };
};

// Helper to map Prisma VeterinaryClinic (camelCase) to Frontend VeterinaryClinic (snake_case)
const formatClinicResponse = (clinic: any) => {
  if (!clinic) return clinic;
  return {
    id: clinic.id,
    name: clinic.name,
    lga: clinic.lga,
    zone: clinic.zone,
    address: clinic.address,
    status: clinic.status,
    capacity: clinic.capacity,
    facility_type: clinic.facilityType,
    completion_percentage: clinic.completionPercentage,
    budget_allocated: clinic.budgetAllocated,
    budget_spent: clinic.budgetSpent,
    contact_email: clinic.contactEmail,
    contact_phone: clinic.contactPhone,
    has_power: clinic.hasPower,
    has_water: clinic.hasWater,
    services: clinic.services ? clinic.services.split(',') : [],
    created_at: clinic.createdAt,
    updated_at: clinic.updatedAt
  };
};

// GET all veterinary clinics
router.get('/clinics', async (req, res) => {
  try {
    const clinics = await prisma.veterinaryClinic.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(clinics.map(formatClinicResponse));
  } catch (error: any) {
    console.error('Error fetching veterinary clinics:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack
    });
  }
});

// GET all ranches
router.get('/ranches', async (req, res) => {
  try {
    const ranches = await prisma.ranch.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(ranches.map(formatRanchResponse));
  } catch (error: any) {
    console.error('Error fetching ranches:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack
    });
  }
});

export default router;
