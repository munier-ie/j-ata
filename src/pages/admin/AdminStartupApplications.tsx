import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Clock, Eye, Rocket, User, Briefcase } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Application {
  id: string | number;
  fullName: string;
  email: string;
  startupName: string;
  sector: string;
  stage: string;
  status: string;
  feePaid: boolean;
}

export default function AdminStartupApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const { toast } = useToast();
  const [rejectingId, setRejectingId] = useState<string | number | null>(null);
  const [rejectionNote, setRejectionNote] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  useEffect(() => {
    // Load from API
    const loadApplications = () => {
      fetch('/api/startups')
        .then(res => res.json())
        .then(data => {
          // Adapt data structure from DB (answers field)
          const adapted = data.map((app: { id: string | number; status: string; answers?: Record<string, string> }) => ({
            id: app.id,
            fullName: app.answers?.fullName || 'N/A',
            email: app.answers?.email || 'N/A',
            startupName: app.answers?.startupName || 'N/A',
            sector: app.answers?.sector || 'N/A',
            stage: app.answers?.stage || 'N/A',
            status: app.status,
            feePaid: true // Assume paid if submitted
          }));
          setApplications(adapted);
        })
        .catch(err => console.error('Error loading applications:', err));
    };

    loadApplications();
  }, []);

  const handleStatusChange = (id: string | number, newStatus: string, note?: string) => {
    // Save to DB via API
    fetch(`/api/startups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      const updated = applications.map(app => 
        app.id === id ? { ...app, status: newStatus, rejectionNote: note } : app
      );
      setApplications(updated);
      
      toast({
        title: `Application ${newStatus}`,
        description: `Startup application has been marked as ${newStatus}.`,
      });
    })
    .catch(err => console.error('Error updating application:', err));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Startup Applications</h1>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{applications.filter(a => a.status === 'Pending').length}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{applications.filter(a => a.status === 'Accepted').length}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Received</CardTitle>
              <Rocket className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{applications.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Review and manage startup applications for the 2026 cohort.</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No applications received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-secondary/20 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{app.startupName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          app.status === 'Accepted' ? 'bg-green-500/10 text-green-600' :
                          app.status === 'Rejected' ? 'bg-red-500/10 text-red-600' :
                          'bg-yellow-500/10 text-yellow-600'
                        }`}>
                          {app.status}
                        </span>
                        {app.feePaid && (
                          <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full font-medium">Fee Paid</span>
                        )}
                      </div>
                      <div className="flex flex-col text-sm text-muted-foreground space-y-0.5">
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {app.fullName} ({app.email})</span>
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {app.sector} • Stage: {app.stage}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      {app.status === 'Pending' && (
                        <>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleStatusChange(app.id, 'Accepted')}>
                            <Check className="h-4 w-4 mr-1" /> Accept
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => {
                            setRejectingId(app.id);
                            setIsRejectDialogOpen(true);
                          }}>
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      {/* Reject Note Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection. This will be visible to the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="e.g., Business model is not clear, or does not fit our criteria." 
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              if (rejectingId) {
                handleStatusChange(rejectingId, 'Rejected', rejectionNote);
                setIsRejectDialogOpen(false);
                setRejectionNote("");
                setRejectingId(null);
              }
            }}>Confirm Rejection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
