import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { exportApi, ExportApplication } from '@/lib/api';
import { 
  Search, 
  Filter, 
  Download, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  FileText,
  DollarSign,
  Building,
  Award,
  CalendarCheck
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminTraces() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<ExportApplication[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "expired_declined">("pending");

  // Selection state for detail modal
  const [selectedApp, setSelectedApp] = useState<ExportApplication | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [signatoryName, setSignatoryName] = useState("Dr. Munier-ie");
  const [signatoryTitle, setSignatoryTitle] = useState("Director General, J-ATA");

  useEffect(() => {
    if (selectedApp) {
      setSignatoryName(selectedApp.signatoryName || "Dr. Munier-ie");
      setSignatoryTitle(selectedApp.signatoryTitle || "Director General, J-ATA");
    }
  }, [selectedApp]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await exportApi.getApplications();
      setApplications(response);
    } catch (error) {
      console.error(error);
      toast({
        title: "Database Error",
        description: "Failed to pull registry applications.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleIssue = async (id: string) => {
    setSubmitting(true);
    try {
      await exportApi.issueCertificate(id, signatoryName, signatoryTitle);
      toast({
        title: "Certificate Issued Successfully",
        description: "Exporter registration certificate has been printed and issued in JATA database.",
        className: "bg-green-600 text-white border-none"
      });
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Issue",
        description: "An error occurred while generating official state certificate.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async (id: string) => {
    setSubmitting(true);
    try {
      await exportApi.rejectApplication(id);
      toast({
        title: "Application Declined",
        description: "The export application was successfully flagged as rejected.",
        className: "bg-red-600 text-white border-none"
      });
      setSelectedApp(null);
      fetchApplications();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Reject",
        description: "Database update error.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filter application sets based on tab
  const getFilteredApps = () => {
    return applications.filter(app => {
      // Basic search filter
      const matchesSearch = 
        app.companyName.toLowerCase().includes(search.toLowerCase()) ||
        app.rcNumber.toLowerCase().includes(search.toLowerCase()) ||
        app.fullName.toLowerCase().includes(search.toLowerCase()) ||
        app.applicationNo.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Status filters
      if (activeTab === "pending") {
        return app.status === "pending" && app.paymentStatus === "paid";
      }
      if (activeTab === "approved") {
        return app.status === "approved";
      }
      if (activeTab === "expired_declined") {
        return app.status === "expired" || app.status === "rejected";
      }
      return true;
    });
  };

  // Statistics calculation
  const stats = {
    totalRevenue: applications.filter(app => app.paymentStatus === "paid").reduce((acc, app) => acc + app.paymentAmount, 0),
    activeCerts: applications.filter(app => app.status === "approved").length,
    pendingReviews: applications.filter(app => app.status === "pending" && app.paymentStatus === "paid").length,
    expiredDeclined: applications.filter(app => app.status === "expired" || app.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Export Certification Registry</h1>
          <p className="text-sm text-muted-foreground mt-1">Review corporate CAC registries, authenticate export quality levies, and issue official state export licenses.</p>
        </div>
        <Button onClick={fetchApplications} disabled={loading} variant="outline">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Revenue Generated</p>
                <p className="text-2xl font-bold font-mono text-emerald-600">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Exporters</p>
                <p className="text-2xl font-bold font-mono text-foreground">{stats.activeCerts}</p>
              </div>
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending Verification</p>
                <p className="text-2xl font-bold font-mono text-amber-600">{stats.pendingReviews}</p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expired / Declined</p>
                <p className="text-2xl font-bold font-mono text-red-600">{stats.expiredDeclined}</p>
              </div>
              <div className="p-3 bg-red-500/10 text-red-600 rounded-2xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-border/60">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 ${
            activeTab === "pending"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Pending Verification ({stats.pendingReviews})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 ${
            activeTab === "approved"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Issued Certificates ({stats.activeCerts})
        </button>
        <button
          onClick={() => setActiveTab("expired_declined")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all duration-200 ${
            activeTab === "expired_declined"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Expired & Rejected
        </button>
      </div>

      {/* Application Table Card */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Exporter Registry Records</CardTitle>
              <CardDescription>
                {activeTab === "pending" && "Verify details and issue certificates for submitted applications."}
                {activeTab === "approved" && "Exporters currently holding authorized active certificates."}
                {activeTab === "expired_declined" && "Records of applications that have expired or been declined."}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search company, RC, or application ID..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
              <p className="text-sm font-semibold">Loading exporters database...</p>
            </div>
          ) : getFilteredApps().length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <Building className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-bold">No Records Found</p>
              <p className="text-sm">There are no records matching the query in this category.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application No</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>RC Number</TableHead>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Representative</TableHead>
                  <TableHead>Levy Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredApps().map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-mono font-medium">{app.applicationNo}</TableCell>
                    <TableCell className="font-semibold text-foreground">{app.companyName}</TableCell>
                    <TableCell className="font-mono">{app.rcNumber}</TableCell>
                    <TableCell>{app.commodityType}</TableCell>
                    <TableCell>{app.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={app.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}>
                        ₦15,200 (Paid)
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {app.status === 'pending' && <Badge className="bg-amber-500/10 text-amber-600" variant="outline">Pending JATA Review</Badge>}
                      {app.status === 'approved' && <Badge className="bg-emerald-500/10 text-emerald-600" variant="outline">Active & Verified</Badge>}
                      {app.status === 'rejected' && <Badge className="bg-red-500/10 text-red-600" variant="outline">Declined</Badge>}
                      {app.status === 'expired' && <Badge className="bg-red-500/10 text-red-600" variant="outline">Expired</Badge>}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => setSelectedApp(app)}>
                        <FileText className="w-4 h-4" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Details / Review / Verify Dialog */}
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Certification Details</DialogTitle>
              <DialogDescription>Review application credentials and verify business compliance details.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 my-4 border-y border-border py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Application Number</span>
                  <p className="font-mono font-bold text-foreground mt-0.5">{selectedApp.applicationNo}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Export Commodity Type</span>
                  <p className="font-bold text-emerald-600 mt-0.5">{selectedApp.commodityType}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Official Registered Company</span>
                  <p className="font-extrabold text-foreground text-md mt-0.5">{selectedApp.companyName}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">CAC RC Number</span>
                  <p className="font-mono font-bold mt-0.5">{selectedApp.rcNumber}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Representative Exporter</span>
                  <p className="font-bold mt-0.5">{selectedApp.fullName}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Email Address</span>
                  <p className="mt-0.5 font-medium">{selectedApp.email}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</span>
                  <p className="mt-0.5 font-medium">{selectedApp.phone}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Office Location</span>
                  <p className="mt-0.5 font-medium">{selectedApp.businessAddress}</p>
                </div>
                {selectedApp.status === "approved" && (
                  <>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase text-emerald-600">Certificate Number</span>
                      <p className="font-mono font-extrabold text-emerald-600 mt-0.5">{selectedApp.certificateNo}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase text-red-500">License Expiration</span>
                      <p className="font-bold text-red-500 mt-0.5">{selectedApp.expiryDate ? new Date(selectedApp.expiryDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Signatory Name</span>
                      <p className="font-bold text-foreground mt-0.5">{selectedApp.signatoryName || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Signatory Title</span>
                      <p className="font-bold text-foreground mt-0.5">{selectedApp.signatoryTitle || "N/A"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {selectedApp.status === "pending" && (
              <div className="space-y-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl my-4 text-sm">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-400">Signatory Authority</h4>
                <p className="text-xs text-muted-foreground">Assign the authorized official name and title to sign this certificate.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1">
                    <label htmlFor="signatoryName" className="text-xs font-medium text-muted-foreground">Signatory Name</label>
                    <Input 
                      id="signatoryName"
                      value={signatoryName}
                      onChange={(e) => setSignatoryName(e.target.value)}
                      placeholder="Dr. Munier-ie"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="signatoryTitle" className="text-xs font-medium text-muted-foreground">Signatory Title</label>
                    <Input 
                      id="signatoryTitle"
                      value={signatoryTitle}
                      onChange={(e) => setSignatoryTitle(e.target.value)}
                      placeholder="Director General, J-ATA"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between sm:justify-between w-full">
              <div>
                {selectedApp.status === "pending" && (
                  <Button 
                    variant="ghost" 
                    onClick={() => handleReject(selectedApp.id)} 
                    disabled={submitting} 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-bold"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><XCircle className="w-4 h-4 mr-2" /> Decline Application</>}
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedApp(null)} disabled={submitting}>
                  Cancel
                </Button>
                
                {selectedApp.status === "pending" && (
                  <Button 
                    onClick={() => handleIssue(selectedApp.id)} 
                    disabled={submitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4 mr-2" /> Verify & Issue Certificate</>}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
