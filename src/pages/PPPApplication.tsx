import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2, ArrowRight, ArrowLeft, Building2, User, FileText, DollarSign, Sparkles, CreditCard, Landmark, Wallet, Briefcase, Calendar } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const steps = [
  { id: 1, name: "Investor Information", icon: User },
  { id: 2, name: "Project Selection", icon: Building2 },
  { id: 3, name: "Commitment & ROI", icon: DollarSign },
  { id: 4, name: "Review & Submit", icon: FileText },
];

export default function PPPApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stepLoading, setStepLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    selectedProject: "",
    proposedInvestment: "",
    expectedRoi: "",
    termsAccepted: false
  });

  useEffect(() => {
    if (localStorage.getItem('ppp_applied') === 'true') {
      setSuccess(true);
    }
  }, []);

  const projects = [
    { id: 1, title: "Sesame Cleaning Plant in Maigatari", location: "Maigatari" },
    { id: 2, title: "Commercial Dairy Farm in Hadejia", location: "Hadejia" },
    { id: 3, title: "Rice Processing Mill in Ringim", location: "Ringim" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [id]: target.checked });
    } else {
      if (id === 'phone') {
        // Only allow numbers
        const val = value.replace(/[^0-9]/g, '');
        if (val.length <= 11) {
          setFormData({ ...formData, [id]: val });
        }
      } else {
        setFormData({ ...formData, [id]: value });
      }
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setStepLoading(true);
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setStepLoading(false);
      }, delay);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length) {
      nextStep();
      return;
    }

    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      toast({
        title: "Select Payment Option",
        description: "Please choose a payment method.",
        variant: "destructive"
      });
      return;
    }

    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      setSuccess(true);
      
      toast({
        title: "Application Submitted",
        description: "Your PPP application has been received.",
      });
      
      // Save to DB via API
      fetch('/api/ppp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('ppp_applied', 'true');
      })
      .catch(err => console.error('Error saving PPP:', err));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
        
        {/* Stepper Header */}
        <div className="w-full max-w-4xl mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${currentStep >= step.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-secondary border-muted text-muted-foreground'}
                  ${currentStep === step.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                  transition-all duration-300`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`mt-2 text-xs font-medium ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 
                    ${currentStep > step.id ? 'bg-primary' : 'bg-secondary'}
                    transition-all duration-300`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Card */}
        <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary">
          {!success ? (
            <>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Apply for PPP Project
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of {steps.length}: {steps[currentStep-1].name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Investor Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" value={formData.companyName} onChange={handleInputChange} required placeholder="Acme Corp" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input id="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder="08012345678" maxLength={11} minLength={11} pattern="[0-9]{11}" />
                        <p className="text-xs text-muted-foreground">Must be exactly 11 digits.</p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="selectedProject">Select Project</Label>
                        <select 
                          id="selectedProject" 
                          value={formData.selectedProject} 
                          onChange={handleInputChange} 
                          required
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a project</option>
                          {projects.map(p => (
                            <option key={p.id} value={p.title}>{p.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Commitment & ROI */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="proposedInvestment">Proposed Investment (₦)</Label>
                        <Input id="proposedInvestment" type="number" value={formData.proposedInvestment} onChange={handleInputChange} required placeholder="50000000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedRoi">Expected ROI (%)</Label>
                        <Input id="expectedRoi" type="number" value={formData.expectedRoi} onChange={handleInputChange} required placeholder="15" />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-medium">Summary</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Company:</span>
                          <span>{formData.companyName}</span>
                          <span className="text-muted-foreground">Project:</span>
                          <span>{formData.selectedProject}</span>
                          <span className="text-muted-foreground">Investment:</span>
                          <span className="font-bold text-primary">₦{parseFloat(formData.proposedInvestment).toLocaleString()}</span>
                          <span className="text-muted-foreground">Expected ROI:</span>
                          <span>{formData.expectedRoi}%</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="termsAccepted" 
                          checked={formData.termsAccepted} 
                          onChange={handleInputChange}
                          required
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="termsAccepted" className="text-sm">I agree to the terms and conditions of the PPP program.</Label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep} disabled={loading || stepLoading}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                    )}
                    <Button type="submit" className={currentStep === 1 ? "w-full" : "ml-auto"} disabled={loading || stepLoading}>
                      {stepLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Loading...
                        </>
                      ) : currentStep === steps.length ? (
                        <>Proceed to Payment</>
                      ) : (
                        <>
                          Next <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          ) : (
            /* Success State */
            <CardContent className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">PPP Application Submitted!</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Your application to partner on **{formData.selectedProject}** has been received. Our investment team will review it and contact you shortly.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => navigate("/investors")}>
                  Back to Investment Portal
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </main>
      <Footer />

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Processing Fee</DialogTitle>
            <DialogDescription>
              Please select a payment option to complete your PPP application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div 
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedPayment === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}
              onClick={() => setSelectedPayment('card')}
            >
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Pay with Visa or Mastercard</p>
              </div>
            </div>
            <div 
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedPayment === 'bank' ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}
              onClick={() => setSelectedPayment('bank')}
            >
              <Landmark className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">Direct bank transfer</p>
              </div>
            </div>
            <div 
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedPayment === 'wallet' ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}
              onClick={() => setSelectedPayment('wallet')}
            >
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Digital Wallet</p>
                <p className="text-xs text-muted-foreground">Pay with mobile money</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)} disabled={paymentProcessing}>Cancel</Button>
            <Button onClick={handlePayment} disabled={paymentProcessing}>
              {paymentProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Pay & Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PPP Tracking Section */}
      <div className="w-full max-w-4xl mt-16">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Governance & Investment</Badge>
          <h2 className="text-3xl font-bold mb-2">Active Partnership Ledger</h2>
          <p className="text-muted-foreground">Monitor signed and pending PPP agreements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> Active Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">12</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> Total Private Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">₦1.2B</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Projects Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">4</span>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Partnership Ledger</CardTitle>
            <CardDescription>Official record of signed and pending PPP agreements.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Private Share</TableHead>
                  <TableHead className="text-right">State Share</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 1,
                    company: "China Overseas Engineering Co.",
                    project: "Hadejia Irrigation Expansion",
                    contribution: "₦500,000,000",
                    stateContribution: "₦200,000,000",
                    status: "Active"
                  },
                  {
                    id: 2,
                    company: "Dangote Agrosacks",
                    project: "Dutse Processing Hub",
                    contribution: "₦300,000,000",
                    stateContribution: "₦100,000,000",
                    status: "Pending"
                  }
                ].map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.company}</TableCell>
                    <TableCell>{p.project}</TableCell>
                    <TableCell className="text-right">{p.contribution}</TableCell>
                    <TableCell className="text-right">{p.stateContribution}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={p.status === 'Active' ? 'default' : 'secondary'}>
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
