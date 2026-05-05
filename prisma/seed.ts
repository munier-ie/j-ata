import { PrismaClient, FacilityStatus, FacilityType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Create the Prisma client with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.grazingPermit.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.report.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.veterinaryClinic.deleteMany();
  await prisma.ranch.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.managementMember.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // ============= ADMIN USERS =============
  console.log('👤 Creating admin users...');

  const adminUsers = [
    { email: 'admin@jigawa.gov.ng', password: 'Admin@123', role: 'admin' as const, fullName: 'System Administrator' },
    { email: 'commissioner@jigawa.gov.ng', password: 'Comm@123', role: 'admin' as const, fullName: 'Prof. Saleem Abdurrahman' },
    { email: 'moderator@jigawa.gov.ng', password: 'Mod@123', role: 'moderator' as const, fullName: 'Content Moderator' }
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
      name: 'Prof. Saleem Abdurrahman',
      role: 'Honourable Commissioner',
      imageUrl: '/Hon. commissioner.png',
      bio: 'Prof. Saleem Abdurrahman is the Honourable Commissioner for Livestock Development, Jigawa State. With over 25 years of experience in agricultural development and veterinary sciences, he leads the ministry\'s vision to transform the livestock sector.',
      isCommissioner: true,
      sortOrder: 0
    },
    {
      name: 'Dr. Aminu Bello Muhammad',
      role: 'Permanent Secretary',
      imageUrl: '/director-vet.png',
      bio: 'Dr. Aminu Bello Muhammad serves as the Permanent Secretary, overseeing the administrative functions of the ministry and ensuring effective implementation of livestock development policies.',
      isCommissioner: false,
      sortOrder: 1
    },
    {
      name: 'Alhaji Musa Ibrahim',
      role: 'Director, Veterinary Services',
      imageUrl: '/director-animal.png',
      bio: 'Alhaji Musa Ibrahim heads the Veterinary Services department, coordinating animal health programs and disease control initiatives across Jigawa State.',
      isCommissioner: false,
      sortOrder: 2
    },
    {
      name: 'Hajiya Fatima Yusuf',
      role: 'Director, Livestock Production',
      imageUrl: '/director-economics.png',
      bio: 'Hajiya Fatima Yusuf leads the Livestock Production department, focusing on breed improvement programs and sustainable livestock farming practices.',
      isCommissioner: false,
      sortOrder: 3
    },
    {
      name: 'Dr. Abdullahi Garba',
      role: 'Director, Ranch Development',
      imageUrl: '/director-range.png',
      bio: 'Dr. Abdullahi Garba oversees the Ranch Development department, managing the establishment and maintenance of grazing reserves and ranches across the state.',
      isCommissioner: false,
      sortOrder: 4
    },
    {
      name: 'Mallam Usman Adamu',
      role: 'Director, Planning & Statistics',
      imageUrl: '/director-planning.png',
      bio: 'Mallam Usman Adamu coordinates planning activities and maintains statistical data for informed decision-making in livestock development.',
      isCommissioner: false,
      sortOrder: 5
    }
  ];

  for (const member of managementMembers) {
    await prisma.managementMember.create({ data: member });
  }
  console.log(`   ✓ Created ${managementMembers.length} management members`);

  // ============= RANCHES =============
  console.log('🏞️  Seeding ranches...');

  const jigawaLGAs = [
    'Auyo', 'Babura', 'Birniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 
    'Garki', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa',
    'Kaugama', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori',
    'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
  ];

  const ranches = [
    {
      name: 'Dutse Central Ranch',
      lga: 'Dutse',
      zone: 'Dutse Zone',
      address: 'Along Dutse-Kano Road, Dutse',
      latitude: 11.7566,
      longitude: 9.3387,
      totalHectares: 5000,
      capacityCattle: 10000,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 500000000,
      budgetSpent: 485000000,
      hasWater: true,
      hasPower: true,
      hasVeterinaryClinic: true,
      hasFeedFacilities: true,
      hasSchool: true,
      hasHealthCenter: true
    },
    {
      name: 'Hadejia Grazing Reserve',
      lga: 'Hadejia',
      zone: 'Hadejia Zone',
      address: 'Hadejia Town, off Nguru Road',
      latitude: 12.4530,
      longitude: 10.0444,
      totalHectares: 3500,
      capacityCattle: 7000,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 350000000,
      budgetSpent: 342000000,
      hasWater: true,
      hasPower: true,
      hasVeterinaryClinic: true,
      hasFeedFacilities: true,
      hasSchool: false,
      hasHealthCenter: true
    },
    {
      name: 'Kazaure Model Ranch',
      lga: 'Kazaure',
      zone: 'Kazaure Zone',
      address: 'Kazaure Town',
      latitude: 12.6489,
      longitude: 8.4106,
      totalHectares: 4200,
      capacityCattle: 8500,
      status: 'under_construction' as FacilityStatus,
      completionPercentage: 75,
      budgetAllocated: 420000000,
      budgetSpent: 315000000,
      hasWater: true,
      hasPower: true,
      hasVeterinaryClinic: true,
      hasFeedFacilities: false,
      hasSchool: false,
      hasHealthCenter: false
    },
    {
      name: 'Gumel Livestock Ranch',
      lga: 'Gumel',
      zone: 'Gumel Zone',
      address: 'Gumel Town, Near Water Board',
      latitude: 12.6267,
      longitude: 9.3850,
      totalHectares: 2800,
      capacityCattle: 5500,
      status: 'under_construction' as FacilityStatus,
      completionPercentage: 60,
      budgetAllocated: 280000000,
      budgetSpent: 168000000,
      hasWater: true,
      hasPower: false,
      hasVeterinaryClinic: true,
      hasFeedFacilities: false,
      hasSchool: false,
      hasHealthCenter: false
    },
    {
      name: 'Birnin Kudu Ranch',
      lga: 'Birnin Kudu',
      zone: 'Birnin Kudu Zone',
      address: 'Along Birnin Kudu-Kano Road',
      latitude: 11.4517,
      longitude: 9.4828,
      totalHectares: 3000,
      capacityCattle: 6000,
      status: 'planned' as FacilityStatus,
      completionPercentage: 15,
      budgetAllocated: 300000000,
      budgetSpent: 45000000,
      hasWater: false,
      hasPower: false,
      hasVeterinaryClinic: false,
      hasFeedFacilities: false,
      hasSchool: false,
      hasHealthCenter: false
    },
    {
      name: 'Ringim Pastoral Settlement',
      lga: 'Ringim',
      zone: 'Ringim Zone',
      address: 'Ringim Town',
      latitude: 12.1500,
      longitude: 9.1614,
      totalHectares: 2500,
      capacityCattle: 5000,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 250000000,
      budgetSpent: 248000000,
      hasWater: true,
      hasPower: true,
      hasVeterinaryClinic: true,
      hasFeedFacilities: true,
      hasSchool: true,
      hasHealthCenter: true
    },
    {
      name: 'Jahun Grazing Area',
      lga: 'Jahun',
      zone: 'Jahun Zone',
      address: 'Near Jahun General Hospital',
      latitude: 12.1667,
      longitude: 9.6167,
      totalHectares: 1800,
      capacityCattle: 3600,
      status: 'rehabilitated' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 180000000,
      budgetSpent: 175000000,
      hasWater: true,
      hasPower: true,
      hasVeterinaryClinic: true,
      hasFeedFacilities: true,
      hasSchool: false,
      hasHealthCenter: false
    },
    {
      name: 'Maigatari Border Ranch',
      lga: 'Maigatari',
      zone: 'Maigatari Zone',
      address: 'Near Nigeria-Niger Border',
      latitude: 12.8000,
      longitude: 9.4333,
      totalHectares: 4500,
      capacityCattle: 9000,
      status: 'planned' as FacilityStatus,
      completionPercentage: 5,
      budgetAllocated: 450000000,
      budgetSpent: 22500000,
      hasWater: false,
      hasPower: false,
      hasVeterinaryClinic: false,
      hasFeedFacilities: false,
      hasSchool: false,
      hasHealthCenter: false
    }
  ];

  for (const ranch of ranches) {
    await prisma.ranch.create({ data: ranch });
  }
  console.log(`   ✓ Created ${ranches.length} ranches`);

  // ============= VETERINARY CLINICS =============
  console.log('🏥 Seeding veterinary clinics...');

  const clinics = [
    {
      name: 'Dutse Central Veterinary Hospital',
      facilityType: 'central_referral' as FacilityType,
      lga: 'Dutse',
      zone: 'Dutse Zone',
      address: 'Ministry of Livestock Complex, Dutse',
      latitude: 11.7566,
      longitude: 9.3387,
      capacity: 500,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 150000000,
      budgetSpent: 148000000,
      hasWater: true,
      hasPower: true,
      services: ['Surgery', 'Diagnosis', 'Vaccination', 'Laboratory', 'Emergency Care', 'Artificial Insemination'],
      contactPhone: '+234 803 123 4567',
      contactEmail: 'dutse.vet@jigawa.gov.ng'
    },
    {
      name: 'Hadejia Zonal Veterinary Clinic',
      facilityType: 'zonal_clinic' as FacilityType,
      lga: 'Hadejia',
      zone: 'Hadejia Zone',
      address: 'Near Hadejia Emirate Council',
      latitude: 12.4530,
      longitude: 10.0444,
      capacity: 200,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 80000000,
      budgetSpent: 78500000,
      hasWater: true,
      hasPower: true,
      services: ['Vaccination', 'Treatment', 'Diagnosis', 'Deworming'],
      contactPhone: '+234 803 234 5678',
      contactEmail: 'hadejia.vet@jigawa.gov.ng'
    },
    {
      name: 'Kazaure Zonal Veterinary Clinic',
      facilityType: 'zonal_clinic' as FacilityType,
      lga: 'Kazaure',
      zone: 'Kazaure Zone',
      address: 'Kazaure Town Center',
      latitude: 12.6489,
      longitude: 8.4106,
      capacity: 180,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 75000000,
      budgetSpent: 74000000,
      hasWater: true,
      hasPower: true,
      services: ['Vaccination', 'Treatment', 'Diagnosis'],
      contactPhone: '+234 803 345 6789',
      contactEmail: 'kazaure.vet@jigawa.gov.ng'
    },
    {
      name: 'Gumel LGA Veterinary Post',
      facilityType: 'lga_clinic' as FacilityType,
      lga: 'Gumel',
      zone: 'Gumel Zone',
      address: 'Gumel Local Government Secretariat',
      latitude: 12.6267,
      longitude: 9.3850,
      capacity: 80,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 25000000,
      budgetSpent: 24500000,
      hasWater: true,
      hasPower: true,
      services: ['Vaccination', 'Basic Treatment', 'Deworming'],
      contactPhone: '+234 803 456 7890',
      contactEmail: 'gumel.vet@jigawa.gov.ng'
    },
    {
      name: 'Birnin Kudu LGA Veterinary Post',
      facilityType: 'lga_clinic' as FacilityType,
      lga: 'Birnin Kudu',
      zone: 'Birnin Kudu Zone',
      address: 'Near Birnin Kudu Market',
      latitude: 11.4517,
      longitude: 9.4828,
      capacity: 100,
      status: 'under_construction' as FacilityStatus,
      completionPercentage: 70,
      budgetAllocated: 30000000,
      budgetSpent: 21000000,
      hasWater: true,
      hasPower: false,
      services: ['Vaccination', 'Basic Treatment'],
      contactPhone: '+234 803 567 8901',
      contactEmail: 'bkudu.vet@jigawa.gov.ng'
    },
    {
      name: 'Ringim LGA Veterinary Post',
      facilityType: 'lga_clinic' as FacilityType,
      lga: 'Ringim',
      zone: 'Ringim Zone',
      address: 'Ringim Market Area',
      latitude: 12.1500,
      longitude: 9.1614,
      capacity: 90,
      status: 'operational' as FacilityStatus,
      completionPercentage: 100,
      budgetAllocated: 28000000,
      budgetSpent: 27500000,
      hasWater: true,
      hasPower: true,
      services: ['Vaccination', 'Treatment', 'Deworming'],
      contactPhone: '+234 803 678 9012',
      contactEmail: 'ringim.vet@jigawa.gov.ng'
    }
  ];

  for (const clinic of clinics) {
    await prisma.veterinaryClinic.create({ data: clinic });
  }
  console.log(`   ✓ Created ${clinics.length} veterinary clinics`);

  // ============= FARMERS =============
  console.log('🧑‍🌾 Seeding farmers...');

  const hausaFirstNames = ['Musa', 'Ibrahim', 'Sani', 'Abdullahi', 'Usman', 'Garba', 'Aminu', 'Yusuf', 'Shehu', 'Aliyu', 'Bello', 'Yakubu', 'Haruna', 'Isa', 'Abubakar'];
  const hausaLastNames = ['Mohammed', 'Umar', 'Danjuma', 'Adamu', 'Suleiman', 'Hassan', 'Bala', 'Dauda', 'Yunusa', 'Abdulkadir', 'Idris', 'Ismail', 'Ahmad', 'Kabir', 'Lawal'];
  const communities = ['Gidan Sarki', 'Unguwar Uku', 'Tudun Wada', 'Sabon Gari', 'Rafin Sanyi', 'Bakin Kogi', 'Farin Ruwa', 'Gidan Malam', 'Unguwar Doka', 'Makera'];
  const wards = ['Ward A', 'Ward B', 'Ward C', 'Ward D', 'Central Ward', 'North Ward', 'South Ward', 'East Ward', 'West Ward'];
  const livestockOptions = ['Cattle', 'Goats', 'Sheep', 'Poultry', 'Camels', 'Donkeys'];
  const statuses = ['approved', 'pending', 'verified'];

  const farmers = [];
  for (let i = 0; i < 50; i++) {
    const firstName = hausaFirstNames[Math.floor(Math.random() * hausaFirstNames.length)];
    const lastName = hausaLastNames[Math.floor(Math.random() * hausaLastNames.length)];
    const lga = jigawaLGAs[Math.floor(Math.random() * jigawaLGAs.length)];
    const numLivestockTypes = Math.floor(Math.random() * 3) + 1;
    const selectedLivestock = [...livestockOptions].sort(() => 0.5 - Math.random()).slice(0, numLivestockTypes);

    farmers.push({
      farmerId: `JG-${String(2024001 + i).padStart(7, '0')}`,
      firstName,
      lastName,
      phone: `+234 80${Math.floor(Math.random() * 10)}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      nin: Math.random() > 0.3 ? String(Math.floor(Math.random() * 90000000000) + 10000000000) : null,
      lga,
      ward: wards[Math.floor(Math.random() * wards.length)],
      community: communities[Math.floor(Math.random() * communities.length)],
      herdSize: Math.floor(Math.random() * 200) + 10,
      livestockTypes: selectedLivestock,
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
      title: 'Governor Launches New Ranch Development Initiative',
      slug: 'governor-launches-new-ranch-development-initiative',
      content: `His Excellency, the Executive Governor of Jigawa State, has officially launched a comprehensive ranch development initiative aimed at transforming the livestock sector in the state.

The initiative, valued at over ₦2 billion, will see the establishment of modern ranching facilities across all 27 local government areas of the state. The project is expected to benefit over 50,000 pastoralists and their families.

Speaking at the launch ceremony held at the Ministry of Livestock headquarters in Dutse, the Governor emphasized the importance of sustainable livestock farming practices and the need to reduce farmer-herder conflicts through proper land allocation and management.

The project will be implemented in three phases over the next five years, with the first phase focusing on five pilot LGAs including Dutse, Hadejia, Kazaure, Gumel, and Birnin Kudu.`,
      excerpt: 'Governor launches ₦2 billion ranch development initiative to transform livestock sector',
      imageUrl: '/news/ranch-launch.jpg',
      category: 'Development',
      isPublished: true,
      publishedAt: new Date('2024-12-15')
    },
    {
      title: 'Mass Vaccination Campaign Reaches 500,000 Cattle',
      slug: 'mass-vaccination-campaign-reaches-500000-cattle',
      content: `The Ministry of Livestock Development has successfully completed its annual mass vaccination campaign, reaching over 500,000 cattle across Jigawa State.

The campaign, which ran from October to December 2024, targeted common livestock diseases including Contagious Bovine Pleuropneumonia (CBPP), Foot and Mouth Disease (FMD), and Peste des Petits Ruminants (PPR).

The Director of Veterinary Services, Alhaji Musa Ibrahim, commended the field officers and community leaders for their dedication in ensuring the success of the campaign.

"This year's campaign has been our most successful yet, and we are confident that it will significantly reduce disease outbreaks in the coming year," he said.`,
      excerpt: 'Annual vaccination campaign successfully covers over 500,000 cattle statewide',
      imageUrl: '/news/vaccination-campaign.jpg',
      category: 'Health',
      isPublished: true,
      publishedAt: new Date('2024-12-10')
    },
    {
      title: 'Jigawa Partners with Federal Government on Livestock Transformation',
      slug: 'jigawa-partners-federal-government-livestock-transformation',
      content: `Jigawa State Government has signed a Memorandum of Understanding (MoU) with the Federal Ministry of Agriculture for the implementation of the National Livestock Transformation Plan (NLTP).

Under the agreement, Jigawa State will receive technical and financial support for the development of ranching infrastructure, establishment of livestock markets, and capacity building for pastoralists.

The Honourable Commissioner for Livestock Development, Prof. Saleem Abdurrahman, described the partnership as a significant milestone in the state's effort to modernize its livestock sector.

The partnership will also facilitate access to credit facilities for registered farmers through the Bank of Agriculture and other financial institutions.`,
      excerpt: 'State signs MoU with Federal Government for livestock transformation program',
      imageUrl: '/news/federal-partnership.jpg',
      category: 'Partnership',
      isPublished: true,
      publishedAt: new Date('2024-11-28')
    },
    {
      title: 'New Veterinary Laboratory Opens in Dutse',
      slug: 'new-veterinary-laboratory-opens-dutse',
      content: `A state-of-the-art veterinary diagnostic laboratory has been officially commissioned at the Central Veterinary Hospital in Dutse.

The facility, equipped with modern diagnostic equipment, will enhance the capacity of the Ministry to detect and respond to disease outbreaks promptly.

The laboratory can conduct tests for over 30 different livestock diseases and has cold chain facilities for vaccine storage.

The Commissioner noted that the laboratory will also serve as a training center for veterinary officers from across the state.`,
      excerpt: 'Modern diagnostic laboratory commissioned to enhance disease detection',
      imageUrl: '/news/vet-lab.jpg',
      category: 'Infrastructure',
      isPublished: true,
      publishedAt: new Date('2024-11-15')
    },
    {
      title: 'Farmers Training Program Graduates 200 Pastoralists',
      slug: 'farmers-training-program-graduates-200-pastoralists',
      content: `The Ministry of Livestock Development has graduated 200 pastoralists from its intensive livestock management training program.

The three-month program covered topics including modern animal husbandry practices, disease prevention, pasture management, and basic business skills.

Participants also received starter kits comprising veterinary first aid supplies, improved breeds, and nutritional supplements for their animals.

The program is part of the state government's effort to improve productivity and sustainability in the livestock sector.

The Permanent Secretary announced that the next batch of training will commence in January 2025, with priority given to women and youth in pastoral communities.`,
      excerpt: '200 pastoralists complete intensive training on modern livestock management',
      imageUrl: '/news/training-graduation.jpg',
      category: 'Training',
      isPublished: true,
      publishedAt: new Date('2024-10-30')
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
      title: 'Annual Livestock Census Report 2024',
      description: 'Comprehensive census of livestock population across all 27 LGAs of Jigawa State',
      category: 'census',
      fileUrl: '/reports/livestock-census-2024.pdf',
      isPublished: true
    },
    {
      title: 'Veterinary Services Q3 2024 Report',
      description: 'Quarterly report on veterinary services delivery, vaccinations, and disease surveillance',
      category: 'quarterly',
      fileUrl: '/reports/vet-services-q3-2024.pdf',
      isPublished: true
    },
    {
      title: 'Ranch Development Progress Report',
      description: 'Status update on ranch establishment and infrastructure development across the state',
      category: 'progress',
      fileUrl: '/reports/ranch-progress-2024.pdf',
      isPublished: true
    },
    {
      title: 'Budget Performance Report 2024',
      description: 'Financial report showing budget allocation and expenditure for livestock development programs',
      category: 'financial',
      fileUrl: '/reports/budget-performance-2024.pdf',
      isPublished: true
    }
  ];

  for (const report of reports) {
    await prisma.report.create({ data: report });
  }
  console.log(`   ✓ Created ${reports.length} reports`);

  // ============= GRAZING PERMITS =============
  console.log('📜 Seeding sample grazing permits...');

  const grazingPermits = [
    {
      receiptId: 'GP-2024-10001',
      nin: '12345678901',
      fullName: 'Musa Ibrahim Danjuma',
      phone: '+234 803 123 4567',
      lga: 'Dutse',
      ward: 'Limawa',
      community: 'Gidan Sarki',
      address: 'Near Central Market',
      yardLength: 100,
      amount: 50000,
      paymentStatus: 'completed'
    },
    {
      receiptId: 'GP-2024-10002',
      nin: '23456789012',
      fullName: 'Sani Usman Garba',
      phone: '+234 805 234 5678',
      lga: 'Hadejia',
      ward: 'Matsaro',
      community: 'Unguwar Uku',
      address: null,
      yardLength: 75,
      amount: 37500,
      paymentStatus: 'completed'
    },
    {
      receiptId: 'GP-2024-10003',
      nin: '34567890123',
      fullName: 'Abdullahi Shehu Bello',
      phone: '+234 806 345 6789',
      lga: 'Kazaure',
      ward: 'Sabaru',
      community: 'Tudun Wada',
      address: 'Behind Emir\'s Palace',
      yardLength: 150,
      amount: 75000,
      paymentStatus: 'completed'
    },
    {
      receiptId: 'GP-2024-10004',
      nin: '45678901234',
      fullName: 'Garba Aminu Hassan',
      phone: '+234 807 456 7890',
      lga: 'Ringim',
      ward: 'Chai Chai',
      community: 'Sabon Gari',
      address: null,
      yardLength: 50,
      amount: 25000,
      paymentStatus: 'completed'
    },
    {
      receiptId: 'GP-2024-10005',
      nin: '56789012345',
      fullName: 'Yakubu Haruna Idris',
      phone: '+234 808 567 8901',
      lga: 'Gumel',
      ward: 'Danama',
      community: 'Makera',
      address: 'Near Veterinary Clinic',
      yardLength: 200,
      amount: 100000,
      paymentStatus: 'completed'
    }
  ];

  for (const permit of grazingPermits) {
    await prisma.grazingPermit.create({ data: permit });
  }
  console.log(`   ✓ Created ${grazingPermits.length} grazing permits`);

  console.log('\n✅ Database seeding completed successfully!');
  console.log('\nSummary:');
  console.log(`   • ${adminUsers.length} admin users (with bcrypt hashed passwords)`);
  console.log(`   • ${managementMembers.length} management members`);
  console.log(`   • ${ranches.length} ranches`);
  console.log(`   • ${clinics.length} veterinary clinics`);
  console.log(`   • ${farmers.length} farmers`);
  console.log(`   • ${newsArticles.length} news articles`);
  console.log(`   • ${reports.length} reports`);
  console.log(`   • ${grazingPermits.length} grazing permits`);
  console.log('\nAdmin Credentials:');
  console.log('   • admin@jigawa.gov.ng / Admin@123');
  console.log('   • commissioner@jigawa.gov.ng / Comm@123');
  console.log('   • moderator@jigawa.gov.ng / Mod@123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
