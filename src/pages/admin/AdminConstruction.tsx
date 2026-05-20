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
import { Edit2, Save, X, Building2, Lightbulb, Rocket, Check, Ban, Coins } from 'lucide-react';
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

interface StartupApp {
  id: number;
  startupName: string;
  founderName: string;
  email: string;
  idea: string;
  status: string;
  feePaid: boolean;
}

export default function AdminConstruction() {
  const { toast } = useToast();
  const [estates, setEstates] = useState<FarmEstate[]>([]);
  const [hubs, setHubs] = useState<InnovationHub[]>([]);
  const [applications, setApplications] = useState<StartupApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<{ type: 'estate'; data: FarmEstate } | { type: 'hub'; data: InnovationHub } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
    // Load startup applications
    const stored = localStorage.getItem('startup_applications');
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    const updated = applications.map(app => app.id === id ? { ...app, status } : app);
    setApplications(updated);
    localStorage.setItem('startup_applications', JSON.stringify(updated));
    toast({
      title: `Application ${status}`,
      description: `Startup application has been marked as ${status}.`,
    });
  };

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
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Agricultural Assets Management</h1>
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
            <TabsTrigger value="applications" className="gap-2">
              <Rocket className="w-4 h-4" />
              Startup Applications
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

          <TabsContent value="applications">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Cohort Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No applications received yet.</p>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-foreground">{app.startupName}</h3>
                          <p className="text-sm text-muted-foreground">Founder: {app.founderName} ({app.email})</p>
                          <p className="text-sm mt-1">{app.idea}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className={app.status === 'Accepted' ? 'bg-green-500/10 text-green-600' : app.status === 'Rejected' ? 'bg-red-500/10 text-red-600' : 'bg-yellow-500/10 text-yellow-600'}>
                              {app.status}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600">Fee Paid</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700" onClick={() => handleStatusChange(app.id, 'Accepted')} disabled={app.status === 'Accepted'}>
                            <Check className="w-4 h-4 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleStatusChange(app.id, 'Rejected')} disabled={app.status === 'Rejected'}>
                            <Ban className="w-4 h-4 mr-1" /> Reject
                          </Button>
                          <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-700" onClick={() => handleStatusChange(app.id, 'Funds Allocated')}>
                            <Coins className="w-4 h-4 mr-1" /> Allocate Funds
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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
    </div>
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
