import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, GraduationCap, Users, LineChart, Cpu, Coins, Check, Clock, Upload, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const StartupPortal = () => {
  // Simulation State
  const [mentors] = useState([
    { id: 1, name: "Dr. Ibrahim Musa", role: "Agronomist", expertise: "Crop Yield Optimization" },
    { id: 2, name: "Aisha Bello", role: "Tech Founder", expertise: "Supply Chain Software" },
  ]);

  const [milestones] = useState([
    { id: 1, title: "Product MVP Complete", amount: "₦500,000", status: "Completed" },
    { id: 2, title: "Pilot with 50 Farmers", amount: "₦1,000,000", status: "Pending" },
  ]);

  const [applied, setApplied] = useState(false);
  const [applicationData, setApplicationData] = useState<{ id?: string | number; status: string; rejectionNote?: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('startup_applications') || '[]');
    if (existing.length > 0) {
      setApplied(true);
      setApplicationData(existing[0]);
    }
  }, []);
  const [formState, setFormState] = useState({
    startupName: "",
    founderName: "",
    email: "",
    idea: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('startup_applications') || '[]');
    existing.push({ ...formState, id: Date.now(), status: 'Pending', feePaid: true });
    localStorage.setItem('startup_applications', JSON.stringify(existing));
    
    setApplied(true);
    setIsDialogOpen(false);
    toast({
      title: "Application Submitted",
      description: "Your application has been received. Fee of ₦2,450 charged.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Agribusiness Incubation & AgTech Hub
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Digital backbone for the 2026 incubation programme. Supporting homegrown AgTech solutions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" disabled={applied} onClick={() => navigate("/startup/apply")}>
              {applied ? "Application Submitted" : "Apply for Cohort"}
            </Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>

          {applied && applicationData && (
            <Card className="mt-8 max-w-2xl mx-auto border-primary/20 text-left">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  Application Status: <span className="text-primary">{applicationData.status}</span>
                </CardTitle>
                <CardDescription>
                  Track your startup application progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <span className="mt-1">Applied</span>
                  </div>
                  <div className="h-0.5 bg-muted flex-grow mx-2" />
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${['Accepted', 'Rejected'].includes(applicationData.status) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>2</div>
                    <span className="mt-1">Reviewed</span>
                  </div>
                  <div className="h-0.5 bg-muted flex-grow mx-2" />
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${applicationData.status === 'Accepted' ? 'bg-green-500 text-white' : applicationData.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-secondary text-muted-foreground'}`}>3</div>
                    <span className="mt-1">{applicationData.status === 'Rejected' ? 'Rejected' : 'Accepted'}</span>
                  </div>
                </div>
                {applicationData.status === 'Rejected' && applicationData.rejectionNote && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    <p className="font-bold">Reason for Rejection:</p>
                    <p>{applicationData.rejectionNote}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Simulation Section: Mentors & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mentor List */}
          <Card>
            <CardHeader>
              <CardTitle>Available Mentors</CardTitle>
              <CardDescription>Connect with experts to guide your startup.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.role} • {mentor.expertise}</p>
                    </div>
                    <Button size="sm">Book Session</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestone Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Grant Milestones</CardTitle>
              <CardDescription>Track your funding progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((ms) => (
                  <div key={ms.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{ms.title}</p>
                      <p className="text-sm text-muted-foreground">Disbursement: {ms.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {ms.status === "Completed" ? (
                        <span className="flex items-center text-xs text-green-600 font-medium gap-1">
                          <Check className="h-4 w-4" /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-yellow-600 font-medium gap-1">
                          <Clock className="h-4 w-4" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Startup Reporting Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Submit Proof of Concept */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Proof of Concept / Spend Uploads
              </CardTitle>
              <CardDescription>Upload receipts or media to prove milestone completion for investors.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="poc-title">Milestone/Title</Label>
                  <Input id="poc-title" placeholder="e.g., MVP Launch Receipts" />
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    const title = (document.getElementById('poc-title') as HTMLInputElement).value;
                    const proofUrl = "/uploads/mock-receipt.pdf"; 
                    
                    const appId = applicationData?.id || "mock-app-id";

                    fetch(`/api/startups/${appId}/deliverables`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title, description: 'Submitted via portal', amount: '0', proofUrl })
                    })
                    .then(res => res.json())
                    .then(data => {
                      toast({
                        title: "Document Submitted",
                        description: "Your document has been submitted for verification.",
                      });
                    })
                    .catch(err => console.error('Error submitting document:', err));
                  }}
                >
                  Submit for Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Financial Reporting */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Financial Reporting
              </CardTitle>
              <CardDescription>Log your expenses to show usage of funds.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="expense-item">Expense Item</Label>
                  <Input id="expense-item" placeholder="e.g., Office Rent" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expense-amount">Amount (₦)</Label>
                  <Input id="expense-amount" type="number" placeholder="50000" />
                </div>
                <Button className="w-full" variant="outline">Add Expense</Button>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Recent Expenses</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Seeds Purchase</span>
                      <span className="text-red-500">-₦500,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Drone Rental</span>
                      <span className="text-red-500">-₦200,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funding & Grants */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Funding & Grants (Milestone-Based)
            </CardTitle>
            <CardDescription>Track your fund disbursement progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Allocated: ₦5,000,000</span>
                  <span className="font-medium">40% Disbursed</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-muted-foreground">Upfront (40%)</p>
                  <p className="font-bold">₦2,000,000</p>
                  <Badge className="bg-green-600 mt-1">Released</Badge>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-muted-foreground">Milestone 1 (30%)</p>
                  <p className="font-bold">₦1,500,000</p>
                  <Badge variant="outline" className="mt-1">Pending Review</Badge>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-muted-foreground">Milestone 2 (30%)</p>
                  <p className="font-bold">₦1,500,000</p>
                  <Badge variant="secondary" className="mt-1">Locked</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Startup Application */}
          <Card>
            <CardHeader>
              <Rocket className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Application & Selection</CardTitle>
              <CardDescription>
                Apply for the 2026 cohort and track your status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Submit your pitch deck and business plan. Get scored by industry experts.
              </p>
            </CardContent>
          </Card>

          {/* Grant Management */}
          <Card>
            <CardHeader>
              <Coins className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Grant & Funding</CardTitle>
              <CardDescription>
                Track disbursements and milestone reporting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your funding schedule, submit proof of milestones, and manage your grant.
              </p>
            </CardContent>
          </Card>

          {/* Mentor Matching */}
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mentor Matching</CardTitle>
              <CardDescription>
                Connect with experts in Agronomy, Tech, and Business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get paired with a mentor tailored to your needs. Schedule sessions and track progress.
              </p>
            </CardContent>
          </Card>

          {/* Performance Tracking */}
          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Performance Tracking</CardTitle>
              <CardDescription>
                Monitor your startup's growth and impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Input your monthly KPIs: revenue, jobs created, and farmers reached.
              </p>
            </CardContent>
          </Card>

          {/* Innovation Sandbox */}
          <Card>
            <CardHeader>
              <Cpu className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Innovation Sandbox</CardTitle>
              <CardDescription>
                API access to Jigawa's Data Hub.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build solutions using state data on weather, market prices, and soil maps.
              </p>
              <Button className="mt-4 w-full" onClick={() => navigate("/sandbox")}>Access Sandbox</Button>
            </CardContent>
          </Card>

          {/* Graduation & Beyond */}
          <Card>
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Graduation & Demo Day</CardTitle>
              <CardDescription>
                Prepare for investor pitches and market entry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete the program and pitch to local and international investors.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartupPortal;
