import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Stethoscope, 
  Syringe, 
  AlertTriangle, 
  FileText, 
  MapPin,
  Calendar,
  Bell,
  Pill,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    icon: FileText,
    title: "Digital Health Records",
    description: "Complete digital health history for every registered animal and herd."
  },
  {
    icon: Syringe,
    title: "Vaccination Scheduling",
    description: "Automated vaccination reminders and scheduling for disease prevention."
  },
  {
    icon: AlertTriangle,
    title: "Disease Outbreak Alerts",
    description: "Real-time notifications for disease outbreaks in your area."
  },
  {
    icon: Pill,
    title: "Drug Inventory",
    description: "Track veterinary drug usage and availability across the state."
  },
  {
    icon: MapPin,
    title: "GPS-Tagged Reports",
    description: "Location-based reporting for accurate disease surveillance."
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Schedule veterinary visits and consultations online."
  },
];

const recentAlerts = [
  {
    type: "warning",
    title: "PPR Vaccination Campaign",
    location: "Dutse LGA",
    date: "Dec 15-30, 2024"
  },
  {
    type: "info",
    title: "Routine Deworming",
    location: "All LGAs",
    date: "Ongoing"
  },
  {
    type: "alert",
    title: "Foot & Mouth Disease Alert",
    location: "Hadejia LGA",
    date: "Dec 18, 2024"
  },
];

export default function VeterinaryServices() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccessDashboard = () => {
    toast({
      title: "Officer Dashboard",
      description: "Please login with your veterinary officer credentials to access the dashboard.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-accent py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-foreground/10 text-accent-foreground text-sm font-medium mb-4">
                Module 2
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-accent-foreground mb-4">
                Veterinary Services
              </h1>
              <p className="text-xl text-accent-foreground/80">
                Digital livestock health management and disease surveillance system for Jigawa State.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Comprehensive Veterinary Management
              </h2>
              <p className="text-muted-foreground">
                From health records to disease alerts, manage all veterinary operations digitally.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-6">
                      {/* Left side - Text content */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <button className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 mt-2">
                          Learn more
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      
                      {/* Right side - Icon */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-105">
                          <service.icon className="w-12 h-12 text-primary" />
                        </div>
                        {/* Small accent circle */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/80 border-4 border-background" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alerts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Bell className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Recent Health Alerts</CardTitle>
                      <CardDescription>Stay informed about livestock health in your area</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.type === 'alert' 
                            ? 'bg-destructive/5 border-destructive' 
                            : alert.type === 'warning'
                            ? 'bg-yellow-500/5 border-yellow-500'
                            : 'bg-primary/5 border-primary'
                        }`}
                      >
                        <h4 className="font-medium text-foreground">{alert.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {alert.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>For Veterinary Officers</CardTitle>
                      <CardDescription>Access the field reporting dashboard</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Veterinary officers can access the mobile-friendly dashboard to:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Submit GPS-tagged field reports
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Update treatment histories
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Report disease outbreaks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Manage vaccination records
                    </li>
                  </ul>
                  <Button 
                    variant="governmentPrimary" 
                    className="w-full group mt-4"
                    onClick={handleAccessDashboard}
                  >
                    Access Officer Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
