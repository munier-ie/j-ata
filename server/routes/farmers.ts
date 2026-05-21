import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Helper to normalize the response database model to frontend interface format
const formatFarmerResponse = (farmer: any) => {
  if (!farmer) return farmer;
  return {
    ...farmer,
    cropTypes: typeof farmer.cropTypes === 'string'
      ? (farmer.cropTypes ? farmer.cropTypes.split(',') : [])
      : (Array.isArray(farmer.cropTypes) ? farmer.cropTypes : [])
  };
};

// GET all farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await prisma.farmer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(farmers.map(formatFarmerResponse));
  } catch (error: any) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});

// GET single farmer
router.get('/:id', async (req, res) => {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id: req.params.id }
    });
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(formatFarmerResponse(farmer));
  } catch (error: any) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});

// POST create farmer
router.post('/', async (req, res) => {
  try {
    const { 
      farmerId, farmer_id, 
      firstName, first_name, 
      lastName, last_name, 
      phone, nin, lga, ward, community,
      farmSize, farm_size,
      cropTypes, crop_types,
      status,
      passportUrl, passport_url
    } = req.body;
    
    const cropTypesInput = cropTypes || crop_types || [];
    const formattedCrops = Array.isArray(cropTypesInput)
      ? cropTypesInput.join(',')
      : (typeof cropTypesInput === 'string' ? cropTypesInput : '');

    const newFarmer = await prisma.farmer.create({
      data: {
        farmerId: farmerId || farmer_id,
        firstName: firstName || first_name,
        lastName: lastName || last_name,
        phone,
        nin: nin || null,
        lga,
        ward,
        community,
        farmSize: farmSize ?? farm_size ?? 0,
        cropTypes: formattedCrops,
        passportUrl: passportUrl || passport_url || null,
        status: status || 'pending'
      }
    });
    res.status(201).json(formatFarmerResponse(newFarmer));
  } catch (error: any) {
    console.error('Error creating farmer:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message, stack: error.stack });
  }
});

// PUT update farmer
router.put('/:id', async (req, res) => {
  try {
    const { 
      firstName, first_name, 
      lastName, last_name, 
      phone, nin, lga, ward, community,
      farmSize, farm_size,
      cropTypes, crop_types,
      status,
      passportUrl, passport_url
    } = req.body;
    
    const cropTypesInput = cropTypes || crop_types;
    const formattedCrops = cropTypesInput !== undefined
      ? (Array.isArray(cropTypesInput) ? cropTypesInput.join(',') : String(cropTypesInput))
      : undefined;

    const updatedFarmer = await prisma.farmer.update({
      where: { id: req.params.id },
      data: {
        firstName: firstName || first_name,
        lastName: lastName || last_name,
        phone,
        nin,
        lga,
        ward,
        community,
        farmSize: farmSize ?? farm_size,
        cropTypes: formattedCrops,
        passportUrl: passportUrl !== undefined ? passportUrl : (passport_url !== undefined ? passport_url : undefined),
        status
      }
    });
    res.json(formatFarmerResponse(updatedFarmer));
  } catch (error) {
    console.error('Error updating farmer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE farmer
router.delete('/:id', async (req, res) => {
  try {
    await prisma.farmer.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting farmer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
