import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, LayoutDashboard, Database, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: 1,
    icon: Smartphone,
    title: "SMART EXTENSION & FARMER SUPPORT SYSTEM",
    description: "Digitally empower the 1,435 extension agents already deployed to provide faster response to farm issues and real-time field intelligence.",
    features: [
      "Extension Agent Mobile App",
      "Field data reporting system",
      "Pest & disease reporting tool",
      "Farmer advisory notifications (SMS/USSD)"
    ],
    color: "border-l-primary",
    href: "/extension"
  },
  {
    id: 2,
    icon: LayoutDashboard,
    title: "INTEGRATED AGRICULTURAL COMMAND & CONTROL PLATFORM",
    description: "A high-level dashboard for J-ATA leadership to monitor all programs in real time, transforming J-ATA into a digital command center.",
    features: [
      "Farmer database management",
      "GIS farm mapping & Input subsidy tracking",
      "Crop monitoring & yield forecasting",
      "Irrigation tracking (including solar systems)"
    ],
    color: "border-l-accent",
    href: "/command-center"
  },
  {
    id: 3,
    icon: Database,
    title: "AGRICULTURAL DATA HUB (The Brain)",
    description: "A centralized intelligence system supporting J-ATA's soil mapping initiative, aggregating soil, weather, and farm data.",
    features: [
      "Real-time soil intelligence",
      "Weather forecasting integration",
      "Fertilizer & crop recommendation engine",
      "Data APIs for partners and startups"
    ],
    color: "border-l-primary-light",
    href: "/data-hub"
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Agricultural Investment Promotion Portal",
    description: "Support private investors with an 'InvestJigawa for Agriculture' opportunity portal and deal room.",
    features: [
      "Invest-in-Jigawa opportunity portal",
      "Farm estate availability map",
      "Deal room / investor data room",
      "PPP project tracking & approvals workflow"
    ],
    color: "border-l-primary",
    href: "/investors"
  }
];

export function ModulesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Modules
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Four Integrated Modules,{" "}
            <span className="text-primary">One Unified Platform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive digital infrastructure designed to modernize every aspect of 
            agricultural governance and transformation in Jigawa State.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card 
              key={module.id} 
              variant="module"
              className={`${module.color} animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <module.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription className="text-base">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => navigate(module.href)}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
