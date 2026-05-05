import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Briefcase, CloudSun, CreditCard, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: Sprout,
    title: "Production & Productivity",
    description: "Driving large-scale agricultural output through mechanized farm estates and improved seed systems.",
    responsibilities: [
      "Mechanized Farm Estate management",
      "Seed system strengthening programs",
      "Soil health mapping & management",
      "Input subsidy distribution systems",
      "Yield forecasting and crop monitoring"
    ]
  },
  {
    icon: Briefcase,
    title: "Agribusiness & Markets",
    description: "Connecting smallholder farmers to high-value markets and fostering private sector investment.",
    responsibilities: [
      "Agribusiness innovation hub operations",
      "Investment promotion and PPP projects",
      "Market linkage and deal room management",
      "Value chain development & processing",
      "Agricultural investment promotion portal"
    ]
  },
  {
    icon: CloudSun,
    title: "Climate Smart Agriculture",
    description: "Building resilience through sustainable farming practices and climate-adaptive infrastructure.",
    responsibilities: [
      "Solar-powered irrigation clusters",
      "Climate resilience training for farmers",
      "Sustainable water management systems",
      "Weather-indexed insurance systems",
      "Climate-adaptive crop varieties promotion"
    ]
  },
  {
    icon: CreditCard,
    title: "Digital & Rural Finance",
    description: "Leveraging digital technology to provide financial services to rural agricultural communities.",
    responsibilities: [
      "Digital payment systems for farmers",
      "Credit linkage and risk management",
      "Farmer registration & financial identity",
      "Smart voucher and wallet systems",
      "Rural financial literacy programs"
    ]
  },
  {
    icon: BarChart3,
    title: "Strategy, Data & Analytics",
    description: "The 'Brain' of J-ATA, driving data-backed decisions through the Command & Control platform.",
    responsibilities: [
      "Integrated Command & Control center",
      "GIS mapping and remote sensing",
      "Data hub & partner API management",
      "Strategic planning and policy research",
      "Impact monitoring & evaluation"
    ]
  }
];

export function DepartmentsPreview() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center animate-fade-up">
        Our Operational Pillars
      </h2>
      <div className="grid gap-8">
        {pillars.map((pillar, index) => (
          <Card 
            key={pillar.title} 
            className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              <CardHeader className="bg-secondary/50 md:col-span-1">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-display text-xl">{pillar.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="md:col-span-2 pt-6">
                <h4 className="font-semibold text-foreground mb-4">Core Focus Areas:</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {pillar.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
