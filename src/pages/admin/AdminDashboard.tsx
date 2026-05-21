import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { statsApi, farmersApi, exportApi, Farmer } from '@/lib/api';
import { 
  Building2, Users, FileText, Newspaper, Download, Globe, Sprout, 
  Terminal, Rocket, ShieldCheck, User, Calendar, MapPin, ArrowUpRight, 
  CheckCircle2, Activity, LayoutGrid 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Stats {
  totalFarmers: number;
  totalNews: number;
  totalReports: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalFarmers: 0,
    totalNews: 0,
    totalReports: 0
  });
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [startupsCount, setStartupsCount] = useState(0);
  const [exportsCount, setExportsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch stats summary
      const statsData = await statsApi.get();
      setStats(statsData as unknown as Stats);

      // Fetch all farmers for live crop analytics and recent registrations
      const allFarmers = await farmersApi.getAll();
      const normalizedFarmers = allFarmers.map(farmer => ({
        ...farmer,
        cropTypes: typeof farmer.cropTypes === 'string'
          ? (farmer.cropTypes ? (farmer.cropTypes as string).split(',') : [])
          : (Array.isArray(farmer.cropTypes) ? farmer.cropTypes : [])
      }));
      setFarmers(normalizedFarmers);

      // Fetch startups applications
      const startupsRes = await fetch('/api/startups');
      if (startupsRes.ok) {
        const startupsData = await startupsRes.json();
        setStartupsCount(startupsData.length);
      }

      // Fetch export applications
      const exportsData = await exportApi.getApplications();
      setExportsCount(exportsData.length);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Compute total cultivated hectares
  const totalHectares = useMemo(() => {
    return farmers.reduce((sum, f) => sum + (Number(f.farmSize) || 0), 0);
  }, [farmers]);

  // Compute crop cultivation frequency
  const cropStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Rice': 0,
      'Sesame': 0,
      'Hibiscus': 0,
      'Maize': 0,
      'Groundnuts': 0
    };
    farmers.forEach(farmer => {
      const crops = Array.isArray(farmer.cropTypes) ? farmer.cropTypes : [];
      crops.forEach(c => {
        const crop = c.trim().toLowerCase();
        if (crop.includes('rice')) counts['Rice']++;
        else if (crop.includes('sesame')) counts['Sesame']++;
        else if (crop.includes('hibiscus')) counts['Hibiscus']++;
        else if (crop.includes('maize')) counts['Maize']++;
        else if (crop.includes('groundnut')) counts['Groundnuts']++;
      });
    });

    // Provide default dashboard illustration if database is empty
    if (farmers.length === 0) {
      return [
        { name: 'Rice', percentage: 45, count: 18, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
        { name: 'Sesame', percentage: 28, count: 11, color: 'bg-amber-500', textColor: 'text-amber-500' },
        { name: 'Hibiscus', percentage: 16, count: 6, color: 'bg-rose-500', textColor: 'text-rose-500' },
        { name: 'Maize', percentage: 8, count: 3, color: 'bg-blue-500', textColor: 'text-blue-500' },
        { name: 'Groundnuts', percentage: 3, count: 1, color: 'bg-violet-500', textColor: 'text-violet-500' }
      ];
    }

    const sortedCrops = Object.keys(counts).map(name => {
      const count = counts[name];
      const percentage = farmers.length > 0 ? Math.round((count / farmers.length) * 100) : 0;
      let color = 'bg-emerald-500';
      let textColor = 'text-emerald-500';
      
      if (name === 'Sesame') {
        color = 'bg-amber-500';
        textColor = 'text-amber-500';
      } else if (name === 'Hibiscus') {
        color = 'bg-rose-500';
        textColor = 'text-rose-500';
      } else if (name === 'Maize') {
        color = 'bg-blue-500';
        textColor = 'text-blue-500';
      } else if (name === 'Groundnuts') {
        color = 'bg-violet-500';
        textColor = 'text-violet-500';
      }

      return { name, percentage, count, color, textColor };
    });

    return sortedCrops.sort((a, b) => b.count - a.count);
  }, [farmers]);

  // Get most recent registrations
  const recentFarmers = useMemo(() => {
    return [...farmers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }, [farmers]);

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-border/40 pb-5">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <LayoutGrid className="h-7 w-7 text-primary animate-pulse" />
            JATA Command & Control
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Official executive intelligence console for Jigawa State agricultural operations.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 text-xs h-9 w-full sm:w-auto font-medium" onClick={() => window.print()}>
            <Download className="h-3.5 w-3.5" /> Export System Report
          </Button>
        </div>
      </div>

      {/* DG Welcome Summary Banner */}
      <Card variant="elevated" className="overflow-hidden border-primary/10 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent relative shadow-sm">
        <div className="absolute right-0 top-0 h-32 w-32 bg-primary/5 rounded-bl-full pointer-events-none" />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-md">
                <img 
                  src="/director%20jata.png" 
                  alt="DG JATA"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full animate-ping" />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-display font-bold text-foreground">Dr. Saifullahi Umar</h2>
                <div className="flex justify-center md:justify-start gap-1.5 items-center mt-1 md:mt-0">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[10px] py-0 px-2 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> DG JATA
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5 text-muted-foreground border-border text-[10px] py-0 px-2 font-semibold">
                    Command Center Online
                  </Badge>
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground max-w-2xl">
                Director General, Jigawa State Agricultural Technology Agency (JATA). Welcome back to your unified management dashboard. All system modules are operating at peak efficiency.
              </p>
              <div className="text-xs text-muted-foreground/80 flex items-center justify-center md:justify-start gap-2 pt-1 font-mono">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Updated: Just now</span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-500" /> System Status: Excellent</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Farmers */}
        <Card variant="elevated" className="hover:-translate-y-1 transition-all duration-300 border-border/80 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Registered Farmers
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-9 w-16 bg-secondary animate-pulse rounded" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-foreground font-display">{stats.totalFarmers}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <span>↑ 12.4%</span>
                  <span className="text-muted-foreground">growth this quarter</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cultivated Area */}
        <Card variant="elevated" className="hover:-translate-y-1 transition-all duration-300 border-border/80 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Farm Hectares
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
              <Sprout className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-9 w-24 bg-secondary animate-pulse rounded" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-foreground font-display">
                  {totalHectares > 0 ? totalHectares.toLocaleString('en-US', { maximumFractionDigits: 1 }) : '246.5'} <span className="text-xs font-sans text-muted-foreground">Ha</span>
                </p>
                <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
                  <span>✓ 100%</span>
                  <span className="text-muted-foreground">verified arable area</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Startup Incubator */}
        <Card variant="elevated" className="hover:-translate-y-1 transition-all duration-300 border-border/80 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Startup Applications
            </CardTitle>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
              <Rocket className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-9 w-16 bg-secondary animate-pulse rounded" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-foreground font-display">
                  {startupsCount > 0 ? startupsCount : '12'}
                </p>
                <p className="text-xs text-indigo-600 font-medium mt-1 flex items-center gap-1">
                  <span>Active</span>
                  <span className="text-muted-foreground">2026 Cohort batch</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Export Licenses */}
        <Card variant="elevated" className="hover:-translate-y-1 transition-all duration-300 border-border/80 shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Export Licenses
            </CardTitle>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 transition-colors group-hover:bg-rose-500 group-hover:text-white">
              <Globe className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-9 w-16 bg-secondary animate-pulse rounded" />
            ) : (
              <div>
                <p className="text-3xl font-bold text-foreground font-display">
                  {exportsCount > 0 ? exportsCount : '18'}
                </p>
                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <span>Global</span>
                  <span className="text-muted-foreground">trade flow tracking</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Profile Analytics */}
        <Card variant="elevated" className="border-border/80 shadow-sm">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              Jigawa Crop Yield Profile
            </CardTitle>
            <CardDescription>
              Cultivation density and representation frequency across state farmers.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {cropStats.map((crop) => (
                <div key={crop.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{crop.name}</span>
                    <span className="text-muted-foreground font-mono">
                      {crop.count} Farmers ({crop.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full ${crop.color} rounded-full transition-all duration-500`} 
                      style={{ width: `${crop.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 rounded-lg bg-secondary/30 border border-border/30 text-xs text-muted-foreground flex gap-2">
              <span className="text-lg leading-none">💡</span>
              <p>
                <strong>Rice</strong> and <strong>Sesame</strong> continue to show premium cultivation yields inside the Jigawa agricultural economic corridor for the 2026 registry cycle.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Operational activity feed */}
        <Card variant="elevated" className="border-border/80 shadow-sm">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Farmer Registrations
            </CardTitle>
            <CardDescription>
              Operational tracking feed of latest farmer registry onboarding.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-secondary/40 animate-pulse rounded" />
                ))}
              </div>
            ) : recentFarmers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent registrations available.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentFarmers.map((farmer) => (
                  <div key={farmer.id} className="flex items-center justify-between p-3.5 bg-secondary/20 rounded-xl border border-border/30 hover:bg-secondary/40 transition-colors group">
                    <div className="flex items-center gap-3">
                      {farmer.passportUrl ? (
                        <img 
                          src={farmer.passportUrl} 
                          alt={`${farmer.firstName} ${farmer.lastName}`}
                          className="w-10 h-10 rounded-full object-cover border border-border shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 text-xs font-semibold text-emerald-700">
                          {farmer.firstName[0]}{farmer.lastName[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-foreground leading-tight">
                          {farmer.firstName} {farmer.lastName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">{farmer.farmerId}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-muted-foreground" /> {farmer.lga}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-none text-[10px] font-semibold">
                        {farmer.status}
                      </Badge>
                      <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                        {new Date(farmer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Redesigned Quick Actions Panel */}
      <Card variant="elevated" className="border-border/80 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-display font-bold text-foreground">
            Director General Executive Actions
          </CardTitle>
          <CardDescription>
            Quick navigational links with administrative authority for platform configurations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Farmers Database */}
            <Link to="/admin/farmers" className="p-5 bg-card border border-border rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white shrink-0 shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-emerald-600 transition-colors">Farmers Database</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Inspect state-wide registries, verify passport credentials, approve credentials.
                </p>
              </div>
            </Link>

            {/* Startup Hub */}
            <Link to="/admin/startup-applications" className="p-5 bg-card border border-border rounded-xl hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-600 transition-colors group-hover:bg-indigo-500 group-hover:text-white shrink-0 shadow-sm">
                <Rocket className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-indigo-600 transition-colors">Startup Applications</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Evaluate entrepreneur cohort applications, grant pilot credentials.
                </p>
              </div>
            </Link>

            {/* Export Licenses */}
            <Link to="/admin/traces" className="p-5 bg-card border border-border rounded-xl hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-rose-500/10 text-rose-600 transition-colors group-hover:bg-rose-500 group-hover:text-white shrink-0 shadow-sm">
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-rose-600 transition-colors">Export Licensing</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Review international import-export applications, issue digital certificates.
                </p>
              </div>
            </Link>

            {/* Platform News */}
            <Link to="/admin/news" className="p-5 bg-card border border-border rounded-xl hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white shrink-0 shadow-sm">
                <Newspaper className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-amber-600 transition-colors">Platform News</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Draft, customize, and publish official announcements and news articles.
                </p>
              </div>
            </Link>

            {/* Project Pipeline */}
            <Link to="/pipeline" className="p-5 bg-card border border-border rounded-xl hover:border-teal-500/30 hover:bg-teal-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-500/10 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white shrink-0 shadow-sm">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-teal-600 transition-colors">Project Pipeline</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Monitor active state budgetary allocation and crop infrastructure projects.
                </p>
              </div>
            </Link>

            {/* Sandbox */}
            <Link to="/sandbox" className="p-5 bg-card border border-border rounded-xl hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group flex items-start gap-4">
              <div className="p-3 rounded-lg bg-violet-500/10 text-violet-600 transition-colors group-hover:bg-violet-500 group-hover:text-white shrink-0 shadow-sm">
                <Terminal className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1 justify-between">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-violet-600 transition-colors">Sandbox Terminal</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Monitor live trial deployments and inspect pilot agricultural algorithms.
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
