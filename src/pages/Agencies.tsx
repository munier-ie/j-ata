import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Store, Users } from "lucide-react";

const agencies = [
  {
    icon: Building2,
    name: "Jigawa State Livestock Development Agency",
    acronym: "JSLDA",
    mandate: "Coordinating and implementing livestock development programs across the state to enhance productivity and farmer livelihoods.",
    functions: [
      "Implementation of livestock development policies",
      "Coordination of ranch establishment projects",
      "Farmer training and capacity building",
      "Livestock census and registration",
      "Extension services delivery"
    ],
    contact: {
      address: "Ministry Complex, Dutse",
      phone: "+234 800 000 0001"
    }
  },
  {
    icon: Shield,
    name: "State Veterinary Services Authority",
    acronym: "SVSA",
    mandate: "Regulating and delivering quality veterinary services to protect animal and public health.",
    functions: [
      "Veterinary clinic supervision and standards",
      "Disease surveillance and control",
      "Veterinary personnel licensing",
      "Drug quality control",
      "Meat inspection and food safety"
    ],
    contact: {
      address: "Veterinary House, Dutse",
      phone: "+234 800 000 0002"
    }
  },
  {
    icon: Store,
    name: "Livestock Market Management Board",
    acronym: "LMMB",
    mandate: "Managing and developing livestock markets to facilitate efficient trade and fair pricing.",
    functions: [
      "Market infrastructure development",
      "Trade regulation and dispute resolution",
      "Price monitoring and market intelligence",
      "Revenue collection and management",
      "Market sanitation and animal welfare"
    ],
    contact: {
      address: "Market Complex, Hadejia Road",
      phone: "+234 800 000 0003"
    }
  },
  {
    icon: Users,
    name: "Pastoral Affairs Coordination Office",
    acronym: "PACO",
    mandate: "Promoting peaceful coexistence between pastoral and farming communities while supporting pastoral welfare.",
    functions: [
      "Herder-farmer conflict mediation",
      "Grazing route management",
      "Pastoral community engagement",
      "Emergency response coordination",
      "Cross-border pastoral coordination"
    ],
    contact: {
      address: "Peace Building Center, Dutse",
      phone: "+234 800 000 0004"
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
              Our Agencies
            </h1>
            <p className="text-xl opacity-90 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Specialized agencies delivering focused services for livestock development across Jigawa State.
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