import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sprout, Briefcase, CloudSun, CreditCard, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: Sprout,
    title: "Production & Productivity",
    description:
      "Mechanized agricultural zones, seed systems, and input subsidy distribution.",
    responsibilities: [
      "Agricultural zone management",
      "Soil health mapping",
      "Yield forecasting",
    ],
  },
  {
    icon: Briefcase,
    title: "Agribusiness & Markets",
    description: "Market linkage, investment promotion, and value chain development.",
    responsibilities: [
      "Innovation hub operations",
      "PPP & deal room",
      "Export traceability",
    ],
  },
  {
    icon: CloudSun,
    title: "Climate Smart Agriculture",
    description: "Resilience infrastructure and climate-adaptive farming.",
    responsibilities: [
      "Solar irrigation clusters",
      "Water management",
      "Climate training",
    ],
  },
  {
    icon: CreditCard,
    title: "Digital & Rural Finance",
    description: "Digital payments, vouchers, and farmer financial identity.",
    responsibilities: [
      "Smart voucher systems",
      "Credit linkage",
      "Rural financial literacy",
    ],
  },
  {
    icon: BarChart3,
    title: "Strategy, Data & Analytics",
    description: "Command center, GIS, and impact monitoring.",
    responsibilities: [
      "Command & control",
      "Data hub APIs",
      "M&E reporting",
    ],
  },
];

export function DepartmentsPreview() {
  return (
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Directorates
          </span>
          <h2 className="font-civic text-2xl sm:text-3xl font-bold text-foreground mt-2">
            Strategic operational pillars
          </h2>
        </div>

        {/* Desktop: bordered column cards */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="landing-card border border-border border-l-4 border-l-primary bg-card p-5 flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 flex-1">
                {pillar.description}
              </p>
              <ul className="mt-4 space-y-1.5 pt-4 border-t border-border">
                {pillar.responsibilities.map((r) => (
                  <li key={r} className="text-xs text-muted-foreground">
                    · {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tablet: horizontal scroll */}
        <div className="hidden md:flex lg:hidden gap-4 overflow-x-auto pb-2 snap-x">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="landing-card snap-start shrink-0 w-64 border border-border border-l-4 border-l-primary bg-card p-5"
            >
              <pillar.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-sm">{pillar.title}</h3>
              <p className="text-xs text-muted-foreground mt-2">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <Accordion type="single" collapsible className="md:hidden w-full">
          {pillars.map((pillar, i) => (
            <AccordionItem key={pillar.title} value={`pillar-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                <span className="flex items-center gap-3">
                  <pillar.icon className="w-5 h-5 text-primary shrink-0" />
                  {pillar.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {pillar.description}
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {pillar.responsibilities.map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
