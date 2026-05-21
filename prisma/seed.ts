import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prismaInstance = new PrismaClient();
const prisma = prismaInstance as any;

async function main() {
  console.log('🌱 Starting database seed...\n');

  console.log('🗑️  Clearing existing data...');
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
