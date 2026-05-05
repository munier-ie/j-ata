import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Eager-loaded pages (critical for initial render)
import Index from "./pages/Index";
import FarmerRegistration from "./pages/FarmerRegistration";
import VeterinaryServices from "./pages/VeterinaryServices";
import RevenuePortal from "./pages/RevenuePortal";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Departments from "./pages/Departments";
import Agencies from "./pages/Agencies";
import Programs from "./pages/Programs";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Transparency from "./pages/Transparency";
import NotFound from "./pages/NotFound";
import Branches from "./pages/Branches";
import GrazingPermit from "./pages/GrazingPermit";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Lazy-loaded pages (heavy components with maps/charts)
const Map = lazy(() => import("./pages/Map"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminConstruction = lazy(() => import("./pages/admin/AdminConstruction"));
const AdminBudget = lazy(() => import("./pages/admin/AdminBudget"));
const AdminFarmers = lazy(() => import("./pages/admin/AdminFarmers"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminManagement = lazy(() => import("./pages/admin/AdminManagement"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/farmer-registration" element={<FarmerRegistration />} />
            <Route path="/grazing-permit" element={<GrazingPermit />} />
            <Route path="/veterinary" element={<VeterinaryServices />} />
            <Route path="/revenue" element={<RevenuePortal />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/management" element={<Departments />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/news" element={<News />} />

            <Route path="/branches" element={<Branches />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/map" element={<Map />} />

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/construction" element={<ProtectedRoute requireAdmin><AdminConstruction /></ProtectedRoute>} />
            <Route path="/admin/budget" element={<ProtectedRoute requireAdmin><AdminBudget /></ProtectedRoute>} />
            <Route path="/admin/farmers" element={<ProtectedRoute requireAdmin><AdminFarmers /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/management" element={<ProtectedRoute requireAdmin><AdminManagement /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute requireAdmin><AdminNews /></ProtectedRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;