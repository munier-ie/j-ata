import { 
  initializeLocalStorageSeed, 
  generateId 
} from './mockData';

// Initialize localStorage databases with seed values on startup
initializeLocalStorageSeed();

// Utility helpers to retrieve and save data from localStorage
const db = {
  get: (key: string): any[] => {
    try {
      const data = localStorage.getItem(`jata_${key}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return [];
    }
  },
  set: (key: string, data: any[]): void => {
    try {
      localStorage.setItem(`jata_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage:`, e);
    }
  }
};

// Response helper
const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

const noContentResponse = () => {
  return new Response(null, {
    status: 204
  });
};

// Global window.fetch mock interceptor
const originalFetch = window.fetch;

window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlStr = typeof input === 'string' 
    ? input 
    : (input instanceof URL ? input.toString() : (input as Request).url);
  
  // Normalize developer environment base URLs
  let apiPath = '';
  if (urlStr.includes('/api/')) {
    apiPath = '/api/' + urlStr.split('/api/')[1];
  } else {
    // If not matching our API endpoints, fallback to original fetch
    return originalFetch.apply(this, arguments as any);
  }

  const method = (init?.method || 'GET').toUpperCase();
  const urlObj = new URL(urlStr, window.location.origin);
  const path = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  // Extract query variables or body payloads safely
  let body: any = {};
  if (init?.body) {
    try {
      body = JSON.parse(init.body as string);
    } catch (e) {
      // In case body is form-data or other formats, try urlencode fallback or leave empty
      try {
        const formData = new URLSearchParams(init.body as string);
        body = Object.fromEntries(formData.entries());
      } catch (_) {}
    }
  }

  console.log(`[Mock Server] Intercepted Request: ${method} ${path}`, { body, query: Object.fromEntries(searchParams) });

  try {
    // ============= MANAGEMENT ROUTES =============
    if (path === '/api/management') {
      if (method === 'GET') {
        const members = db.get('management');
        return jsonResponse(members.sort((a, b) => (a.sortOrder ?? a.sort_order ?? 0) - (b.sortOrder ?? b.sort_order ?? 0)));
      }
      if (method === 'POST') {
        const members = db.get('management');
        const newMember = {
          id: generateId(),
          name: body.name,
          role: body.role,
          imageUrl: body.imageUrl || body.image_url || null,
          image_url: body.imageUrl || body.image_url || null,
          bio: body.bio || '',
          isCommissioner: !!(body.isCommissioner ?? body.is_commissioner),
          is_commissioner: !!(body.isCommissioner ?? body.is_commissioner),
          sortOrder: Number(body.sortOrder ?? body.sort_order ?? 0),
          sort_order: Number(body.sortOrder ?? body.sort_order ?? 0),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // If setting as commissioner, demote existing commissioners
        if (newMember.isCommissioner) {
          members.forEach(m => {
            m.isCommissioner = false;
            m.is_commissioner = false;
          });
        }

        members.push(newMember);
        db.set('management', members);
        return jsonResponse(newMember, 201);
      }
    }

    if (path.startsWith('/api/management/')) {
      const id = path.split('/api/management/')[1];
      const members = db.get('management');
      const index = members.findIndex(m => m.id === id);

      if (index === -1) {
        return jsonResponse({ error: 'Management member not found' }, 404);
      }

      if (method === 'GET') {
        return jsonResponse(members[index]);
      }
      if (method === 'PUT') {
        const isComm = !!(body.isCommissioner ?? body.is_commissioner);
        
        if (isComm) {
          members.forEach(m => {
            m.isCommissioner = false;
            m.is_commissioner = false;
          });
        }

        const updated = {
          ...members[index],
          name: body.name ?? members[index].name,
          role: body.role ?? members[index].role,
          imageUrl: body.imageUrl ?? body.image_url ?? members[index].imageUrl,
          image_url: body.imageUrl ?? body.image_url ?? members[index].image_url,
          bio: body.bio ?? members[index].bio,
          isCommissioner: isComm,
          is_commissioner: isComm,
          sortOrder: Number(body.sortOrder ?? body.sort_order ?? members[index].sortOrder),
          sort_order: Number(body.sortOrder ?? body.sort_order ?? members[index].sort_order),
          updatedAt: new Date().toISOString()
        };

        members[index] = updated;
        db.set('management', members);
        return jsonResponse(updated);
      }
      if (method === 'DELETE') {
        members.splice(index, 1);
        db.set('management', members);
        return noContentResponse();
      }
    }

    // ============= FARMERS ROUTES =============
    if (path === '/api/farmers') {
      const farmers = db.get('farmers');
      
      if (method === 'GET') {
        return jsonResponse(farmers);
      }
      if (method === 'POST') {
        const farmerId = body.farmerId || body.farmer_id || `JG-${String(Date.now()).substring(6)}`;
        const firstName = body.firstName || body.first_name || '';
        const lastName = body.lastName || body.last_name || '';
        const cropTypesInput = body.cropTypes || body.crop_types || [];
        const cropArray = Array.isArray(cropTypesInput) 
          ? cropTypesInput 
          : (typeof cropTypesInput === 'string' ? cropTypesInput.split(',') : []);

        const newFarmer = {
          id: generateId(),
          farmerId,
          farmer_id: farmerId,
          firstName,
          first_name: firstName,
          lastName,
          last_name: lastName,
          phone: body.phone || '',
          nin: body.nin || null,
          lga: body.lga || 'Dutse',
          ward: body.ward || '',
          community: body.community || '',
          farmSize: Number(body.farmSize ?? body.farm_size ?? 0),
          farm_size: Number(body.farmSize ?? body.farm_size ?? 0),
          cropTypes: cropArray,
          crop_types: cropArray.join(','),
          status: body.status || 'pending',
          passportUrl: body.passportUrl || body.passport_url || null,
          passport_url: body.passportUrl || body.passport_url || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        farmers.unshift(newFarmer);
        db.set('farmers', farmers);
        return jsonResponse(newFarmer, 201);
      }
    }

    if (path.startsWith('/api/farmers/')) {
      const id = path.split('/api/farmers/')[1];
      const farmers = db.get('farmers');
      const index = farmers.findIndex(f => f.id === id);

      if (index === -1) {
        return jsonResponse({ error: 'Farmer not found' }, 404);
      }

      if (method === 'GET') {
        return jsonResponse(farmers[index]);
      }
      if (method === 'PUT') {
        const cropTypesInput = body.cropTypes || body.crop_types;
        const cropArray = cropTypesInput !== undefined
          ? (Array.isArray(cropTypesInput) ? cropTypesInput : String(cropTypesInput).split(','))
          : farmers[index].cropTypes;

        const updated = {
          ...farmers[index],
          firstName: body.firstName ?? body.first_name ?? farmers[index].firstName,
          first_name: body.firstName ?? body.first_name ?? farmers[index].first_name,
          lastName: body.lastName ?? body.last_name ?? farmers[index].lastName,
          last_name: body.lastName ?? body.last_name ?? farmers[index].last_name,
          phone: body.phone ?? farmers[index].phone,
          nin: body.nin !== undefined ? body.nin : farmers[index].nin,
          lga: body.lga ?? farmers[index].lga,
          ward: body.ward ?? farmers[index].ward,
          community: body.community ?? farmers[index].community,
          farmSize: body.farmSize !== undefined ? Number(body.farmSize) : (body.farm_size !== undefined ? Number(body.farm_size) : farmers[index].farmSize),
          farm_size: body.farmSize !== undefined ? Number(body.farmSize) : (body.farm_size !== undefined ? Number(body.farm_size) : farmers[index].farm_size),
          cropTypes: cropArray,
          crop_types: Array.isArray(cropArray) ? cropArray.join(',') : farmers[index].crop_types,
          status: body.status ?? farmers[index].status,
          passportUrl: body.passportUrl ?? body.passport_url ?? farmers[index].passportUrl,
          passport_url: body.passportUrl ?? body.passport_url ?? farmers[index].passport_url,
          updatedAt: new Date().toISOString()
        };

        farmers[index] = updated;
        db.set('farmers', farmers);
        return jsonResponse(updated);
      }
      if (method === 'DELETE') {
        farmers.splice(index, 1);
        db.set('farmers', farmers);
        return noContentResponse();
      }
    }

    // ============= NEWS ROUTES =============
    if (path === '/api/news') {
      const news = db.get('news');
      if (method === 'GET') {
        const publishedOnly = searchParams.get('published') === 'true';
        const filtered = publishedOnly ? news.filter(n => !!(n.isPublished ?? n.is_published)) : news;
        return jsonResponse(filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      if (method === 'POST') {
        const isPub = !!(body.isPublished ?? body.is_published);
        const newArticle = {
          id: generateId(),
          title: body.title,
          slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          content: body.content,
          excerpt: body.excerpt || null,
          imageUrl: body.imageUrl || body.image_url || null,
          image_url: body.imageUrl || body.image_url || null,
          category: body.category || 'General',
          isPublished: isPub,
          is_published: isPub,
          publishedAt: isPub ? new Date().toISOString() : null,
          published_at: isPub ? new Date().toISOString() : null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        news.unshift(newArticle);
        db.set('news', news);
        return jsonResponse(newArticle, 201);
      }
    }

    if (path.startsWith('/api/news/')) {
      const idOrSlug = path.split('/api/news/')[1];
      const news = db.get('news');
      const index = news.findIndex(n => n.id === idOrSlug || n.slug === idOrSlug);

      if (index === -1) {
        return jsonResponse({ error: 'Article not found' }, 404);
      }

      if (method === 'GET') {
        return jsonResponse(news[index]);
      }
      if (method === 'PUT') {
        const isPub = body.isPublished !== undefined ? !!body.isPublished : (body.is_published !== undefined ? !!body.is_published : news[index].isPublished);
        const updated = {
          ...news[index],
          title: body.title ?? news[index].title,
          slug: body.slug ?? news[index].slug,
          content: body.content ?? news[index].content,
          excerpt: body.excerpt ?? news[index].excerpt,
          imageUrl: body.imageUrl ?? body.image_url ?? news[index].imageUrl,
          image_url: body.imageUrl ?? body.image_url ?? news[index].image_url,
          category: body.category ?? news[index].category,
          isPublished: isPub,
          is_published: isPub,
          publishedAt: isPub ? (news[index].publishedAt || new Date().toISOString()) : null,
          published_at: isPub ? (news[index].published_at || new Date().toISOString()) : null,
          updatedAt: new Date().toISOString()
        };

        news[index] = updated;
        db.set('news', news);
        return jsonResponse(updated);
      }
      if (method === 'DELETE') {
        news.splice(index, 1);
        db.set('news', news);
        return noContentResponse();
      }
    }

    // ============= REPORTS ROUTES =============
    if (path === '/api/reports') {
      const reports = db.get('reports');
      if (method === 'GET') {
        const publishedOnly = searchParams.get('published') === 'true';
        const filtered = publishedOnly ? reports.filter(r => !!(r.isPublished ?? r.is_published)) : reports;
        return jsonResponse(filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
      if (method === 'POST') {
        const isPub = !!(body.isPublished ?? body.is_published);
        const newReport = {
          id: generateId(),
          title: body.title,
          description: body.description || null,
          category: body.category || 'general',
          fileUrl: body.fileUrl || body.file_url || null,
          file_url: body.fileUrl || body.file_url || null,
          isPublished: isPub,
          is_published: isPub,
          uploadedBy: body.uploadedBy || body.uploaded_by || 'JATA Admin',
          uploaded_by: body.uploadedBy || body.uploaded_by || 'JATA Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        reports.unshift(newReport);
        db.set('reports', reports);
        return jsonResponse(newReport, 201);
      }
    }

    if (path.startsWith('/api/reports/')) {
      const id = path.split('/api/reports/')[1];
      const reports = db.get('reports');
      const index = reports.findIndex(r => r.id === id);

      if (index === -1) {
        return jsonResponse({ error: 'Report not found' }, 404);
      }

      if (method === 'GET') {
        return jsonResponse(reports[index]);
      }
      if (method === 'PUT') {
        const isPub = body.isPublished !== undefined ? !!body.isPublished : (body.is_published !== undefined ? !!body.is_published : reports[index].isPublished);
        const updated = {
          ...reports[index],
          title: body.title ?? reports[index].title,
          description: body.description ?? reports[index].description,
          category: body.category ?? reports[index].category,
          fileUrl: body.fileUrl ?? body.file_url ?? reports[index].fileUrl,
          file_url: body.fileUrl ?? body.file_url ?? reports[index].file_url,
          isPublished: isPub,
          is_published: isPub,
          updatedAt: new Date().toISOString()
        };

        reports[index] = updated;
        db.set('reports', reports);
        return jsonResponse(updated);
      }
      if (method === 'DELETE') {
        reports.splice(index, 1);
        db.set('reports', reports);
        return noContentResponse();
      }
    }

    // ============= STATS ROUTES =============
    if (path === '/api/stats') {
      const farmers = db.get('farmers');
      const news = db.get('news');
      const reports = db.get('reports');
      return jsonResponse({
        totalFarmers: farmers.length,
        totalNews: news.length,
        totalReports: reports.length
      });
    }

    // ============= TRANSPARENCY PIPELINE ROUTES =============
    if (path === '/api/transparency/clinics') {
      const clinics = db.get('clinics');
      const mapped = clinics.map(clinic => ({
        id: clinic.id,
        name: clinic.name,
        lga: clinic.lga,
        zone: clinic.zone,
        address: clinic.address,
        status: clinic.status,
        capacity: clinic.capacity,
        facility_type: clinic.facilityType || clinic.facility_type,
        completion_percentage: clinic.completionPercentage ?? clinic.completion_percentage ?? 100,
        budget_allocated: clinic.budgetAllocated ?? clinic.budget_allocated ?? 0,
        budget_spent: clinic.budgetSpent ?? clinic.budget_spent ?? 0,
        contact_email: clinic.contactEmail || clinic.contact_email,
        contact_phone: clinic.contactPhone || clinic.contact_phone,
        has_power: clinic.hasPower ?? clinic.has_power ?? true,
        has_water: clinic.hasWater ?? clinic.has_water ?? true,
        services: Array.isArray(clinic.services) ? clinic.services : (typeof clinic.services === 'string' ? clinic.services.split(',') : []),
        created_at: clinic.createdAt || clinic.created_at,
        updated_at: clinic.updatedAt || clinic.updated_at
      }));
      return jsonResponse(mapped);
    }

    if (path === '/api/transparency/ranches') {
      const ranches = db.get('ranches');
      const mapped = ranches.map(ranch => ({
        id: ranch.id,
        name: ranch.name,
        lga: ranch.lga,
        zone: ranch.zone,
        address: ranch.address,
        status: ranch.status,
        total_hectares: ranch.totalHectares ?? ranch.total_hectares ?? 0,
        capacity_cattle: ranch.capacityCattle ?? ranch.capacity_cattle ?? 0,
        completion_percentage: ranch.completionPercentage ?? ranch.completion_percentage ?? 100,
        budget_allocated: ranch.budgetAllocated ?? ranch.budget_allocated ?? 0,
        budget_spent: ranch.budgetSpent ?? ranch.budget_spent ?? 0,
        has_feed_facilities: ranch.hasFeedFacilities ?? ranch.has_feed_facilities ?? false,
        has_school: ranch.hasSchool ?? ranch.has_school ?? false,
        has_health_center: ranch.hasHealthCenter ?? ranch.has_health_center ?? false,
        has_veterinary_clinic: ranch.hasVeterinaryClinic ?? ranch.has_veterinary_clinic ?? false,
        has_power: ranch.hasPower ?? ranch.has_power ?? false,
        has_water: ranch.hasWater ?? ranch.has_water ?? false,
        created_at: ranch.createdAt || ranch.created_at,
        updated_at: ranch.updatedAt || ranch.updated_at
      }));
      return jsonResponse(mapped);
    }

    // ============= INCUBATOR / STARTUPS ROUTES =============
    if (path === '/api/startups') {
      const startups = db.get('startups');
      if (method === 'GET') {
        return jsonResponse(startups);
      }
      if (method === 'POST') {
        const newStartup = {
          id: generateId(),
          userId: 'mock-user-' + Math.random().toString(36).substring(2, 9),
          status: 'Pending',
          answers: {
            fullName: body.fullName || '',
            email: body.email || '',
            phone: body.phone || '',
            startupName: body.startupName || '',
            sector: body.sector || '',
            stage: body.stage || 'ideation',
            description: body.description || '',
            goals: body.goals || '',
            milestones: body.milestones || '',
            paymentMethod: body.paymentMethod || 'card'
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        startups.unshift(newStartup);
        db.set('startups', startups);
        return jsonResponse(newStartup, 201);
      }
    }

    if (path.startsWith('/api/startups/')) {
      const id = path.split('/api/startups/')[1];
      const startups = db.get('startups');
      const index = startups.findIndex(s => s.id === id);

      if (index === -1) {
        return jsonResponse({ error: 'Startup application not found' }, 404);
      }

      if (method === 'GET') {
        return jsonResponse(startups[index]);
      }
      if (method === 'PUT') {
        const updated = {
          ...startups[index],
          status: body.status ?? startups[index].status,
          updatedAt: new Date().toISOString()
        };
        startups[index] = updated;
        db.set('startups', startups);
        return jsonResponse(updated);
      }
    }

    // ============= EXPORT LICENSING PORTAL ROUTES =============
    if (path === '/api/export/applications') {
      const apps = db.get('export_applications');
      if (method === 'GET') {
        return jsonResponse(apps);
      }
      if (method === 'POST') {
        const applicationNo = `JATA-EXP-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
        const newApp = {
          id: generateId(),
          applicationNo,
          application_no: applicationNo,
          fullName: body.fullName || body.full_name || '',
          full_name: body.fullName || body.full_name || '',
          email: body.email || '',
          phone: body.phone || '',
          companyName: body.companyName || body.company_name || '',
          company_name: body.companyName || body.company_name || '',
          rcNumber: body.rcNumber || body.rc_number || '',
          rc_number: body.rcNumber || body.rc_number || '',
          businessAddress: body.businessAddress || body.business_address || '',
          business_address: body.businessAddress || body.business_address || '',
          commodityType: body.commodityType || body.commodity_type || '',
          commodity_type: body.commodityType || body.commodity_type || '',
          paymentStatus: 'pending',
          payment_status: 'pending',
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
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        apps.unshift(newApp);
        db.set('export_applications', apps);
        return jsonResponse(newApp, 201);
      }
    }

    if (path.startsWith('/api/export/applications/')) {
      const remainingPath = path.split('/api/export/applications/')[1];
      const parts = remainingPath.split('/');
      const id = parts[0];
      const action = parts[1]; // pay, issue, reject, renew, update-signatory

      const apps = db.get('export_applications');
      const index = apps.findIndex(a => a.id === id);

      if (index === -1) {
        return jsonResponse({ error: 'Export application not found' }, 404);
      }

      if (!action) {
        if (method === 'GET') {
          return jsonResponse(apps[index]);
        }
      }

      if (method === 'POST') {
        if (action === 'pay') {
          apps[index].paymentStatus = 'paid';
          apps[index].payment_status = 'paid';
          apps[index].updatedAt = new Date().toISOString();
          db.set('export_applications', apps);
          return jsonResponse(apps[index]);
        }
        
        if (action === 'issue') {
          const issued = new Date();
          const expiry = new Date();
          expiry.setFullYear(issued.getFullYear() + 1);
          
          const certNo = `JATA-EXP-CERT-${Math.floor(10000 + Math.random() * 90000)}`;

          apps[index].status = 'approved';
          apps[index].issuedAt = issued.toISOString();
          apps[index].issued_at = issued.toISOString();
          apps[index].expiryDate = expiry.toISOString();
          apps[index].expiry_date = expiry.toISOString();
          apps[index].certificateNo = certNo;
          apps[index].certificate_no = certNo;
          apps[index].signatoryName = body.signatoryName || 'Dr. Saifullahi Umar';
          apps[index].signatory_name = body.signatoryName || 'Dr. Saifullahi Umar';
          apps[index].signatoryTitle = body.signatoryTitle || 'Director General, J-ATA';
          apps[index].signatory_title = body.signatoryTitle || 'Director General, J-ATA';
          apps[index].updatedAt = new Date().toISOString();

          db.set('export_applications', apps);
          return jsonResponse(apps[index]);
        }

        if (action === 'reject') {
          apps[index].status = 'rejected';
          apps[index].updatedAt = new Date().toISOString();
          db.set('export_applications', apps);
          return jsonResponse(apps[index]);
        }

        if (action === 'renew') {
          apps[index].status = 'pending';
          apps[index].paymentStatus = 'pending';
          apps[index].payment_status = 'pending';
          apps[index].issuedAt = null;
          apps[index].issued_at = null;
          apps[index].expiryDate = null;
          apps[index].expiry_date = null;
          apps[index].certificateNo = null;
          apps[index].certificate_no = null;
          apps[index].updatedAt = new Date().toISOString();

          db.set('export_applications', apps);
          return jsonResponse(apps[index]);
        }

        if (action === 'update-signatory') {
          apps[index].signatoryName = body.signatoryName || 'Dr. Saifullahi Umar';
          apps[index].signatory_name = body.signatoryName || 'Dr. Saifullahi Umar';
          apps[index].signatoryTitle = body.signatoryTitle || 'Director General, J-ATA';
          apps[index].signatory_title = body.signatoryTitle || 'Director General, J-ATA';
          apps[index].updatedAt = new Date().toISOString();

          db.set('export_applications', apps);
          return jsonResponse(apps[index]);
        }
      }
    }

    // ============= PPP ROUTES =============
    if (path === '/api/ppp') {
      const ppps = db.get('ppps');
      if (method === 'GET') {
        return jsonResponse(ppps);
      }
      if (method === 'POST') {
        const newPpp = {
          id: generateId(),
          companyName: body.companyName || '',
          contactPerson: body.contactPerson || '',
          email: body.email || '',
          phone: body.phone || '',
          selectedProject: body.selectedProject || '',
          proposedInvestment: body.proposedInvestment || '',
          expectedRoi: body.expectedRoi || '',
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        ppps.unshift(newPpp);
        db.set('ppps', ppps);
        return jsonResponse(newPpp, 201);
      }
    }

    // ============= CONTACT SUBMISSIONS =============
    if (path === '/api/contact') {
      if (method === 'POST') {
        const submissions = db.get('contact_submissions');
        const name = body.fullName || body.full_name || '';
        const newContact = {
          id: generateId(),
          fullName: name,
          email: body.email || '',
          phone: body.phone || null,
          subject: body.subject || '',
          message: body.message || '',
          createdAt: new Date().toISOString()
        };

        submissions.unshift(newContact);
        db.set('contact_submissions', submissions);
        return jsonResponse(newContact, 201);
      }
    }

    // Default 404 response for unhandled API mock calls
    console.warn(`[Mock Server] Warning: Unhandled endpoint: ${method} ${path}`);
    return jsonResponse({ error: 'Endpoint Mock Not Implemented', method, path }, 404);

  } catch (err: any) {
    console.error('[Mock Server] Error handling mock request:', err);
    return jsonResponse({ error: 'Internal Mock Server Error', message: err.message }, 500);
  }
};
