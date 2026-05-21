import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prismaInstance = new PrismaClient();
const prisma = prismaInstance as any;

async function main() {
  console.log('🌱 Starting database seed...\n');

  console.log('🗑️  Clearing existing data...');
  await prisma.veterinaryClinic.deleteMany();
  await prisma.ranch.deleteMany();
  await prisma.exportApplication.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.report.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.managementMember.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // ============= ADMIN USERS =============
  console.log('👤 Creating admin users...');
  const adminUsers = [
    { email: 'admin@jata.gov.ng', password: 'Admin@123', role: 'admin' as const, fullName: 'System Administrator' },
    { email: 'dg.jata@jigawastate.gov.ng', password: 'DG@123', role: 'admin' as const, fullName: 'Director General J-ATA' },
    { email: 'moderator@jata.gov.ng', password: 'Mod@123', role: 'moderator' as const, fullName: 'Content Moderator' }
  ];

  for (const admin of adminUsers) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    await prisma.user.create({
      data: {
        email: admin.email,
        password: hashedPassword,
        role: admin.role,
        profile: {
          create: {
            fullName: admin.fullName,
            avatarUrl: null
          }
        }
      }
    });
  }
  console.log(`   ✓ Created ${adminUsers.length} admin users`);

  // ============= MANAGEMENT MEMBERS =============
  console.log('👥 Seeding management members...');
  const managementMembers = [
    {
      name: 'Dr. Agricultural Director',
      role: 'Director General',
      imageUrl: '/Hon. commissioner.png',
      bio: 'Leading the Jigawa Agricultural Transformation Agency to modernize farming across the state.',
      isCommissioner: true,
      sortOrder: 0
    },
    {
      name: 'Director of Analytics',
      role: 'Director of Analytics',
      imageUrl: '/director-vet.png',
      bio: 'Driving data-backed agricultural decisions and crop yield analysis.',
      isCommissioner: false,
      sortOrder: 1
    },
    {
      name: 'Director of Delivery',
      role: 'Director of Delivery',
      imageUrl: '/director-animal.png',
      bio: 'Ensuring execution of agricultural initiatives on the ground.',
      isCommissioner: false,
      sortOrder: 2
    },
    {
      name: 'Director of Operations',
      role: 'Director of Operations',
      imageUrl: '/director-economics.png',
      bio: 'Overseeing day-to-day agricultural operations and extension services.',
      isCommissioner: false,
      sortOrder: 3
    }
  ];

  for (const member of managementMembers) {
    await prisma.managementMember.create({ data: member });
  }
  console.log(`   ✓ Created ${managementMembers.length} management members`);

  const jigawaLGAs = ['Dutse', 'Hadejia', 'Kazaure', 'Gumel', 'Birnin Kudu', 'Ringim', 'Jahun', 'Maigatari'];
  
  // ============= FARMERS =============
  console.log('🧑‍🌾 Seeding farmers...');
  const cropOptions = ['Rice', 'Wheat', 'Sesame', 'Hibiscus', 'Maize', 'Sorghum'];
  const statuses = ['approved', 'pending', 'verified'];
  const farmers = [];

  for (let i = 0; i < 50; i++) {
    const numCrops = Math.floor(Math.random() * 3) + 1;
    const selectedCrops = [...cropOptions].sort(() => 0.5 - Math.random()).slice(0, numCrops);

    farmers.push({
      farmerId: `JG-${String(2025001 + i).padStart(7, '0')}`,
      firstName: 'Farmer',
      lastName: `${i + 1}`,
      phone: `+234 80${Math.floor(Math.random() * 10)}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      nin: Math.random() > 0.3 ? String(Math.floor(Math.random() * 90000000000) + 10000000000) : null,
      lga: jigawaLGAs[Math.floor(Math.random() * jigawaLGAs.length)],
      ward: 'Central Ward',
      community: 'Main Community',
      farmSize: Math.floor(Math.random() * 20) + 1,
      cropTypes: selectedCrops.join(','),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }

  for (const farmer of farmers) {
    await prisma.farmer.create({ data: farmer });
  }
  console.log(`   ✓ Created ${farmers.length} farmers`);

  // ============= NEWS ARTICLES =============
  console.log('📰 Seeding news articles...');
  const newsArticles = [
    {
      title: 'Jigawa State and IITA Forge Transformative Partnership',
      slug: 'jigawa-state-and-iita-forge-transformative-partnership',
      content: 'The Jigawa State Government, represented by the Jigawa Agricultural Transformation Agency (J-ATA), has officially entered into a transformative Memorandum of Understanding (MoU) with the International Institute of Tropical Agriculture (IITA)...',
      excerpt: 'Partnership focused on agricultural transformation.',
      imageUrl: '/news/ranch-launch.jpg',
      category: 'Partnership',
      isPublished: true,
      publishedAt: new Date('2025-01-15')
    },
    {
      title: 'J-ATA Unveils Ambitious Vision',
      slug: 'jata-unveils-ambitious-vision',
      content: 'J-ATA has formally inaugurated its operational mandate with a one-day intensive induction training for its core staff.',
      excerpt: 'Ambitious vision for agricultural transformation.',
      imageUrl: '/news/vaccination-campaign.jpg',
      category: 'Development',
      isPublished: true,
      publishedAt: new Date('2025-02-10')
    }
  ];

  for (const article of newsArticles) {
    await prisma.newsArticle.create({ data: article });
  }
  console.log(`   ✓ Created ${newsArticles.length} news articles`);

  // ============= REPORTS =============
  console.log('📊 Seeding reports...');
  const reports = [
    {
      title: 'Annual Crop Yield Report 2024',
      description: 'Comprehensive report on agricultural output across Jigawa State.',
      category: 'agriculture',
      fileUrl: '/reports/crop-yield-2024.pdf',
      isPublished: true
    }
  ];

  for (const report of reports) {
    await prisma.report.create({ data: report });
  }
  console.log(`   ✓ Created ${reports.length} reports`);

  // ============= EXPORT APPLICATIONS =============
  console.log('📦 Seeding export applications...');
  const exportApplications = [
    {
      applicationNo: 'JATA-EXP-2026-0001',
      fullName: 'Bello Haruna',
      email: 'bello@harunafarms.com',
      phone: '08098765432',
      companyName: 'Haruna Agro-Allied Limited',
      rcNumber: 'RC-983742',
      businessAddress: '12 Hadejia Road, Dutse, Jigawa State',
      commodityType: 'Sesame',
      paymentStatus: 'paid',
      paymentAmount: 15200.0,
      status: 'approved',
      issuedAt: new Date('2026-01-10'),
      expiryDate: new Date('2027-01-10'),
      certificateNo: 'JATA-EXP-CERT-22837'
    },
    {
      applicationNo: 'JATA-EXP-2026-0002',
      fullName: 'Aisha Aliyu',
      email: 'aisha@jigawaexporters.org',
      phone: '08123456789',
      companyName: 'Jigawa Hibiscus Exporters',
      rcNumber: 'RC-104928',
      businessAddress: 'Sector A, Industrial Layout, Hadejia, Jigawa State',
      commodityType: 'Hibiscus',
      paymentStatus: 'paid',
      paymentAmount: 15200.0,
      status: 'pending'
    },
    {
      applicationNo: 'JATA-EXP-2026-0003',
      fullName: 'Garba Shehu',
      email: 'garba@gumjigawa.com',
      phone: '09011122233',
      companyName: 'Sahel Gum Arabic Enterprise',
      rcNumber: 'RC-482019',
      businessAddress: 'Gum Arabic Depot, Kazaure, Jigawa State',
      commodityType: 'Gum Arabic',
      paymentStatus: 'paid',
      paymentAmount: 15200.0,
      status: 'expired',
      issuedAt: new Date('2025-05-15'),
      expiryDate: new Date('2026-05-15'),
      certificateNo: 'JATA-EXP-CERT-11942'
    }
  ];

  for (const app of exportApplications) {
    await prisma.exportApplication.create({ data: app });
  }
  console.log(`   ✓ Created ${exportApplications.length} export applications`);

  // ============= VETERINARY CLINICS =============
  console.log('🏥 Seeding veterinary clinics...');
  const veterinaryClinics = [
    {
      name: 'Dutse Central Veterinary Clinic',
      lga: 'Dutse',
      zone: 'Jigawa Central',
      address: 'Opposite State Secretariat, Dutse',
      status: 'operational',
      capacity: 500,
      facilityType: 'General Clinic',
      completionPercentage: 100,
      contactEmail: 'dutse.vet@jata.gov.ng',
      contactPhone: '08031234567',
      hasPower: true,
      hasWater: true,
      services: 'Vaccination,Surgery,Consultation,Diagnostics',
      budgetAllocated: 45000000.0,
      budgetSpent: 42500000.0,
      latitude: 11.7022,
      longitude: 9.3340
    },
    {
      name: 'Hadejia Zonal Veterinary Hospital',
      lga: 'Hadejia',
      zone: 'Jigawa Northeast',
      address: 'Hospital Road, Hadejia',
      status: 'rehabilitated',
      capacity: 800,
      facilityType: 'Zonal Hospital',
      completionPercentage: 100,
      contactEmail: 'hadejia.vet@jata.gov.ng',
      contactPhone: '08032223344',
      hasPower: true,
      hasWater: true,
      services: 'Vaccination,Surgery,Emergency Care,Inpatient,Diagnostics',
      budgetAllocated: 75000000.0,
      budgetSpent: 75000000.0,
      latitude: 12.4506,
      longitude: 10.0404
    },
    {
      name: 'Kazaure Extension Veterinary Center',
      lga: 'Kazaure',
      zone: 'Jigawa Northwest',
      address: 'Kazaure-Kano Road, Kazaure',
      status: 'under_construction',
      capacity: 300,
      facilityType: 'Extension Center',
      completionPercentage: 65,
      contactEmail: 'kazaure.vet@jata.gov.ng',
      contactPhone: '08035556677',
      hasPower: false,
      hasWater: true,
      services: 'Vaccination,Consultation',
      budgetAllocated: 30000000.0,
      budgetSpent: 19500000.0,
      latitude: 12.6475,
      longitude: 8.4101
    },
    {
      name: 'Gumel Livestock Health Post',
      lga: 'Gumel',
      zone: 'Jigawa North',
      address: 'Near Livestock Market, Gumel',
      status: 'planned',
      capacity: 200,
      facilityType: 'Health Post',
      completionPercentage: 15,
      contactEmail: 'gumel.vet@jata.gov.ng',
      contactPhone: '08039998877',
      hasPower: false,
      hasWater: false,
      services: 'Vaccination,Consultation',
      budgetAllocated: 20000000.0,
      budgetSpent: 3000000.0,
      latitude: 12.6269,
      longitude: 9.3881
    }
  ];

  for (const clinic of veterinaryClinics) {
    await prisma.veterinaryClinic.create({ data: clinic });
  }
  console.log(`   ✓ Created ${veterinaryClinics.length} veterinary clinics`);

  // ============= RANCHES =============
  console.log('🤠 Seeding ranches...');
  const ranches = [
    {
      name: 'Birnin Kudu Model Grazing Reserve',
      lga: 'Birnin Kudu',
      zone: 'Jigawa South',
      address: 'Birnin Kudu Reserve Area',
      status: 'operational',
      totalHectares: 2500.0,
      capacityCattle: 15000,
      completionPercentage: 95,
      hasFeedFacilities: true,
      hasSchool: true,
      hasHealthCenter: true,
      hasVeterinaryClinic: true,
      hasPower: true,
      hasWater: true,
      budgetAllocated: 250000000.0,
      budgetSpent: 237500000.0,
      latitude: 11.4586,
      longitude: 9.4784
    },
    {
      name: 'Jahun Commercial Cattle Ranch',
      lga: 'Jahun',
      zone: 'Jigawa East',
      address: 'Jahun-Kiyawa Road, Jahun',
      status: 'under_construction',
      totalHectares: 1800.0,
      capacityCattle: 10000,
      completionPercentage: 70,
      hasFeedFacilities: true,
      hasSchool: false,
      hasHealthCenter: true,
      hasVeterinaryClinic: false,
      hasPower: true,
      hasWater: true,
      budgetAllocated: 180000000.0,
      budgetSpent: 126000000.0,
      latitude: 11.9619,
      longitude: 9.6247
    },
    {
      name: 'Maigatari Border Grazing Reserve',
      lga: 'Maigatari',
      zone: 'Jigawa Northeast',
      address: 'Border Livestock Corridor, Maigatari',
      status: 'rehabilitated',
      totalHectares: 3000.0,
      capacityCattle: 20000,
      completionPercentage: 100,
      hasFeedFacilities: true,
      hasSchool: true,
      hasHealthCenter: true,
      hasVeterinaryClinic: true,
      hasPower: true,
      hasWater: true,
      budgetAllocated: 320000000.0,
      budgetSpent: 320000000.0,
      latitude: 12.8094,
      longitude: 9.4442
    },
    {
      name: 'Ringim Dairy and Grazing Reserve',
      lga: 'Ringim',
      zone: 'Jigawa Southwest',
      address: 'Ringim Reserve Forest',
      status: 'planned',
      totalHectares: 1200.0,
      capacityCattle: 8000,
      completionPercentage: 10,
      hasFeedFacilities: false,
      hasSchool: false,
      hasHealthCenter: false,
      hasVeterinaryClinic: false,
      hasPower: false,
      hasWater: true,
      budgetAllocated: 110000000.0,
      budgetSpent: 11000000.0,
      latitude: 12.1558,
      longitude: 9.1556
    }
  ];

  for (const ranch of ranches) {
    await prisma.ranch.create({ data: ranch });
  }
  console.log(`   ✓ Created ${ranches.length} ranches`);

  console.log('\n✅ Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
