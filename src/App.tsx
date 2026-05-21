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
import About from "./pages/About";
import Auth from "./pages/Auth";
import Departments from "./pages/Departments";
import Agencies from "./pages/Agencies";
import Programs from "./pages/Programs";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Transparency from "./pages/Transparency";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";

// Lazy-loaded pages (heavy components with maps/charts)

const SmartExtension = lazy(() => import("./pages/SmartExtension"));
const CommandCenter = lazy(() => import("./pages/CommandCenter"));
const DataHub = lazy(() => import("./pages/DataHub"));
const InvestmentPortal = lazy(() => import("./pages/InvestmentPortal"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminStartupApplications = lazy(() => import("./pages/admin/AdminStartupApplications"));
const AdminBudget = lazy(() => import("./pages/admin/AdminBudget"));
const AdminFarmers = lazy(() => import("./pages/admin/AdminFarmers"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminManagement = lazy(() => import("./pages/admin/AdminManagement"));
const AdminTraces = lazy(() => import("@/pages/admin/AdminTraces"));
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard"));
const ExportPortal = lazy(() => import("./pages/ExportPortal"));
const StartupPortal = lazy(() => import("./pages/StartupPortal"));
const StartupApplication = lazy(() => import("./pages/StartupApplication"));
const InvestorDashboard = lazy(() => import("./pages/InvestorDashboard"));
const MentorPortal = lazy(() => import("./pages/MentorPortal"));
const PPPApplication = lazy(() => import("./pages/PPPApplication"));
const Register = lazy(() => import("./pages/Register"));
const InnovationSandbox = lazy(() => import("./pages/InnovationSandbox"));
const ProjectPipeline = lazy(() => import("./pages/ProjectPipeline"));
const ExportDashboard = lazy(() => import("./pages/ExportDashboard"));
const Traceability = lazy(() => import("./pages/Traceability"));
const WarehouseTracking = lazy(() => import("./pages/WarehouseTracking"));

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
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/management" element={<Departments />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/news" element={<News />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/transparency" element={<Transparency />} />

            <Route path="/extension" element={<SmartExtension />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/data-hub" element={<DataHub />} />
            <Route path="/investors" element={<InvestmentPortal />} />
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/mentor" element={<MentorPortal />} />
            <Route path="/ppp/apply" element={<PPPApplication />} />
            <Route path="/revenue" element={<RevenueDashboard />} />
            <Route path="/export" element={<ExportPortal />} />
            <Route path="/startup" element={<StartupPortal />} />
            <Route path="/startup/apply" element={<StartupApplication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sandbox" element={<InnovationSandbox />} />
            <Route path="/pipeline" element={<ProjectPipeline />} />
            <Route path="/export/dashboard" element={<ExportDashboard />} />
            <Route path="/traceability" element={<Traceability />} />
            <Route path="/warehouse/tracking" element={<WarehouseTracking />} />

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="startup-applications" element={<AdminStartupApplications />} />
              <Route path="budget" element={<AdminBudget />} />
              <Route path="farmers" element={<AdminFarmers />} />
              <Route path="management" element={<AdminManagement />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="traces" element={<AdminTraces />} />
            </Route>

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