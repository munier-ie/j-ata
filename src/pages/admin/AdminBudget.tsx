import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { farmEstatesApi, innovationHubsApi } from '@/lib/api';
import { DollarSign, TrendingUp, Building2, Check, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BudgetData {
  totalAllocated: number;
  totalSpent: number;
  byAsset: {
    name: string;
    allocated: number;
    spent: number;
    type: 'estate' | 'hub';
  }[];
}

interface InvestorApp {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  amount: string;
  projectId: number | null;
  status: string;
  feePaid: boolean;
}

export default function AdminBudget() {
  const [data, setData] = useState<BudgetData>({
    totalAllocated: 0,
    totalSpent: 0,
    byAsset: []
  });
  const [investorApps, setInvestorApps] = useState<InvestorApp[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBudgetData();
    // Load investor applications
    const stored = localStorage.getItem('investor_applications');
    if (stored) {
      setInvestorApps(JSON.parse(stored));
    }
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    const updated = investorApps.map(app => app.id === id ? { ...app, status } : app);
    setInvestorApps(updated);
    localStorage.setItem('investor_applications', JSON.stringify(updated));
    toast({
      title: `Application ${status}`,
      description: `Investor application has been marked as ${status}.`,
    });
  };

  const fetchBudgetData = async () => {
    try {
      const [estates, hubs] = await Promise.all([
        farmEstatesApi.getAll(),
        innovationHubsApi.getAll()
      ]);

      const totalAllocated = 
        estates.reduce((sum, r) => sum + (r.budgetAllocated || 0), 0) +
        hubs.reduce((sum, c) => sum + (c.budgetAllocated || 0), 0);

      const totalSpent = 
        estates.reduce((sum, r) => sum + (r.budgetSpent || 0), 0) +
        hubs.reduce((sum, c) => sum + (c.budgetSpent || 0), 0);

      const byAsset = [
        ...estates.map(r => ({
          name: r.name,
          allocated: r.budgetAllocated || 0,
          spent: r.budgetSpent || 0,
          type: 'estate' as const
        })),
        ...hubs.map(c => ({
          name: c.name,
          allocated: c.budgetAllocated || 0,
          spent: c.budgetSpent || 0,
          type: 'hub' as const
        }))
      ].sort((a, b) => b.allocated - a.allocated);

      setData({ totalAllocated, totalSpent, byAsset });
    } catch (error) {
      console.error('Error fetching budget data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `₦${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const utilizationRate = data.totalAllocated > 0 
    ? (data.totalSpent / data.totalAllocated) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">JATA Budget Tracking</h1>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget Allocated
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-24 bg-secondary animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(data.totalAllocated)}
                </p>
              )}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenditure
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-24 bg-secondary animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(data.totalSpent)}
                </p>
              )}
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget Utilization
              </CardTitle>
              <Building2 className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-secondary animate-pulse rounded" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-foreground">
                    {utilizationRate.toFixed(1)}%
                  </p>
                  <Progress value={utilizationRate} className="mt-2" />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Asset Breakdown */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Budget by Agricultural Asset</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {data.byAsset.map((asset, index) => {
                  const utilization = asset.allocated > 0 
                    ? (asset.spent / asset.allocated) * 100 
                    : 0;
                  
                  return (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            asset.type === 'estate' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {asset.type === 'estate' ? 'Estate' : 'Hub'}
                          </span>
                          <span className="font-medium text-foreground">{asset.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {utilization.toFixed(0)}% utilized
                        </span>
                      </div>
                      <Progress value={utilization} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Spent: {formatCurrency(asset.spent)}</span>
                        <span>Allocated: {formatCurrency(asset.allocated)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Investor Applications Section */}
        <Card variant="elevated" className="mt-6">
          <CardHeader>
            <CardTitle>Investor Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investorApps.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No applications received yet.</p>
              ) : (
                investorApps.map((app) => (
                  <div key={app.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-foreground">{app.companyName}</h3>
                      <p className="text-sm text-muted-foreground">Contact: {app.contactPerson} ({app.email})</p>
                      <p className="text-sm mt-1">Proposed Amount: ${parseFloat(app.amount).toLocaleString()}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className={app.status === 'Accepted' ? 'bg-green-500/10 text-green-600' : app.status === 'Rejected' ? 'bg-red-500/10 text-red-600' : 'bg-yellow-500/10 text-yellow-600'}>
                          {app.status}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600">Processing Fee Paid ($100)</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700" onClick={() => handleStatusChange(app.id, 'Accepted')} disabled={app.status === 'Accepted'}>
                        <Check className="w-4 h-4 mr-1" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleStatusChange(app.id, 'Rejected')} disabled={app.status === 'Rejected'}>
                        <Ban className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
