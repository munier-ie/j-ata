import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Store, Users } from "lucide-react";

const agencies = [
  {
    icon: Building2,
    name: "Department of Extension Services",
    acronym: "DES",
    mandate: "Digitally empowering extension agents and providing real-time field support to farmers.",
    functions: [
      "Mobile app deployment for agents",
      "Field data collection & reporting",
      "Farmer advisory notifications",
      "Pest & disease outbreak monitoring",
      "Extension staff performance tracking"
    ],
    contact: {
      address: "JATA HQ, Dutse",
      phone: "+234 800 JATA 001"
    }
  },
  {
    icon: Shield,
    name: "Command & Control Center",
    acronym: "CCC",
    mandate: "High-level monitoring and coordination of all agricultural programs in real time.",
    functions: [
      "Farmer database management",
      "GIS farm mapping & GIS audits",
      "Input subsidy tracking (Vouchers)",
      "Irrigation cluster monitoring",
      "Program performance analytics"
    ],
    contact: {
      address: "JATA Digital Ops Center, Dutse",
      phone: "+234 800 JATA 002"
    }
  },
  {
    icon: Store,
    name: "Agricultural Data Hub",
    acronym: "ADH",
    mandate: "The intelligence core for soil mapping, weather forecasting, and yield predictions.",
    functions: [
      "Statewide soil mapping initiative",
      "Weather sensor network management",
      "Yield forecasting & AI modeling",
      "Open data APIs for partners",
      "Fertilizer recommendation engine"
    ],
    contact: {
      address: "The Brain Center, Dutse",
      phone: "+234 800 JATA 003"
    }
  },
  {
    icon: Users,
    name: "Investment & PPP Department",
    acronym: "IPD",
    mandate: "Promoting agricultural investment and managing mechanized farm estates.",
    functions: [
      "Investor deal room management",
      "Farm estate allocation & tracking",
      "PPP project coordination",
      "Agribusiness investment promotion",
      "Site selection & concierge services"
    ],
    contact: {
      address: "Investment Portal Office, Dutse",
      phone: "+234 800 JATA 004"
    }
  }
];

const Agencies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-up">
              Departments & Pillars
            </h1>
            <p className="text-xl opacity-90 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Specialized departments driving the digital transformation of Jigawa's agricultural sector.
            </p>
          </div>
        </section>

        {/* Agencies Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {agencies.map((agency, index) => (
              <Card 
                key={agency.name} 
                className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="bg-secondary/50">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <agency.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {agency.acronym}
                      </span>
                      <CardTitle className="font-display text-lg">{agency.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {agency.mandate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground mb-3 text-sm">Core Functions:</h4>
                  <ul className="space-y-2 mb-6">
                    {agency.functions.map((func, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {func}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Contact:</span> {agency.contact.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Agencies;