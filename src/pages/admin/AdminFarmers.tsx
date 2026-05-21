import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmersApi, Farmer } from '@/lib/api';
import { Search, User, Check, Trash2, Loader2, Eye, Calendar, MapPin, Tag, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const data = await farmersApi.getAll();
      const normalizedData = data.map(farmer => ({
        ...farmer,
        cropTypes: typeof farmer.cropTypes === 'string'
          ? (farmer.cropTypes ? (farmer.cropTypes as string).split(',') : [])
          : (Array.isArray(farmer.cropTypes) ? farmer.cropTypes : [])
      }));
      setFarmers(normalizedData);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setActionLoading(id);
      await farmersApi.update(id, { status: 'approved' });
      setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: 'approved' } : f));
      toast({
        title: "Farmer Approved",
        description: "The farmer registry has been approved successfully.",
      });
    } catch (error) {
      console.error("Error approving farmer:", error);
      toast({
        title: "Approval Failed",
        description: "Could not approve the farmer profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this farmer registry? This action is permanent and cannot be undone.")) {
      return;
    }
    try {
      setActionLoading(id);
      await farmersApi.delete(id);
      setFarmers(prev => prev.filter(f => f.id !== id));
      toast({
        title: "Farmer Deleted",
        description: "The registry record was deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting farmer:", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete the farmer registry record. Please try again.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredFarmers = useMemo(
    () => farmers.filter(farmer => 
      farmer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      farmer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      farmer.farmerId.toLowerCase().includes(search.toLowerCase()) ||
      farmer.lga.toLowerCase().includes(search.toLowerCase())
    ),
    [farmers, search]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Farmer Registry</h1>
      <div className="space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Central Farmer Database</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search farmers..."
                  autoComplete="off"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-secondary animate-pulse rounded" />
                ))}
              </div>
            ) : filteredFarmers.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No farmers registered yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Photo</TableHead>
                      <TableHead>Farmer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>LGA</TableHead>
                      <TableHead>Crops & Assets</TableHead>
                      <TableHead>Farm Size (Ha)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFarmers.map((farmer) => (
                      <TableRow key={farmer.id} className="group hover:bg-muted/30 transition-colors">
                        <TableCell className="w-12">
                          {farmer.passportUrl ? (
                            <img 
                              src={farmer.passportUrl} 
                              alt={`${farmer.firstName} ${farmer.lastName}`}
                              className="w-10 h-10 rounded-full object-cover border border-emerald-500/20 shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              {farmer.firstName[0]}{farmer.lastName[0]}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {farmer.farmerId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {farmer.firstName} {farmer.lastName}
                        </TableCell>
                        <TableCell>{farmer.phone}</TableCell>
                        <TableCell>{farmer.lga}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {farmer.cropTypes.slice(0, 2).map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20">
                                {type}
                              </Badge>
                            ))}
                            {farmer.cropTypes.length > 2 && (
                              <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-600">
                                +{farmer.cropTypes.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-emerald-800 dark:text-emerald-200">{farmer.farmSize}</TableCell>
                        <TableCell>
                          <Badge className={
                            farmer.status === 'approved' || farmer.status === 'active' 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-none' 
                            : farmer.status === 'pending'
                            ? 'bg-amber-500 hover:bg-amber-600 text-white border-none'
                            : 'bg-slate-500 hover:bg-slate-600 text-white border-none'
                          }>
                            {farmer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 animate-fade-in"
                              onClick={() => {
                                setSelectedFarmer(farmer);
                                setDialogOpen(true);
                              }}
                              title="View Application Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {farmer.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                onClick={() => handleApprove(farmer.id)}
                                disabled={actionLoading === farmer.id}
                                title="Approve Farmer"
                              >
                                {actionLoading === farmer.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              onClick={() => handleDelete(farmer.id)}
                              disabled={actionLoading === farmer.id}
                              title="Delete Farmer"
                            >
                              {actionLoading === farmer.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border/80">
          <DialogHeader className="border-b border-border/50 pb-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-display font-bold text-foreground">
              <User className="w-5 h-5 text-primary" />
              Farmer Registration Details
            </DialogTitle>
          </DialogHeader>

          {selectedFarmer && (
            <div className="space-y-6 pt-4">
              {/* Header Profile Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                {selectedFarmer.passportUrl ? (
                  <img 
                    src={selectedFarmer.passportUrl} 
                    alt={`${selectedFarmer.firstName} ${selectedFarmer.lastName}`}
                    className="w-16 h-16 rounded-lg object-cover border border-border shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <span className="text-3xl">👨🏾‍🌾</span>
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {selectedFarmer.firstName} {selectedFarmer.lastName}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {selectedFarmer.farmerId}
                  </p>
                </div>
                <Badge className={
                  selectedFarmer.status === 'approved' || selectedFarmer.status === 'active'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-none'
                  : selectedFarmer.status === 'pending'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-none'
                  : 'bg-slate-500 hover:bg-slate-600 text-white border-none'
                }>
                  {selectedFarmer.status}
                </Badge>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div className="space-y-3 p-3.5 bg-secondary/10 rounded-lg border border-border/30">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" /> Personal Information
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <p><span className="text-muted-foreground">NIN:</span> <span className="font-medium text-foreground font-mono">{selectedFarmer.nin || 'Not Provided'}</span></p>
                    <p className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{selectedFarmer.phone}</span></p>
                  </div>
                </div>

                {/* Geography */}
                <div className="space-y-3 p-3.5 bg-secondary/10 rounded-lg border border-border/30">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Geographic Region
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <p><span className="text-muted-foreground">LGA:</span> <span className="font-medium text-foreground">{selectedFarmer.lga}</span></p>
                    <p><span className="text-muted-foreground">Ward:</span> <span className="font-medium text-foreground">{selectedFarmer.ward}</span></p>
                    <p><span className="text-muted-foreground">Community:</span> <span className="font-medium text-foreground">{selectedFarmer.community}</span></p>
                  </div>
                </div>

                {/* Farm Parameters */}
                <div className="md:col-span-2 space-y-3 p-3.5 bg-secondary/10 rounded-lg border border-border/30">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-primary" /> Cultivated Farm Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-1">Farm Size</p>
                      <p className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
                        {selectedFarmer.farmSize} Hectares
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Core Crops</p>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {selectedFarmer.cropTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="text-[10px] py-0 px-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="md:col-span-2 flex items-center gap-2 text-[10px] text-muted-foreground px-1">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Submitted on: {new Date(selectedFarmer.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2">
                <div className="flex items-center gap-2">
                  {selectedFarmer.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="governmentPrimary"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                      onClick={async () => {
                        await handleApprove(selectedFarmer.id);
                        setSelectedFarmer(prev => prev ? { ...prev, status: 'approved' } : null);
                      }}
                      disabled={actionLoading === selectedFarmer.id}
                    >
                      {actionLoading === selectedFarmer.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Approve Farmer
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium"
                    onClick={async () => {
                      const id = selectedFarmer.id;
                      await handleDelete(id);
                      setDialogOpen(false);
                    }}
                    disabled={actionLoading === selectedFarmer.id}
                  >
                    {actionLoading === selectedFarmer.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete Registry
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
