import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Landmark, 
  Building2, 
  Stethoscope, 
  Shield, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  PieChart // Added mock import if needed, or just keep existing list
} from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

const budgetBreakdown = [
  {
    category: "Farm Estate Development",
    amount: 8500000000,
    percentage: 49,
    icon: Building2,
    description: "Establishment of mechanized farm estates with irrigation, power, and agribusiness facilities"
  },
  {
    category: "Innovation Hub Network",
    amount: 4200000000,
    percentage: 24,
    icon: Landmark,
    description: "Development of agribusiness incubation hubs for technology transfer and startup support"
  },
  {
    category: "Smart Extension Support",
    amount: 2800000000,
    percentage: 16,
    icon: TrendingUp,
    description: "Digital tools for 1,435 extension agents, field data collection, and farmer advisory"
  },
  {
    category: "Data Hub & Soil Mapping",
    amount: 1900000000,
    percentage: 11,
    icon: Shield,
    description: "Centralized intelligence system for soil mapping, weather forecasting, and yield predictions"
  }
];

const keyInitiatives = [
  {
    title: "Mechanized Farm Estates",
    description: "Building modern agricultural clusters with complete infrastructure including irrigation, storage, and processing facilities.",
    targets: [
      "10 model estates across all zones",
      "50,000+ hectares of managed farmland",
      "Support for 200,000+ smallholder farmers"
    ],
    status: "In Progress",
    progress: 55
  },
  {
    title: "Agribusiness Innovation Hubs",
    description: "Establishing technology transfer centers to bridge the gap between research and commercial farming.",
    targets: [
      "27 LGA-level training hubs",
      "7 zonal innovation centers",
      "1 central JATA Digital Ops Center"
    ],
    status: "In Progress",
    progress: 68
  },
  {
    title: "Digital Extension Service",
    description: "Equipping all 1,435 extension agents with smart tools for real-time field intelligence and farmer support.",
    targets: [
      "100% agent connectivity",
      "Real-time pest & disease reporting",
      "Multilingual SMS/USSD advisory reach"
    ],
    status: "Active",
    progress: 85
  },
  {
    title: "Soil Mapping Initiative",
    description: "Comprehensive statewide soil analysis to provide data-driven fertilizer and crop recommendations.",
    targets: [
      "High-resolution mapping for 27 LGAs",
      "Automated NPK recommendation engine",
      "Soil health tracking for farm estates"
    ],
    status: "Active",
    progress: 42
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Programs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <HeroCarousel 
          title="Programs & Investments"
          subtitle="Historic ₦17.4 billion investment in agricultural transformation, farm estates, and digital extension infrastructure."
        >
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit bg-white/20 text-white border-0">
              2026 Fiscal Year
            </Badge>
            
            {/* Budget Highlight */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-3xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                  <Landmark className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Budget Allocation</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">₦17.4 Billion</p>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                This represents the largest investment in agricultural development in Jigawa State's history, 
                demonstrating the government's commitment to transforming the sector.
              </p>
            </div>
          </div>
        </HeroCarousel>

        {/* Budget Breakdown */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Budget Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {budgetBreakdown.map((item, index) => (
              <Card 
                key={item.category} 
                className="border-border/50 hover:shadow-md transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{item.category}</CardTitle>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(item.amount)}</p>
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/50">{item.percentage}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <Progress value={item.percentage} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Initiatives */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Key Initiatives</h2>
            <div className="grid gap-6">
              {keyInitiatives.map((initiative, index) => (
                <Card 
                  key={initiative.title} 
                  className="border-border/50 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {initiative.title}
                          </h3>
                          <Badge variant={initiative.status === "In Progress" ? "default" : "secondary"}>
                            {initiative.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{initiative.description}</p>
                        <ul className="space-y-2">
                          {initiative.targets.map((target, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{target}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-center mb-3">
                          <span className="text-4xl font-bold text-primary">{initiative.progress}%</span>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <Progress value={initiative.progress} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-hero-gradient text-primary-foreground border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Track Our Progress
              </h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
                Visit our Transparency Portal to see real-time updates on project implementation, 
                budget utilization, and infrastructure development across Jigawa State.
              </p>
              <Link to="/transparency">
                <Button size="lg" variant="secondary" className="gap-2">
                  View Transparency Portal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;