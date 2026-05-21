import { Button } from "@/components/ui/button";
import {
  Smartphone,
  LayoutDashboard,
  Database,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "extension",
    icon: Smartphone,
    title: "Smart Extension",
    shortTitle: "Extension & Farmer Support",
    description:
      "Digitally empower 1,435 extension agents with mobile reporting and farmer advisories.",
    bullets: ["Agent mobile app", "Pest & disease reporting"],
    href: "/extension",
    featured: true,
  },
  {
    id: "command",
    icon: LayoutDashboard,
    title: "Command & Control",
    shortTitle: "Leadership dashboard",
    description: "Real-time monitoring of programmes, subsidies, and field operations.",
    bullets: ["Farmer database", "GIS farm mapping"],
    href: "/command-center",
    featured: false,
  },
  {
    id: "data",
    icon: Database,
    title: "Data Hub",
    shortTitle: "Agricultural intelligence",
    description: "Soil, weather, and crop data APIs for partners and policy teams.",
    bullets: ["Soil intelligence", "Partner APIs"],
    href: "/data-hub",
    featured: false,
  },
  {
    id: "invest",
    icon: Briefcase,
    title: "Investment Portal",
    shortTitle: "Invest in Jigawa agriculture",
    description: "Opportunity listings, deal room, and PPP project tracking.",
    bullets: ["Deal room", "PPP workflow"],
    href: "/investors",
    featured: false,
  },
  {
    id: "export",
    icon: ShieldCheck,
    title: "Export License",
    shortTitle: "Yield Certification & Trade",
    description: "Official state export licensing, CAC validation, and secure certificate registry.",
    bullets: ["TSA Administrative Levy", "QR-enabled Certificates"],
    href: "/export",
    featured: false,
  },
];

function MockDashboardStrip({ variant }: { variant: "extension" | "default" }) {
  return (
    <div
      className={cn(
        "mt-4 h-16 rounded-sm border border-border/80 overflow-hidden flex gap-1 p-1.5",
        variant === "extension" ? "bg-primary/5" : "bg-muted/80"
      )}
      aria-hidden
    >
      <div className="flex-1 rounded-sm bg-primary/15" />
      <div className="w-1/3 rounded-sm bg-background border border-border/60 flex flex-col gap-1 p-1">
        <div className="h-1.5 w-full bg-primary/30 rounded-sm" />
        <div className="h-1.5 w-2/3 bg-muted-foreground/20 rounded-sm" />
        <div className="h-1.5 w-1/2 bg-muted-foreground/20 rounded-sm" />
      </div>
    </div>
  );
}

export function ModulesSection() {
  const navigate = useNavigate();
  const featured = modules.find((m) => m.featured)!;
  const others = modules.filter((m) => !m.featured);

  return (
    <section id="modules" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Digital platform
          </span>
          <h2 className="font-civic text-2xl sm:text-4xl font-bold text-foreground mt-2 mb-3">
            Five modules, one operating system
          </h2>
          <p className="text-muted-foreground">
            Integrated tools for field teams, leadership, data partners, and investors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => navigate(featured.href)}
            className="landing-card text-left p-6 lg:p-8 border border-border bg-card hover:border-primary/40 transition-colors group lg:row-span-2"
          >
            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
              <featured.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-civic text-xl lg:text-2xl font-bold text-foreground">
              {featured.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              {featured.description}
            </p>
            <ul className="mt-4 space-y-2">
              {featured.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <MockDashboardStrip variant="extension" />
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all">
              Open module
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((module) => (
              <button
                key={module.id}
                type="button"
                onClick={() => navigate(module.href)}
                className="landing-card text-left p-5 border border-border bg-card hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <module.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{module.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {module.shortTitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {module.description}
                    </p>
                    <MockDashboardStrip variant="default" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center lg:text-left">
          <Button
            variant="outline"
            className="rounded-sm"
            onClick={() => navigate("/command-center")}
          >
            View Command Center overview
          </Button>
        </div>
      </div>
    </section>
  );
}
