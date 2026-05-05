import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statsApi, DashboardStats } from '@/lib/api';
import { Building2, Users, FileText, Newspaper, TrendingUp, MapPin } from 'lucide-react';

interface Stats {
  totalRanches: number;
  totalClinics: number;
  totalFarmers: number;
  totalNews: number;
  totalReports: number;
  completedProjects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRanches: 0,
    totalClinics: 0,
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
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Ranches', value: stats.totalRanches, icon: Building2, color: 'bg-blue-500' },
    { title: 'Veterinary Clinics', value: stats.totalClinics, icon: MapPin, color: 'bg-green-500' },
    { title: 'Registered Farmers', value: stats.totalFarmers, icon: Users, color: 'bg-amber-500' },
    { title: 'News Articles', value: stats.totalNews, icon: Newspaper, color: 'bg-purple-500' },
    { title: 'Completed Projects', value: stats.completedProjects, icon: TrendingUp, color: 'bg-emerald-500' },
    { title: 'Published Reports', value: stats.totalReports, icon: FileText, color: 'bg-rose-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
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
            <CardTitle>Welcome, Honourable Commissioner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img 
                  src="/Hon.%20commissioner.png" 
                  alt="Prof. Saleem Abdurrahman"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg">Prof. Saleem Abdurrahman</h3>
                <p className="text-muted-foreground">Honourable Commissioner for Livestock</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    System Operational
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
              <a href="/admin/construction" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Manage Construction</p>
              </a>
              <a href="/admin/news" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Newspaper className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Add News</p>
              </a>
              <a href="/admin/reports" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Upload Report</p>
              </a>
              <a href="/admin/farmers" className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">View Farmers</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
