import { 
  QrCode, 
  Smartphone, 
  Shield, 
  Cloud, 
  BarChart3, 
  Bell,
  MapPin,
  CreditCard
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Verification",
    description: "Every farmer and permit gets a unique QR code for instant verification in the field."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Access the platform from any device. Field officers can work offline and sync later."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Role-based access control, encrypted data, and full compliance with Nigerian data laws."
  },
  {
    icon: Cloud,
    title: "Cloud-Ready Infrastructure",
    description: "Scalable architecture ready for government data center or cloud deployment."
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description: "Live analytics for ministry leadership to make data-driven policy decisions."
  },
  {
    icon: Bell,
    title: "Alert System",
    description: "Instant notifications for disease outbreaks, vaccination schedules, and permit expiries."
  },
  {
    icon: MapPin,
    title: "GPS Integration",
    description: "Location tracking for field reports, market locations, and grazing routes."
  },
  {
    icon: CreditCard,
    title: "Cashless Payments",
    description: "POS, bank transfer, and USSD payment options with instant e-receipts."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Enterprise-Grade Technology for{" "}
            <span className="text-primary">Government Use</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built with security, scalability, and accessibility in mind. Ready for statewide deployment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/20 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
