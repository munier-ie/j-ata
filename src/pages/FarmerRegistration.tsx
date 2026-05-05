import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { StepNinVerification } from "@/components/registration/StepNinVerification";
import { StepPersonalLevel } from "@/components/registration/StepPersonalLevel";
import { StepLivestockDetails } from "@/components/registration/StepLivestockDetails";
import { StepConfirmation } from "@/components/registration/StepConfirmation";
import { StepSuccess } from "@/components/registration/StepSuccess";
import { StepIndicator } from "@/components/registration/StepIndicator";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

const steps = [
  { number: 1, title: "NIN Verification" },
  { number: 2, title: "Personal Information" },
  { number: 3, title: "Farm Assets" },
  { number: 4, title: "Review & Confirm" },
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
  const [successData, setSuccessData] = useState<any>(null);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate Farmer ID
    const farmerId = `JGW-F-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const finalData = {
        farmerId,
        ...formData.personal,
        ...formData.livestock,
        nin: formData.nin
    };

    setSuccessData(finalData);
    setIsSubmitting(false);
    setCurrentStep(5); // Move to Success Step
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <HeroCarousel 
          title="Farmer Registration"
          subtitle="Register as a farmer and receive your unique digital J-ATA ID."
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
                       Step {currentStep > 4 ? 4 : currentStep} of 4
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
                      <StepConfirmation 
                        data={formData} 
                        onBack={handleBack} 
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                      />
                    )}
                    {currentStep === 5 && (
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
