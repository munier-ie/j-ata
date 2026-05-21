import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CivicHeroSection } from "@/components/landing/CivicHeroSection";
import { QuickAccessSection } from "@/components/landing/QuickAccessSection";
import { ImpactMapSection } from "@/components/landing/ImpactMapSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { LeadershipSection } from "@/components/landing/LeadershipSection";
import { DepartmentsPreview } from "@/components/sections/DepartmentsPreview";
import { StatsSection } from "@/components/sections/StatsSection";
import { HomeNewsSection } from "@/components/landing/HomeNewsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CivicHeroSection />
        <QuickAccessSection />
        <ImpactMapSection />
        <ModulesSection />
        <LeadershipSection />
        <DepartmentsPreview />
        <StatsSection />
        <HomeNewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
