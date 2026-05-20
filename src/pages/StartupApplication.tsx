import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2, ArrowRight, ArrowLeft, Rocket, User, Briefcase, Target, CreditCard, Sparkles } from "lucide-react";

const steps = [
  { id: 1, name: "Personal Information", icon: User },
  { id: 2, name: "Startup Information", icon: Briefcase },
  { id: 3, name: "Goals & Plan", icon: Target },
  { id: 4, name: "Review & Payment", icon: CreditCard },
];

export default function StartupApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startupName: "",
    sector: "",
    stage: "ideation",
    description: "",
    goals: "",
    milestones: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    if (localStorage.getItem('startup_applied') === 'true') {
      setSuccess(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
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

    // Final Step: Payment Simulation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast({
        title: "Payment Successful",
        description: "Your application fee of ₦2,450 has been processed.",
      });
      
      // Save to DB via API
      fetch('/api/startups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('startup_applied', 'true');
      })
      .catch(err => console.error('Error saving startup:', err));
    }, 4000); // 3-5 seconds wait as requested
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
        
        {/* Stepper Header */}
        <div className="w-full max-w-4xl mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 position-relative">
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
                  <Rocket className="h-6 w-6 text-primary" />
                  Apply for Incubation
                </CardTitle>
                <CardDescription>
                  Step {currentStep} of {steps.length}: {steps[currentStep-1].name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 11) {
                              setFormData({ ...formData, phone: value });
                            }
                          }} 
                          required 
                          placeholder="08012345678" 
                          maxLength={11} 
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Startup Info */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="startupName">Startup Name</Label>
                        <Input id="startupName" value={formData.startupName} onChange={handleInputChange} required placeholder="Acme AgTech" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <select 
                          id="sector" 
                          value={formData.sector} 
                          onChange={handleInputChange} 
                          required
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a sector</option>
                          <option value="AgTech">AgTech (Software/Hardware)</option>
                          <option value="Processing">Value Addition & Processing</option>
                          <option value="Logistics">Supply Chain & Logistics</option>
                          <option value="Farming">Smart Farming</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stage">Current Stage</Label>
                        <select 
                          id="stage" 
                          value={formData.stage} 
                          onChange={handleInputChange} 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="ideation">Ideation / Concept</option>
                          <option value="mvp">Minimum Viable Product (MVP)</option>
                          <option value="scaling">Scaling / Revenue</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Elevator Pitch / Description</Label>
                        <textarea 
                          id="description" 
                          value={formData.description} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          rows={4}
                          placeholder="Describe your startup in 2-3 sentences..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Goals & Plan */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="goals">What are your goals for this cohort?</Label>
                        <textarea 
                          id="goals" 
                          value={formData.goals} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          rows={4}
                          placeholder="What do you hope to achieve?"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="milestones">Proposed Milestones for Disbursement</Label>
                        <textarea 
                          id="milestones" 
                          value={formData.milestones} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          rows={4}
                          placeholder="E.g., 30% upfront, 40% on MVP, 30% on launch..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Payment */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                        <p className="text-sm font-medium">Summary</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Founder:</span>
                          <span>{formData.fullName}</span>
                          <span className="text-muted-foreground">Startup:</span>
                          <span>{formData.startupName}</span>
                          <span className="text-muted-foreground">Sector:</span>
                          <span>{formData.sector}</span>
                          <span className="text-muted-foreground">Fee:</span>
                          <span className="font-bold text-primary">₦2,450</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <select 
                          id="paymentMethod" 
                          value={formData.paymentMethod} 
                          onChange={handleInputChange} 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="card">Debit/Credit Card</option>
                          <option value="transfer">Bank Transfer</option>
                          <option value="ussd">USSD Code</option>
                        </select>
                      </div>

                      {formData.paymentMethod === "card" && (
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep} disabled={loading}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                    )}
                    <Button type="submit" className={currentStep === 1 ? "w-full" : "ml-auto"} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing Payment...
                        </>
                      ) : currentStep === steps.length ? (
                        <>Pay ₦2,450 & Submit</>
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
            /* Success State (Confetti Simulation) */
            <CardContent className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Application Submitted!</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Your application has been received successfully. We will review it and get back to you within 5 working days.
              </p>
              <div className="bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-8 flex items-center gap-2">
                <Check className="h-4 w-4" /> Payment Confirmed (₦2,450)
              </div>
              <div className="flex gap-4">
                <Button onClick={() => navigate("/startup")}>
                  Go to Portal
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
    </div>
  );
}
