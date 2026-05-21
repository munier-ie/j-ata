import { TrendingUp, Users, Shield, BarChart3, QrCode, Smartphone, Cloud } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "25%",
    label: "Yield increase",
    description: "Projected growth through extension support",
  },
  {
    icon: Users,
    value: "1,435",
    label: "Agents deployed",
    description: "Extension agents trained and in the field",
  },
  {
    icon: Shield,
    value: "100%",
    label: "Traceability",
    description: "Input subsidies and voucher tracking",
  },
  {
    icon: BarChart3,
    value: "Real-time",
    label: "Agro-intelligence",
    description: "Live dashboards for policy decisions",
  },
];

const capabilities = [
  {
    icon: QrCode,
    title: "Farmer ID verification",
    description: "Unique digital ID for every registered farmer in the field.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first operations",
    description: "Extension agents report offline and sync when connected.",
  },
  {
    icon: Cloud,
    title: "Cloud-ready infrastructure",
    description: "Scalable for government data centre or secure cloud deployment.",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Impact proof
          </span>
          <h2 className="font-civic text-2xl sm:text-3xl font-bold mt-2">
            Measurable transformation outcomes
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((stat) => (
            <div
              key={stat.label}
              className="landing-card text-center p-5 bg-background/5 border border-background/15"
            >
              <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-primary">
                {stat.value}
              </p>
              <p className="text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-xs text-background/55 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="landing-card flex gap-4 p-5 bg-background/5 border border-background/15"
            >
              <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center shrink-0">
                <cap.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{cap.title}</h3>
                <p className="text-xs text-background/60 mt-1">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-background/45 mt-10">
          Source: JATA Command Center, 2026. Figures updated as field data is verified.
        </p>
      </div>
    </section>
  );
}
