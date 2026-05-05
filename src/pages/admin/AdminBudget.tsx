import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ranchesApi, clinicsApi } from '@/lib/api';
import { DollarSign, TrendingUp, Building2 } from 'lucide-react';

interface BudgetData {
  totalAllocated: number;
  totalSpent: number;
  byFacility: {
    name: string;
    allocated: number;
    spent: number;
    type: 'ranch' | 'clinic';
  }[];
}

export default function AdminBudget() {
  const [data, setData] = useState<BudgetData>({
    totalAllocated: 0,
    totalSpent: 0,
    byFacility: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const [ranches, clinics] = await Promise.all([
        ranchesApi.getAll(),
        clinicsApi.getAll()
      ]);

      const totalAllocated = 
        ranches.reduce((sum, r) => sum + (r.budgetAllocated || 0), 0) +
        clinics.reduce((sum, c) => sum + (c.budgetAllocated || 0), 0);

      const totalSpent = 
        ranches.reduce((sum, r) => sum + (r.budgetSpent || 0), 0) +
        clinics.reduce((sum, c) => sum + (c.budgetSpent || 0), 0);

      const byFacility = [
        ...ranches.map(r => ({
          name: r.name,
          allocated: r.budgetAllocated || 0,
          spent: r.budgetSpent || 0,
          type: 'ranch' as const
        })),
        ...clinics.map(c => ({
          name: c.name,
          allocated: c.budgetAllocated || 0,
          spent: c.budgetSpent || 0,
          type: 'clinic' as const
        }))
      ].sort((a, b) => b.allocated - a.allocated);

      setData({ totalAllocated, totalSpent, byFacility });
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
    <AdminLayout title="Budget Allocation">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Allocated
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
                Total Spent
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
                Utilization Rate
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

        {/* Facility Breakdown */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Budget by Facility</CardTitle>
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
                {data.byFacility.map((facility, index) => {
                  const utilization = facility.allocated > 0 
                    ? (facility.spent / facility.allocated) * 100 
                    : 0;
                  
                  return (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            facility.type === 'ranch' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {facility.type === 'ranch' ? 'Ranch' : 'Clinic'}
                          </span>
                          <span className="font-medium text-foreground">{facility.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {utilization.toFixed(0)}% utilized
                        </span>
                      </div>
                      <Progress value={utilization} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Spent: {formatCurrency(facility.spent)}</span>
                        <span>Allocated: {formatCurrency(facility.allocated)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
