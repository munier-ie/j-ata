import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Building2, Check, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const [investorApps, setInvestorApps] = useState<InvestorApp[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const totalAllocated = 17400000000;
  const totalSpent = 12800000000;
  const utilizationRate = 73.6;

  useEffect(() => {
    // Load investor applications
    const stored = localStorage.getItem('investor_applications');
    if (stored) {
      setInvestorApps(JSON.parse(stored));
    }
    setLoading(false);
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

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `₦${(amount / 1000000000).toFixed(2)}B`;
    }
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${amount.toLocaleString()}`;
  };

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
                  {formatCurrency(totalAllocated)}
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
                  {formatCurrency(totalSpent)}
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
                    {utilizationRate}%
                  </p>
                  <Progress value={utilizationRate} className="mt-2" />
                </>
              )}
            </CardContent>
          </Card>
        </div>

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
