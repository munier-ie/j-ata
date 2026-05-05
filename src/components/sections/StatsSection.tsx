import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Shield, BarChart3, Clock, Zap } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "25%",
    label: "Yield Increase",
    description: "Projected crop yield growth through extension support"
  },
  {
    icon: Users,
    value: "1,435",
    label: "Agents Deployed",
    description: "Extension agents already trained and on the field"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Traceability",
    description: "Full tracking of input subsidies and vouchers"
  },
  {
    icon: BarChart3,
    value: "Real-time",
    label: "Agro-Intelligence",
    description: "Live dashboards for data-driven policy decisions"
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Real-time Intelligence",
    description: "Monitor crop health, weather patterns, and market prices instantly."
  },
  {
    icon: Zap,
    title: "Faster Field Response",
    description: "Empower extension agents to report and resolve farm issues immediately."
  },
  {
    icon: TrendingUp,
    title: "Scale Agribusiness",
    description: "Connect smallholders to high-value markets and processing zones."
  },
  {
    icon: Shield,
    title: "Improve Accountability",
    description: "Full audit trails for input distribution and farmer support programs."
  }
];

export function StatsSection() {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl bg-background/5 border border-background/10 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="font-semibold text-background mb-1">{stat.label}</p>
              <p className="text-sm text-background/60">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Strategic Value for{" "}
              <span className="text-primary">Jigawa State</span>
            </h2>
            <p className="text-background/70 text-lg">
              This platform positions Jigawa as a national leader in agricultural digital transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-background mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-background/60 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
