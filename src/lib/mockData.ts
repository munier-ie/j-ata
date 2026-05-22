// LocalStorage seed dataset for JATA (Jigawa Agricultural Transformation Agency)
// Provides complete, rich, mock data when running fully client-side

// Generate standard UUID format or simple unique ID
export const generateId = () => {
  return 'mock-uuid-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const jigawaLGAs = ['Dutse', 'Hadejia', 'Kazaure', 'Gumel', 'Birnin Kudu', 'Ringim', 'Jahun', 'Maigatari'];
const cropOptions = ['Rice', 'Wheat', 'Sesame', 'Hibiscus', 'Maize', 'Sorghum'];
const statuses = ['approved', 'pending', 'verified'];

// Helper to generate 50 mock farmers
const generateMockFarmers = () => {
  const farmers = [];
  const firstNames = ['Ibrahim', 'Musa', 'Bello', 'Aliyu', 'Garba', 'Saidu', 'Abubakar', 'Kabiru', 'Amina', 'Fatima', 'Zainab', 'Aisha', 'Haruna', 'Sani', 'Usman', 'Muhammad', 'Yusuf', 'Umar', 'Salisu', 'Adamu'];
  const lastNames = ['Haruna', 'Aliyu', 'Shehu', 'Garko', 'Dutse', 'Gumel', 'Ringim', 'Hadejia', 'Kazaure', 'Jahun', 'Baffa', 'Makarfi', 'Bala', 'Adam', 'Aminu', 'Jibrin', 'Saleh', 'Isah', 'Suleiman', 'Idris'];

  for (let i = 0; i < 50; i++) {
    const numCrops = Math.floor(Math.random() * 3) + 1;
    const selectedCrops = [...cropOptions].sort(() => 0.5 - Math.random()).slice(0, numCrops);
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const lga = jigawaLGAs[i % jigawaLGAs.length];
    const status = statuses[i % statuses.length];
    const farmerId = `JG-${String(2025001 + i).padStart(7, '0')}`;

    // Add properties matching both camelCase (DB/Frontend models) and snake_case for complete compatibility
    farmers.push({
      id: generateId(),
      farmerId,
      farmer_id: farmerId,
      firstName,
      first_name: firstName,
      lastName,
      last_name: lastName,
      phone: `+234 80${(i % 9) + 1}${String(Math.floor(1000000 + (i * 12345) % 8999999))}`,
      nin: Math.random() > 0.3 ? String(Math.floor(10000000000 + (i * 987654) % 89999999999)) : null,
      lga,
      ward: 'Central Ward',
      community: 'Main Community',
      farmSize: Math.floor((i * 7.5) % 19) + 2,
      farm_size: Math.floor((i * 7.5) % 19) + 2,
      cropTypes: selectedCrops,
      crop_types: selectedCrops.join(','),
      status,
      passportUrl: `/farmers/farmer-${(i % 5) + 1}.png`,
      passport_url: `/farmers/farmer-${(i % 5) + 1}.png`,
      createdAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  return farmers;
};

// Seeding standard management members
export const seedManagementMembers = [
  {
    id: 'member-1',
    name: 'Dr. Saifullahi Umar',
    role: 'Director General',
    imageUrl: '/Hon. commissioner.png',
    image_url: '/Hon. commissioner.png',
    bio: 'Leading the Jigawa Agricultural Transformation Agency to modernize farming across the state.',
    isCommissioner: true,
    is_commissioner: true,
    sortOrder: 0,
    sort_order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'member-2',
    name: 'Director of Analytics',
    role: 'Director of Analytics',
    imageUrl: '/director-vet.png',
    image_url: '/director-vet.png',
    bio: 'Driving data-backed agricultural decisions and crop yield analysis.',
    isCommissioner: false,
    is_commissioner: false,
    sortOrder: 1,
    sort_order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'member-3',
    name: 'Director of Delivery',
    role: 'Director of Delivery',
    imageUrl: '/director-animal.png',
    image_url: '/director-animal.png',
    bio: 'Ensuring execution of agricultural initiatives on the ground.',
    isCommissioner: false,
    is_commissioner: false,
    sortOrder: 2,
    sort_order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'member-4',
    name: 'Director of Operations',
    role: 'Director of Operations',
    imageUrl: '/director-economics.png',
    image_url: '/director-economics.png',
    bio: 'Overseeing day-to-day agricultural operations and extension services.',
    isCommissioner: false,
    is_commissioner: false,
    sortOrder: 3,
    sort_order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seeding standard news articles
export const seedNewsArticles = [
  {
    id: 'news-1',
    title: 'Jigawa State and IITA Forge Transformative Partnership',
    slug: 'jigawa-state-and-iita-forge-transformative-partnership',
    content: 'The Jigawa State Government, represented by the Jigawa Agricultural Transformation Agency (J-ATA), has officially entered into a transformative Memorandum of Understanding (MoU) with the International Institute of Tropical Agriculture (IITA). This landmark collaboration is set to revolutionize Jigawa’s agricultural sector by implementing state-of-the-art climate-smart farming solutions, improved crop varieties, and robust knowledge sharing ecosystems to empower local smallholder farmers and scale state agritech initiatives.',
    excerpt: 'Partnership focused on agricultural transformation.',
    imageUrl: '/news/ranch-launch.jpg',
    image_url: '/news/ranch-launch.jpg',
    category: 'Partnership',
    isPublished: true,
    is_published: true,
    publishedAt: new Date('2025-01-15').toISOString(),
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 'news-2',
    title: 'J-ATA Unveils Ambitious Vision',
    slug: 'jata-unveils-ambitious-vision',
    content: 'J-ATA has formally inaugurated its operational mandate with a one-day intensive induction training for its core staff. The agency is prepared to deploy intelligent tracking networks and mobile training extension services to all 27 Local Government Areas of Jigawa. This rollout is designed to directly support small farmers, optimize fertilizer deployment, and monitor regional food security in real time.',
    excerpt: 'Ambitious vision for agricultural transformation.',
    imageUrl: '/news/vaccination-campaign.jpg',
    image_url: '/news/vaccination-campaign.jpg',
    category: 'Development',
    isPublished: true,
    is_published: true,
    publishedAt: new Date('2025-02-10').toISOString(),
    createdAt: new Date('2025-02-10').toISOString(),
    updatedAt: new Date('2025-02-10').toISOString()
  }
];

// Seeding standard reports
export const seedReports = [
  {
    id: 'report-1',
    title: 'Annual Crop Yield Report 2024',
    description: 'Comprehensive report on agricultural output and regional yield analytics across Jigawa State.',
    category: 'agriculture',
    fileUrl: '/reports/crop-yield-2024.pdf',
    file_url: '/reports/crop-yield-2024.pdf',
    isPublished: true,
    is_published: true,
    uploadedBy: 'JATA Admin',
    uploaded_by: 'JATA Admin',
    createdAt: new Date('2024-12-15').toISOString(),
    updatedAt: new Date('2024-12-15').toISOString()
  }
];

// Seeding veterinary clinics
export const seedClinics = [
  {
    id: 'clinic-1',
    name: 'Dutse Central Veterinary Clinic',
    lga: 'Dutse',
    zone: 'Jigawa Central',
    address: 'Opposite State Secretariat, Dutse',
    status: 'operational',
    capacity: 500,
    facilityType: 'General Clinic',
    facility_type: 'General Clinic',
    completionPercentage: 100,
    completion_percentage: 100,
    contactEmail: 'dutse.vet@jata.gov.ng',
    contact_email: 'dutse.vet@jata.gov.ng',
    contactPhone: '08031234567',
    contact_phone: '08031234567',
    hasPower: true,
    has_power: true,
    hasWater: true,
    has_water: true,
    services: ['Vaccination', 'Surgery', 'Consultation', 'Diagnostics'],
    budgetAllocated: 45000000,
    budget_allocated: 45000000,
    budgetSpent: 42500000,
    budget_spent: 42500000,
    latitude: 11.7022,
    longitude: 9.3340,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'clinic-2',
    name: 'Hadejia Zonal Veterinary Hospital',
    lga: 'Hadejia',
    zone: 'Jigawa Northeast',
    address: 'Hospital Road, Hadejia',
    status: 'rehabilitated',
    capacity: 800,
    facilityType: 'Zonal Hospital',
    facility_type: 'Zonal Hospital',
    completionPercentage: 100,
    completion_percentage: 100,
    contactEmail: 'hadejia.vet@jata.gov.ng',
    contact_email: 'hadejia.vet@jata.gov.ng',
    contactPhone: '08032223344',
    contact_phone: '08032223344',
    hasPower: true,
    has_power: true,
    hasWater: true,
    has_water: true,
    services: ['Vaccination', 'Surgery', 'Emergency Care', 'Inpatient', 'Diagnostics'],
    budgetAllocated: 75000000,
    budget_allocated: 75000000,
    budgetSpent: 75000000,
    budget_spent: 75000000,
    latitude: 12.4506,
    longitude: 10.0404,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'clinic-3',
    name: 'Kazaure Extension Veterinary Center',
    lga: 'Kazaure',
    zone: 'Jigawa Northwest',
    address: 'Kazaure-Kano Road, Kazaure',
    status: 'under_construction',
    capacity: 300,
    facilityType: 'Extension Center',
    facility_type: 'Extension Center',
    completionPercentage: 65,
    completion_percentage: 65,
    contactEmail: 'kazaure.vet@jata.gov.ng',
    contact_email: 'kazaure.vet@jata.gov.ng',
    contactPhone: '08035556677',
    contact_phone: '08035556677',
    hasPower: false,
    has_power: false,
    hasWater: true,
    has_water: true,
    services: ['Vaccination', 'Consultation'],
    budgetAllocated: 30000000,
    budget_allocated: 30000000,
    budgetSpent: 19500000,
    budget_spent: 19500000,
    latitude: 12.6475,
    longitude: 8.4101,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'clinic-4',
    name: 'Gumel Livestock Health Post',
    lga: 'Gumel',
    zone: 'Jigawa North',
    address: 'Near Livestock Market, Gumel',
    status: 'planned',
    capacity: 200,
    facilityType: 'Health Post',
    facility_type: 'Health Post',
    completionPercentage: 15,
    completion_percentage: 15,
    contactEmail: 'gumel.vet@jata.gov.ng',
    contact_email: 'gumel.vet@jata.gov.ng',
    contactPhone: '08039998877',
    contact_phone: '08039998877',
    hasPower: false,
    has_power: false,
    hasWater: false,
    has_water: false,
    services: ['Vaccination', 'Consultation'],
    budgetAllocated: 20000000,
    budget_allocated: 20000000,
    budgetSpent: 3000000,
    budget_spent: 3000000,
    latitude: 12.6269,
    longitude: 9.3881,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seeding grazing reserves / ranches
export const seedRanches = [
  {
    id: 'ranch-1',
    name: 'Birnin Kudu Model Grazing Reserve',
    lga: 'Birnin Kudu',
    zone: 'Jigawa South',
    address: 'Birnin Kudu Reserve Area',
    status: 'operational',
    totalHectares: 2500,
    total_hectares: 2500,
    capacityCattle: 15000,
    capacity_cattle: 15000,
    completionPercentage: 95,
    completion_percentage: 95,
    hasFeedFacilities: true,
    has_feed_facilities: true,
    hasSchool: true,
    has_school: true,
    hasHealthCenter: true,
    has_health_center: true,
    hasVeterinaryClinic: true,
    has_veterinary_clinic: true,
    hasPower: true,
    has_power: true,
    hasWater: true,
    has_water: true,
    budgetAllocated: 250000000,
    budget_allocated: 250000000,
    budgetSpent: 237500000,
    budget_spent: 237500000,
    latitude: 11.4586,
    longitude: 9.4784,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ranch-2',
    name: 'Jahun Commercial Cattle Ranch',
    lga: 'Jahun',
    zone: 'Jigawa East',
    address: 'Jahun-Kiyawa Road, Jahun',
    status: 'under_construction',
    totalHectares: 1800,
    total_hectares: 1800,
    capacityCattle: 10000,
    capacity_cattle: 10000,
    completionPercentage: 70,
    completion_percentage: 70,
    hasFeedFacilities: true,
    has_feed_facilities: true,
    hasSchool: false,
    has_school: false,
    hasHealthCenter: true,
    has_health_center: true,
    hasVeterinaryClinic: false,
    has_veterinary_clinic: false,
    hasPower: true,
    has_power: true,
    hasWater: true,
    has_water: true,
    budgetAllocated: 180000000,
    budget_allocated: 180000000,
    budgetSpent: 126000000,
    budget_spent: 126000000,
    latitude: 11.9619,
    longitude: 9.6247,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ranch-3',
    name: 'Maigatari Border Grazing Reserve',
    lga: 'Maigatari',
    zone: 'Jigawa Northeast',
    address: 'Border Livestock Corridor, Maigatari',
    status: 'rehabilitated',
    totalHectares: 3000,
    total_hectares: 3000,
    capacityCattle: 20000,
    capacity_cattle: 20000,
    completionPercentage: 100,
    completion_percentage: 100,
    hasFeedFacilities: true,
    has_feed_facilities: true,
    hasSchool: true,
    has_school: true,
    hasHealthCenter: true,
    has_health_center: true,
    hasVeterinaryClinic: true,
    has_veterinary_clinic: true,
    hasPower: true,
    has_power: true,
    hasWater: true,
    has_water: true,
    budgetAllocated: 320000000,
    budget_allocated: 320000000,
    budgetSpent: 320000000,
    budget_spent: 320000000,
    latitude: 12.8094,
    longitude: 9.4442,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ranch-4',
    name: 'Ringim Dairy and Grazing Reserve',
    lga: 'Ringim',
    zone: 'Jigawa Southwest',
    address: 'Ringim Reserve Forest',
    status: 'planned',
    totalHectares: 1200,
    total_hectares: 1200,
    capacityCattle: 8000,
    capacity_cattle: 8000,
    completionPercentage: 10,
    completion_percentage: 10,
    hasFeedFacilities: false,
    has_feed_facilities: false,
    hasSchool: false,
    has_school: false,
    hasHealthCenter: false,
    has_health_center: false,
    hasVeterinaryClinic: false,
    has_veterinary_clinic: false,
    hasPower: false,
    has_power: false,
    hasWater: true,
    has_water: true,
    budgetAllocated: 110000000,
    budget_allocated: 110000000,
    budgetSpent: 11000000,
    budget_spent: 11000000,
    latitude: 12.1558,
    longitude: 9.1556,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seeding export application applications
export const seedExportApplications = [
  {
    id: 'export-1',
    applicationNo: 'JATA-EXP-2026-0001',
    application_no: 'JATA-EXP-2026-0001',
    fullName: 'Bello Haruna',
    full_name: 'Bello Haruna',
    email: 'bello@harunafarms.com',
    phone: '08098765432',
    companyName: 'Haruna Agro-Allied Limited',
    company_name: 'Haruna Agro-Allied Limited',
    rcNumber: 'RC-983742',
    rc_number: 'RC-983742',
    businessAddress: '12 Hadejia Road, Dutse, Jigawa State',
    business_address: '12 Hadejia Road, Dutse, Jigawa State',
    commodityType: 'Sesame',
    commodity_type: 'Sesame',
    paymentStatus: 'paid',
    payment_status: 'paid',
    paymentAmount: 15200,
    payment_amount: 15200,
    status: 'approved',
    issuedAt: new Date('2026-01-10').toISOString(),
    issued_at: new Date('2026-01-10').toISOString(),
    expiryDate: new Date('2027-01-10').toISOString(),
    expiry_date: new Date('2027-01-10').toISOString(),
    certificateNo: 'JATA-EXP-CERT-22837',
    certificate_no: 'JATA-EXP-CERT-22837',
    signatoryName: 'Dr. Saifullahi Umar',
    signatory_name: 'Dr. Saifullahi Umar',
    signatoryTitle: 'Director General, J-ATA',
    signatory_title: 'Director General, J-ATA',
    createdAt: new Date('2026-01-08').toISOString(),
    updatedAt: new Date('2026-01-10').toISOString()
  },
  {
    id: 'export-2',
    applicationNo: 'JATA-EXP-2026-0002',
    application_no: 'JATA-EXP-2026-0002',
    fullName: 'Aisha Aliyu',
    full_name: 'Aisha Aliyu',
    email: 'aisha@jigawaexporters.org',
    phone: '08123456789',
    companyName: 'Jigawa Hibiscus Exporters',
    company_name: 'Jigawa Hibiscus Exporters',
    rcNumber: 'RC-104928',
    rc_number: 'RC-104928',
    businessAddress: 'Sector A, Industrial Layout, Hadejia, Jigawa State',
    business_address: 'Sector A, Industrial Layout, Hadejia, Jigawa State',
    commodityType: 'Hibiscus',
    commodity_type: 'Hibiscus',
    paymentStatus: 'paid',
    payment_status: 'paid',
    paymentAmount: 15200,
    payment_amount: 15200,
    status: 'pending',
    issuedAt: null,
    issued_at: null,
    expiryDate: null,
    expiry_date: null,
    certificateNo: null,
    certificate_no: null,
    signatoryName: null,
    signatory_name: null,
    signatoryTitle: null,
    signatory_title: null,
    createdAt: new Date('2026-05-15').toISOString(),
    updatedAt: new Date('2026-05-15').toISOString()
  },
  {
    id: 'export-3',
    applicationNo: 'JATA-EXP-2026-0003',
    application_no: 'JATA-EXP-2026-0003',
    fullName: 'Garba Shehu',
    full_name: 'Garba Shehu',
    email: 'garba@gumjigawa.com',
    phone: '09011122233',
    companyName: 'Sahel Gum Arabic Enterprise',
    company_name: 'Sahel Gum Arabic Enterprise',
    rcNumber: 'RC-482019',
    rc_number: 'RC-482019',
    businessAddress: 'Gum Arabic Depot, Kazaure, Jigawa State',
    business_address: 'Gum Arabic Depot, Kazaure, Jigawa State',
    commodityType: 'Gum Arabic',
    commodity_type: 'Gum Arabic',
    paymentStatus: 'paid',
    payment_status: 'paid',
    paymentAmount: 15200,
    payment_amount: 15200,
    status: 'expired',
    issuedAt: new Date('2025-05-15').toISOString(),
    issued_at: new Date('2025-05-15').toISOString(),
    expiryDate: new Date('2026-05-15').toISOString(),
    expiry_date: new Date('2026-05-15').toISOString(),
    certificateNo: 'JATA-EXP-CERT-11942',
    certificate_no: 'JATA-EXP-CERT-11942',
    signatoryName: 'Dr. Saifullahi Umar',
    signatory_name: 'Dr. Saifullahi Umar',
    signatoryTitle: 'Director General, J-ATA',
    signatory_title: 'Director General, J-ATA',
    createdAt: new Date('2025-05-10').toISOString(),
    updatedAt: new Date('2025-05-15').toISOString()
  }
];

// Seeding startup applications
export const seedStartups = [
  {
    id: 'startup-1',
    userId: 'user-startup-1',
    status: 'Pending',
    answers: {
      fullName: 'Ahmad Ibrahim',
      email: 'ahmad@agritech.ng',
      phone: '08033221144',
      startupName: 'Jigawa Smart Irrigation',
      sector: 'AgTech',
      stage: 'ideation',
      description: 'Solar-powered automated drip irrigation systems custom designed for the dry Sahel regions of Jigawa.',
      goals: 'To secure pilot funding and build our first 10 farm deployment prototypes.',
      milestones: '30% on hardware sourcing, 40% on community installation, 30% on field calibration.',
      paymentMethod: 'card'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'startup-2',
    userId: 'user-startup-2',
    status: 'Accepted',
    answers: {
      fullName: 'Mustapha Bello',
      email: 'mustapha@kallifarms.com',
      phone: '07066554433',
      startupName: 'Kalli Tomatoes Processing',
      sector: 'Processing',
      stage: 'mvp',
      description: 'Preserving tomato crop yields by converting surplus harvests into high-grade organic paste sachets.',
      goals: 'Set up our regional dry-house processing machinery in Birnin Kudu.',
      milestones: '50% on solar dehydrator kits, 50% on distribution supply chain logistics.',
      paymentMethod: 'transfer'
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seeding ppp applications
export const seedPpps = [
  {
    id: 'ppp-1',
    companyName: 'Sahel Allied Food Corp',
    contactPerson: 'Aliyu Hadejia',
    email: 'aliyu@sahelfood.com',
    phone: '08022334455',
    selectedProject: 'Hadejia Rice Valley Rehabilitation Project',
    proposedInvestment: '₦120,000,000',
    expectedRoi: '18% Annualized',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Seeding contact submissions
export const seedContactSubmissions = [
  {
    id: 'contact-1',
    fullName: 'Adamu Jahun',
    email: 'adamu@jahunagri.org',
    phone: '08055443322',
    subject: 'Onboarding extension request',
    message: 'Could J-ATA supply additional fertilizer distribution support to Jahun central ward this cropping season?',
    createdAt: new Date().toISOString()
  }
];

// Main seeding router to write everything into browser localStorage
export const initializeLocalStorageSeed = () => {
  if (!localStorage.getItem('jata_farmers')) {
    localStorage.setItem('jata_farmers', JSON.stringify([]));
  }
  if (!localStorage.getItem('jata_management')) {
    localStorage.setItem('jata_management', JSON.stringify(seedManagementMembers));
  }
  if (!localStorage.getItem('jata_news')) {
    localStorage.setItem('jata_news', JSON.stringify(seedNewsArticles));
  }
  if (!localStorage.getItem('jata_reports')) {
    localStorage.setItem('jata_reports', JSON.stringify(seedReports));
  }
  if (!localStorage.getItem('jata_clinics')) {
    localStorage.setItem('jata_clinics', JSON.stringify(seedClinics));
  }
  if (!localStorage.getItem('jata_ranches')) {
    localStorage.setItem('jata_ranches', JSON.stringify(seedRanches));
  }
  if (!localStorage.getItem('jata_export_applications')) {
    localStorage.setItem('jata_export_applications', JSON.stringify(seedExportApplications));
  }
  if (!localStorage.getItem('jata_startups')) {
    localStorage.setItem('jata_startups', JSON.stringify(seedStartups));
  }
  if (!localStorage.getItem('jata_ppps')) {
    localStorage.setItem('jata_ppps', JSON.stringify(seedPpps));
  }
  if (!localStorage.getItem('jata_contact_submissions')) {
    localStorage.setItem('jata_contact_submissions', JSON.stringify(seedContactSubmissions));
  }
  console.log('🌱 JATA LocalStorage Database initialized successfully!');
};
