import { ReactNode, useEffect, Suspense } from 'react';
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  FileText,
  Newspaper,
  LogOut,
  Menu,
  X,
  Users,
  UserCog,
  Rocket
} from 'lucide-react';
import { useState } from 'react';
import jigawaLogo from '@/assets/jigawa-logo.png';



const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/startup-applications', label: 'Startup Applications', icon: Rocket },
  { path: '/admin/budget', label: 'Investment Projects', icon: DollarSign },
  { path: '/admin/traces', label: 'Export License', icon: UserCog },
  { path: '/admin/farmers', label: 'Farmers Database', icon: Users },
  { path: '/admin/reports', label: 'Reports & Analytics', icon: FileText },
  { path: '/admin/news', label: 'Platform News', icon: Newspaper },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={jigawaLogo} alt="Jigawa State" className="h-8 w-8" />
          <span className="font-display font-bold text-foreground">Admin Panel</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50
          w-64 bg-background border-r border-border
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
        `}>
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Logo */}
            <div className="p-6 border-b border-border hidden lg:block">
              <div className="flex items-center gap-3">
                <img src={jigawaLogo} alt="Jigawa State" className="h-10 w-10" />
                <div>
                  <p className="font-display font-bold text-foreground">Admin Panel</p>
                  <p className="text-xs text-muted-foreground">Jigawa JATA</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src="/director jata.png"
                    alt="DG JATA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Dr. Saifullahi Umar</p>
                  <p className="text-xs text-muted-foreground">Director General JATA</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Link to="/" className="block mt-2">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  ← Back to Website
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-h-screen overflow-y-auto">
          <div className="p-6 lg:p-8">
            <Suspense fallback={
              <div className="h-[60vh] flex items-center justify-center bg-background/30 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm animate-pulse">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-emerald-500"></div>
                    <div className="absolute animate-ping rounded-full h-8 w-8 bg-emerald-500/10"></div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-2">Loading section...</p>
                </div>
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
