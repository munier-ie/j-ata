import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ranchesApi, Ranch } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Edit2, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminConstruction() {
  const { toast } = useToast();
  const [ranches, setRanches] = useState<Ranch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRanch, setEditingRanch] = useState<Ranch | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchRanches();
  }, []);

  const fetchRanches = async () => {
    try {
      const data = await ranchesApi.getAll();
      setRanches(data);
    } catch (error) {
      console.error('Error fetching ranches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ranch: Ranch) => {
    setEditingRanch({ ...ranch });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingRanch) return;

    try {
      await ranchesApi.update(editingRanch.id, {
        status: editingRanch.status,
        completionPercentage: editingRanch.completionPercentage,
        budgetSpent: editingRanch.budgetSpent
      });
      
      toast({
        title: 'Success',
        description: 'Ranch updated successfully'
      });
      fetchRanches();
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update ranch',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'under_construction': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <AdminLayout title="Construction Progress">
      <div className="space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Ranch Construction Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {ranches.map((ranch) => (
                  <div key={ranch.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{ranch.name}</h3>
                        <p className="text-sm text-muted-foreground">{ranch.lga} LGA</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(ranch.status)}>
                          {ranch.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="ghost" size="icon" aria-label="Edit ranch progress" onClick={() => handleEdit(ranch)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{ranch.completionPercentage || 0}%</span>
                      </div>
                      <Progress value={ranch.completionPercentage || 0} />
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-muted-foreground">Budget Spent</span>
                        <span className="font-medium">
                          ₦{((ranch.budgetSpent || 0) / 1000000).toFixed(1)}M / ₦{((ranch.budgetAllocated || 0) / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Construction Progress</DialogTitle>
          </DialogHeader>
          {editingRanch && (
            <div className="space-y-4">
              <div>
                <Label>Ranch Name</Label>
                <Input value={editingRanch.name} disabled />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={editingRanch.status}
                  onValueChange={(value) => setEditingRanch({...editingRanch, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="under_construction">Under Construction</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Completion Percentage</Label>
                <Input 
                  type="number"
                  autoComplete="off"
                  inputMode="numeric"
                  min="0" 
                  max="100"
                  value={editingRanch.completionPercentage || 0}
                  onChange={(e) => setEditingRanch({
                    ...editingRanch, 
                    completionPercentage: parseInt(e.target.value) || 0
                  })}
                />              </div>
              <div>
                <Label>Budget Spent (₦)</Label>
                <Input 
                  type="number"
                  autoComplete="off"
                  inputMode="numeric"
                  value={editingRanch.budgetSpent || 0}
                  onChange={(e) => setEditingRanch({
                    ...editingRanch, 
                    budgetSpent: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="governmentPrimary" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
