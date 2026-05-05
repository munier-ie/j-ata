// API client for frontend to communicate with backend API
// In development: uses localhost:3001/api (from dev server)
// In production (Vercel): uses /api (Vercel serverless functions)
const getApiBase = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.PROD || window.location.hostname !== "localhost") {
    return "/api"; // Production: use Vercel serverless functions
  }
  // Development: use local Express server
  return import.meta.env.VITE_API_URL || "http://localhost:3001/api";
};

const API_BASE = getApiBase();

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = "GET", body } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ============= Management Members =============
export interface ManagementMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  bio: string;
  isCommissioner: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const managementApi = {
  getAll: () => apiRequest<ManagementMember[]>("/management"),

  create: (data: Omit<ManagementMember, "id" | "createdAt" | "updatedAt">) =>
    apiRequest<ManagementMember>("/management", {
      method: "POST",
      body: {
        name: data.name,
        role: data.role,
        image_url: data.imageUrl,
        bio: data.bio,
        is_commissioner: data.isCommissioner,
        sort_order: data.sortOrder,
      },
    }),

  update: (id: string, data: Partial<ManagementMember>) =>
    apiRequest<ManagementMember>(`/management/${id}`, {
      method: "PUT",
      body: {
        name: data.name,
        role: data.role,
        image_url: data.imageUrl,
        bio: data.bio,
        is_commissioner: data.isCommissioner,
        sort_order: data.sortOrder,
      },
    }),

  delete: (id: string) =>
    apiRequest<void>(`/management/${id}`, { method: "DELETE" }),
};

// ============= Farmers =============
export interface Farmer {
  id: string;
  farmerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  nin: string | null;
  lga: string;
  ward: string;
  community: string;
  farmSize: number;
  cropTypes: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const farmersApi = {
  getAll: () => apiRequest<Farmer[]>("/farmers"),

  create: (data: Omit<Farmer, "id" | "createdAt" | "updatedAt">) =>
    apiRequest<Farmer>("/farmers", {
      method: "POST",
      body: {
        farmer_id: data.farmerId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        nin: data.nin,
        lga: data.lga,
        ward: data.ward,
        community: data.community,
        farm_size: data.farmSize,
        crop_types: data.cropTypes,
        status: data.status,
      },
    }),

  update: (id: string, data: Partial<Farmer>) =>
    apiRequest<Farmer>(`/farmers/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string) =>
    apiRequest<void>(`/farmers/${id}`, { method: "DELETE" }),
};

// ============= News =============
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const newsApi = {
  getAll: () => apiRequest<NewsArticle[]>("/news"),

  create: (
    data: Omit<NewsArticle, "id" | "createdAt" | "updatedAt" | "publishedAt">,
  ) =>
    apiRequest<NewsArticle>("/news", {
      method: "POST",
      body: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        image_url: data.imageUrl,
        category: data.category,
        is_published: data.isPublished,
      },
    }),

  update: (id: string, data: Partial<NewsArticle>) =>
    apiRequest<NewsArticle>(`/news/${id}`, {
      method: "PUT",
      body: data,
    }),

  delete: (id: string) => apiRequest<void>(`/news/${id}`, { method: "DELETE" }),
};

// ============= Stats =============
export interface DashboardStats {
  totalFarmEstates: number;
  totalInnovationHubs: number;
  totalFarmers: number;
  totalNews: number;
  totalReports: number;
  completedProjects: number;
}

export const statsApi = {
  get: () => apiRequest<DashboardStats>("/stats"),
};

// ============= Farm Estates =============
export interface FarmEstate {
  id: string;
  name: string;
  lga: string;
  zone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  totalHectares: number | null;
  status: string;
  completionPercentage: number | null;
  budgetAllocated: number | null;
  budgetSpent: number | null;
  hasWater: boolean;
  hasPower: boolean;
  hasAccessRoad: boolean;
  hasStorageFacility: boolean;
  createdAt: string;
  updatedAt: string;
}

export const farmEstatesApi = {
  getAll: () => apiRequest<FarmEstate[]>("/farm-estates"),

  create: (data: Partial<FarmEstate>) =>
    apiRequest<FarmEstate>("/farm-estates", {
      method: "POST",
      body: data as Record<string, unknown>,
    }),

  update: (id: string, data: Partial<FarmEstate>) =>
    apiRequest<FarmEstate>(`/farm-estates/${id}`, {
      method: "PUT",
      body: data as Record<string, unknown>,
    }),

  delete: (id: string) =>
    apiRequest<void>(`/farm-estates/${id}`, { method: "DELETE" }),
};

// ============= Innovation Hubs =============
export interface InnovationHub {
  id: string;
  name: string;
  facilityType: string;
  lga: string;
  zone: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  capacity: number | null;
  status: string;
  completionPercentage: number | null;
  budgetAllocated: number | null;
  budgetSpent: number | null;
  hasWater: boolean | null;
  hasPower: boolean | null;
  services: string[];
  contactPhone: string | null;
  contactEmail: string | null;
  createdAt: string;
  updatedAt: string;
}

export const innovationHubsApi = {
  getAll: () => apiRequest<InnovationHub[]>("/innovation-hubs"),

  getById: (id: string) => apiRequest<InnovationHub>(`/innovation-hubs/${id}`),

  create: (data: Partial<InnovationHub>) =>
    apiRequest<InnovationHub>("/innovation-hubs", {
      method: "POST",
      body: data as Record<string, unknown>,
    }),

  update: (id: string, data: Partial<InnovationHub>) =>
    apiRequest<InnovationHub>(`/innovation-hubs/${id}`, {
      method: "PUT",
      body: data as Record<string, unknown>,
    }),

  delete: (id: string) =>
    apiRequest<void>(`/innovation-hubs/${id}`, { method: "DELETE" }),
};

// ============= Reports =============
export interface Report {
  id: string;
  title: string;
  description: string | null;
  category: string;
  fileUrl: string | null;
  isPublished: boolean;
  uploadedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export const reportsApi = {
  getAll: () => apiRequest<Report[]>("/reports"),

  getById: (id: string) => apiRequest<Report>(`/reports/${id}`),

  create: (data: Omit<Report, "id" | "createdAt" | "updatedAt">) =>
    apiRequest<Report>("/reports", {
      method: "POST",
      body: {
        title: data.title,
        description: data.description,
        category: data.category,
        file_url: data.fileUrl,
        is_published: data.isPublished,
      },
    }),

  update: (id: string, data: Partial<Report>) =>
    apiRequest<Report>(`/reports/${id}`, {
      method: "PUT",
      body: {
        title: data.title,
        description: data.description,
        category: data.category,
        file_url: data.fileUrl,
        is_published: data.isPublished,
      },
    }),

  delete: (id: string) =>
    apiRequest<void>(`/reports/${id}`, { method: "DELETE" }),
};
