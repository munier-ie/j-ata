import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { StepNinVerification } from "@/components/registration/StepNinVerification";
import { StepPersonalLevel } from "@/components/registration/StepPersonalLevel";
import { StepLivestockDetails } from "@/components/registration/StepLivestockDetails";
import { StepConfirmation } from "@/components/registration/StepConfirmation";
import { StepPayment } from "@/components/registration/StepPayment";
import { Button } from "@/components/ui/button";
import { StepSuccess } from "@/components/registration/StepSuccess";
import { StepIndicator } from "@/components/registration/StepIndicator";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { farmersApi, Farmer } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { number: 1, title: "NIN Verification" },
  { number: 2, title: "Personal Information" },
  { number: 3, title: "Farm Assets" },
  { number: 4, title: "Payment" },
  { number: 5, title: "Review & Confirm" },
];

interface RegistrationData {
  nin: string;
  personal: {
    firstName: string;
    lastName: string;
    phone: string;
    altPhone?: string;
    lga: string;
    ward: string;
    community: string;
    passportUrl?: string;
  };
  livestock: {
    types: string[];
    counts: Record<string, number>;
  };
}

const initialData: RegistrationData = {
  nin: "",
  personal: {
    firstName: "",
    lastName: "",
    phone: "",
    altPhone: "",
    lga: "",
    ward: "",
    community: "",
    passportUrl: "",
  },
  livestock: {
    types: [],
    counts: {},
  },
};

export default function FarmerRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<Farmer | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('farmer_registered') === 'true') {
      setAlreadyRegistered(true);
    }
  }, []);

  if (alreadyRegistered) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Already Registered</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            You have already registered as a farmer.
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleNext = (data: Partial<RegistrationData>) => {
    // If completing Step 1 (NIN), pre-fill personal data from verification
    if (currentStep === 1 && 'nin' in data && data.nin) {
        setFormData((prev) => ({
            ...prev,
            ...data,
            personal: {
                ...prev.personal,
                firstName: "Musa",
                lastName: "Ibrahim",
                phone: "08012345678",
                // We keep location empty for user to fill as it might differ from NIN origin
            }
        }));
    } else {
        setFormData((prev) => ({ ...prev, ...data }));
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate standard JATA Farmer ID
      const farmerId = `JGW-F-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Calculate farm size in Hectares by summing crop values
      const farmSize = formData.livestock.types
        .filter(type => ["rice", "wheat", "maize", "sesame", "tomato"].includes(type))
        .reduce((sum, type) => sum + (formData.livestock.counts[type] || 0), 0);

      // Map selected assets (crops & livestock) to human-readable strings with quantities
      const cropTypes = formData.livestock.types.map(type => {
        const count = formData.livestock.counts[type] || 0;
        const label = type.charAt(0).toUpperCase() + type.slice(1);
        if (["rice", "wheat", "maize", "sesame", "tomato"].includes(type)) {
          return `${label} (${count} Ha)`;
        }
        return `${label} (${count})`;
      });

      // Call database API to create the farmer profile
      const dbFarmer = await farmersApi.create({
        farmerId,
        firstName: formData.personal.firstName,
        lastName: formData.personal.lastName,
        phone: formData.personal.phone,
        nin: formData.nin || null,
        lga: formData.personal.lga,
        ward: formData.personal.ward,
        community: formData.personal.community,
        farmSize,
        cropTypes,
        passportUrl: formData.personal.passportUrl || null,
        status: "pending",
      });

      setSuccessData(dbFarmer);
      localStorage.setItem('farmer_registered', 'true');
      setCurrentStep(6); // Move to Success Step
    } catch (error) {
      console.error("Failed to register farmer:", error);
      toast({
        title: "Registration Error",
        description: "Failed to register farmer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <HeroCarousel 
          title="Farmer Registration"
          subtitle="Register as a farmer and receive your unique digital JATA ID."
        >
             <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10 text-sm font-medium mb-4">
                Module 1
            </span>
        </HeroCarousel>

        {/* Registration Stepper */}
        <section className="py-12 bg-muted/30 flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Sidebar Steps */}
              <div className="lg:col-span-4 lg:block">
                <Card className="sticky top-24 border-none shadow-lg bg-background/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Registration Status</CardTitle>
                    <CardDescription>
                       Step {currentStep > 5 ? 5 : currentStep} of 5
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StepIndicator steps={steps} currentStep={currentStep} />
                  </CardContent>
                </Card>
              </div>

              {/* Main Form Content */}
              <div className="lg:col-span-8">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    {currentStep === 1 && (
                      <StepNinVerification 
                        onNext={(data) => handleNext({ nin: data.nin })} 
                        initialData={formData.nin} 
                      />
                    )}
                    {currentStep === 2 && (
                      <StepPersonalLevel 
                        onNext={(data) => handleNext({ personal: data })} 
                        onBack={handleBack}
                        initialData={formData.personal}
                        disableInputs={!!formData.nin}
                      />
                    )}
                    {currentStep === 3 && (
                      <StepLivestockDetails 
                        onNext={(data) => handleNext({ livestock: data })} 
                        onBack={handleBack}
                        initialData={formData.livestock}
                      />
                    )}
                    {currentStep === 4 && (
                      <StepPayment 
                        onNext={() => handleNext({})}
                        onBack={handleBack}
                        feeAmount={1550}
                      />
                    )}
                    {currentStep === 5 && (
                      <StepConfirmation 
                        data={formData} 
                        onBack={handleBack} 
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                      />
                    )}
                    {currentStep === 6 && (
                      <StepSuccess data={successData} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
