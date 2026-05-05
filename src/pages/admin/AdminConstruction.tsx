import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { farmEstatesApi, innovationHubsApi, FarmEstate, InnovationHub } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Edit2, Save, X, Building2, Lightbulb } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminConstruction() {
  const { toast } = useToast();
  const [estates, setEstates] = useState<FarmEstate[]>([]);
  const [hubs, setHubs] = useState<InnovationHub[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<{ type: 'estate'; data: FarmEstate } | { type: 'hub'; data: InnovationHub } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [estatesData, hubsData] = await Promise.all([
        farmEstatesApi.getAll(),
        innovationHubsApi.getAll()
      ]);
      setEstates(estatesData);
      setHubs(hubsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (type: 'estate' | 'hub', data: FarmEstate | InnovationHub) => {
    setEditingItem({ type, data: { ...data } } as { type: 'estate'; data: FarmEstate } | { type: 'hub'; data: InnovationHub });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const { type, data } = editingItem;
      if (type === 'estate') {
        await farmEstatesApi.update(data.id, {
          status: data.status,
          completionPercentage: data.completionPercentage,
          budgetSpent: data.budgetSpent
        });
      } else {
        await innovationHubsApi.update(data.id, {
          status: data.status,
          completionPercentage: data.completionPercentage,
          budgetSpent: data.budgetSpent
        });
      }
      
      toast({
        title: 'Success',
        description: 'Asset updated successfully'
      });
      fetchData();
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update asset',
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
    <AdminLayout title="Agricultural Assets Management">
      <div className="space-y-6">
        <Tabs defaultValue="estates" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="estates" className="gap-2">
              <Building2 className="w-4 h-4" />
              Farm Estates
            </TabsTrigger>
            <TabsTrigger value="hubs" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Innovation Hubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estates">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Mechanized Farm Estates Status</CardTitle>
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
                    {estates.map((estate) => (
                      <AssetCard 
                        key={estate.id} 
                        item={estate} 
                        onEdit={() => handleEdit('estate', estate)} 
                        getStatusColor={getStatusColor}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hubs">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Innovation & Agro Hub Status</CardTitle>
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
                    {hubs.map((hub) => (
                      <AssetCard 
                        key={hub.id} 
                        item={hub} 
                        onEdit={() => handleEdit('hub', hub)} 
                        getStatusColor={getStatusColor}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asset Progress</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label>Asset Name</Label>
                <Input value={editingItem.data.name} disabled />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={editingItem.data.status}
                  onValueChange={(value) => setEditingItem(prev => {
                    if (!prev) return null;
                    if (prev.type === 'estate') {
                      return { ...prev, data: { ...prev.data, status: value } };
                    }
                    return { ...prev, data: { ...prev.data, status: value } };
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="under_construction">Under Construction</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="rehabilitated">Rehabilitated</SelectItem>
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
                  value={editingItem.data.completionPercentage || 0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setEditingItem(prev => {
                      if (!prev) return null;
                      if (prev.type === 'estate') {
                        return { ...prev, data: { ...prev.data, completionPercentage: val } };
                      }
                      return { ...prev, data: { ...prev.data, completionPercentage: val } };
                    });
                  }}
                />
              </div>
              <div>
                <Label>Budget Spent (₦)</Label>
                <Input 
                  type="number"
                  autoComplete="off"
                  inputMode="numeric"
                  value={editingItem.data.budgetSpent || 0}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    setEditingItem(prev => {
                      if (!prev) return null;
                      if (prev.type === 'estate') {
                        return { ...prev, data: { ...prev.data, budgetSpent: val } };
                      }
                      return { ...prev, data: { ...prev.data, budgetSpent: val } };
                    });
                  }}
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

interface AssetCardProps {
  item: FarmEstate | InnovationHub;
  onEdit: () => void;
  getStatusColor: (status: string) => string;
}

function AssetCard({ item, onEdit, getStatusColor }: AssetCardProps) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.lga} LGA</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace('_', ' ')}
          </Badge>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{item.completionPercentage || 0}%</span>
        </div>
        <Progress value={item.completionPercentage || 0} />
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Budget Status</span>
          <span className="font-medium">
            ₦{((item.budgetSpent || 0) / 1000000).toFixed(1)}M / ₦{((item.budgetAllocated || 0) / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>
    </div>
  );
}
