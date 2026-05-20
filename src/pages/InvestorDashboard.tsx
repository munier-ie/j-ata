import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, LineChart, FileText, Check, Clock, Upload, Eye, ExternalLink, Lock, Loader2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InvestorDashboard() {
  const [fundedStartups] = useState([
    { 
      id: 1, 
      name: "GreenField AgTech", 
      sector: "Smart Farming", 
      totalCommitted: "₦10,000,000",
      disbursed: "₦4,000,000",
      percentage: 40,
      nextMilestone: "MVP Launch",
      status: "On Track"
    },
    { 
      id: 2, 
      name: "Jigawa Cold Chain", 
      sector: "Logistics", 
      totalCommitted: "₦15,000,000",
      disbursed: "₦15,000,000",
      percentage: 100,
      nextMilestone: "Fully Funded",
      status: "Completed"
    },
    { 
      id: 3, 
      name: "BioFertilizer Lab", 
      sector: "Processing", 
      totalCommitted: "₦5,000,000",
      disbursed: "₦1,500,000",
      percentage: 30,
      nextMilestone: "Lab Setup",
      status: "Waiting for Proof"
    },
  ]);

  interface Application {
    id: string | number;
    startupName: string;
    sector: string;
    stage: string;
    fullName: string;
    status: string;
  }

  const [feeData] = useState({
    totalInvested: "₦26,500,000",
    platformFees: "₦1,325,000",
    startupsFunded: 3,
    pendingAllocations: "₦3,500,000"
  });

  const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
  const [isInvestor, setIsInvestor] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is registered as investor
    const userRole = localStorage.getItem('user_role');
    if (userRole === 'investor' || localStorage.getItem('investor_registered') === 'true') {
      setIsInvestor(true);
    }
    setCheckingAuth(false);

    // Load pending applications
    const apps = JSON.parse(localStorage.getItem('startup_applications') || '[]');
    setPendingApplications(apps.filter((app: Application) => app.status === 'Pending'));
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isInvestor) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Access Restricted</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            This dashboard is for registered investors only. Please register as an investor to access tracking and funding tools.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/register")}>
              Register as Investor
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investor Dashboard</h1>
            <p className="text-muted-foreground">Track your investments and platform fees.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{feeData.totalInvested}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Platform Fees (5%)</CardTitle>
              <LineChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{feeData.platformFees}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Startups Funded</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{feeData.startupsFunded}</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Allocations</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{feeData.pendingAllocations}</p>
            </CardContent>
          </Card>
        </div>

        {/* Explore Opportunities */}
        <div className="mb-8">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Project Pipeline</CardTitle>
              <CardDescription>Track state infrastructure projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/pipeline")}>View Pipeline</Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications Feed */}
        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Pending Startup Applications</CardTitle>
            <CardDescription>Startups waiting for admin approval/rejection. You can review them for potential funding.</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingApplications.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No pending applications at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApplications.map((app) => (
                  <div key={app.id} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-foreground">{app.startupName}</h3>
                      <p className="text-sm text-muted-foreground">{app.sector} • Stage: {app.stage}</p>
                      <p className="text-xs text-muted-foreground mt-1">Applicant: {app.fullName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" /> Review Idea
                      </Button>
                      <Button size="sm" variant="secondary" disabled>
                        Waiting for Admin
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Funded Startups Tracking */}
        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Milestone-Based Disbursement Tracking</CardTitle>
            <CardDescription>Monitor how your funds are being released based on verified progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fundedStartups.map((startup) => (
                <div key={startup.id} className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row justify-between mb-2 gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{startup.name}</h3>
                      <p className="text-sm text-muted-foreground">{startup.sector} • Next: {startup.nextMilestone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{startup.disbursed} / {startup.totalCommitted}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        startup.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                        startup.status === 'Waiting for Proof' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {startup.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress (Disbursed)</span>
                      <span>{startup.percentage}%</span>
                    </div>
                    <Progress value={startup.percentage} className="h-2" />
                  </div>

                  <div className="flex gap-2 mt-4 justify-end">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" /> View Financials
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" /> View Proof of Concept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Uploads & Reporting Simulation (Read-Only for Investors) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Proof of Concept / Spend Uploads</CardTitle>
              <CardDescription>Documents and media uploaded by startups to prove milestone completion.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 border-2 border-dashed rounded-lg bg-secondary/20">
                <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Startups upload files here. You can view them to verify milestones.</p>
                <Button size="sm" variant="outline" className="mt-2">
                  <Eye className="h-4 w-4 mr-1" /> View Uploaded Files
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Financial Reporting</CardTitle>
              <CardDescription>Ledger reported by startups on usage of funds.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm border-b pb-1">
                  <span>GreenField AgTech - Seeds Purchase</span>
                  <span className="text-red-500">-₦500,000</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-1">
                  <span>GreenField AgTech - Drone Rental</span>
                  <span className="text-red-500">-₦200,000</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1">
                  <span>Total Spent Reported</span>
                  <span>₦700,000</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">
                <ExternalLink className="h-4 w-4 mr-1" /> View Full Ledger
              </Button>
            </CardContent>
          </Card>
        </div>

      </main>
      <Footer />
    </div>
  );
}
