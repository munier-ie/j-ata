import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statsApi } from '@/lib/api';
import { Building2, Users, FileText, Newspaper, TrendingUp, Lightbulb, Download, Globe, Sprout, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Stats {
  totalFarmEstates: number;
  totalInnovationHubs: number;
  totalFarmers: number;
  totalNews: number;
  totalReports: number;
  completedProjects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalFarmEstates: 0,
    totalInnovationHubs: 0,
    totalFarmers: 0,
    totalNews: 0,
    totalReports: 0,
    completedProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await statsApi.get();
      setStats(data as unknown as Stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Farm Estates', value: stats.totalFarmEstates, icon: Building2, color: 'bg-blue-500' },
    { title: 'Innovation Hubs', value: stats.totalInnovationHubs, icon: Lightbulb, color: 'bg-green-500' },
    { title: 'Registered Farmers', value: stats.totalFarmers, icon: Users, color: 'bg-amber-500' },
    { title: 'News Articles', value: stats.totalNews, icon: Newspaper, color: 'bg-purple-500' },
    { title: 'Completed Projects', value: stats.completedProjects, icon: TrendingUp, color: 'bg-emerald-500' },
    { title: 'Published Reports', value: stats.totalReports, icon: FileText, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">JATA Command & Control</h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-secondary animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Welcome, Director General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img 
                  src="/director%20jata.png" 
                  alt="DG JATA"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg">Dr. Agricultural Director</h3>
                <p className="text-muted-foreground">Director General, JATA</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Command Center Online
                  </div>
                  <span className="text-xs text-muted-foreground">Last login: Just now</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/construction" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Manage Assets</p>
              </Link>
              <Link to="/admin/farmers" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Farmer Database</p>
              </Link>
              <Link to="/export/dashboard" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Export Dashboard</p>
              </Link>
              <Link to="/traceability" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Sprout className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Traceability</p>
              </Link>
              <Link to="/pipeline" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Project Pipeline</p>
              </Link>
              <Link to="/sandbox" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Terminal className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sandbox</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
