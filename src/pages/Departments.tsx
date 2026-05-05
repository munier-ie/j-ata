import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { OrgChart } from "@/components/sections/OrgChart";

const Departments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <HeroCarousel 
          title="Our Departments"
          subtitle="Four strategic directorates working together to drive agricultural transformation in Jigawa State."
        />

        {/* Leadership Org Chart */}
        <OrgChart />
      </main>
      <Footer />
    </div>
  );
};

export default Departments;