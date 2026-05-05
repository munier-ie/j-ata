import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { CommissionerSection } from "@/components/sections/CommissionerSection";
import { DepartmentsPreview } from "@/components/sections/DepartmentsPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CommissionerSection />
        <ModulesSection />
        <DepartmentsPreview />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
