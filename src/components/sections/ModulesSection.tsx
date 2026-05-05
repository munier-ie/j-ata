import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Stethoscope, Wallet, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: 1,
    icon: Users,
    title: "Farmer Registration & Digital Identity",
    description: "Centralized digital registry of all livestock farmers and pastoralists across Jigawa State with unique IDs and QR codes.",
    features: [
      "Online & mobile registration",
      "Unique Farmer ID generation",
      "QR Code verification",
      "Farmer profile dashboard"
    ],
    color: "border-l-primary",
    href: "/farmer-registration"
  },
  {
    id: 2,
    icon: Stethoscope,
    title: "Livestock Health & Veterinary Management",
    description: "Digitize veterinary operations and improve livestock disease surveillance and control across the state.",
    features: [
      "Digital health records",
      "Vaccination scheduling",
      "Disease outbreak alerts",
      "Mobile field reporting"
    ],
    color: "border-l-accent",
    href: "/veterinary"
  },
  {
    id: 3,
    icon: Wallet,
    title: "Market & Revenue Automation",
    description: "Fully automated revenue collection system for livestock markets, slaughterhouses, and permits.",
    features: [
      "Digital permit issuance",
      "Cashless payments",
      "Instant e-receipts",
      "Revenue analytics"
    ],
    color: "border-l-primary-light",
    href: "/revenue"
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
            Three Integrated Modules,{" "}
            <span className="text-primary">One Unified Platform</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive digital infrastructure designed to modernize every aspect of 
            livestock governance in Jigawa State.
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
