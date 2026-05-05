import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lightbulb,
  Zap,
  Leaf,
  Sprout,
  MapPin,
  Calendar,
  Bell,
  Cpu,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const hubs = [
  {
    icon: Lightbulb,
    title: "Agribusiness Incubation",
    description: "Supporting agri-startups with tools, mentorship, and market linkages."
  },
  {
    icon: Sprout,
    title: "Seed Systems Strengthening",
    description: "Ensuring availability of high-quality, certified seeds for all farmers."
  },
  {
    icon: Leaf,
    title: "Soil Health Management",
    description: "Detailed soil mapping and fertility advice to optimize crop yields."
  },
  {
    icon: Cpu,
    title: "Digital Agriculture",
    description: "Smart farming solutions using IoT, drones, and data analytics."
  },
  {
    icon: Zap,
    title: "Solar Irrigation",
    description: "Promoting sustainable, solar-powered water systems for year-round farming."
  },
  {
    icon: TrendingUp,
    title: "Market Access",
    description: "Connecting smallholder farmers to regional and international markets."
  },
];

const recentUpdates = [
  {
    type: "info",
    title: "Rice Seed Distribution",
    location: "Hadejia Cluster",
    date: "Jan 10-25, 2025"
  },
  {
    type: "success",
    title: "New Hub Launch",
    location: "Dutse Central",
    date: "Feb 05, 2025"
  },
  {
    type: "warning",
    title: "Pest Control Notice",
    location: "Northern LGAs",
    date: "Ongoing"
  },
];

export default function InnovationHubs() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccessDashboard = () => {
    toast({
      title: "Extension Portal",
      description: "Please login with your J-ATA credentials to access the extension system.",
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
                Pillar 2
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-accent-foreground mb-4">
                Innovation & Agribusiness Hubs
              </h1>
              <p className="text-xl text-accent-foreground/80">
                The strategic nodes for technology transfer, training, and agribusiness incubation across Jigawa State.
              </p>
            </div>
          </div>
        </section>

        {/* Hubs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Driving Agricultural Innovation
              </h2>
              <p className="text-muted-foreground">
                Our hubs provide the infrastructure and knowledge needed to transform subsistence farming into profitable agribusiness.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {hubs.map((hub, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {hub.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {hub.description}
                        </p>
                        <button className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 mt-2">
                          Explore Programme
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      
                      <div className="flex-shrink-0 relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-105">
                          <hub.icon className="w-12 h-12 text-primary" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/80 border-4 border-background" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Updates Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Bell className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Recent Programme Updates</CardTitle>
                      <CardDescription>Stay informed about J-ATA initiatives in your area</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUpdates.map((update, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          update.type === 'alert' 
                            ? 'bg-destructive/5 border-destructive' 
                            : update.type === 'warning'
                            ? 'bg-yellow-500/5 border-yellow-500'
                            : update.type === 'success'
                            ? 'bg-green-500/5 border-green-500'
                            : 'bg-primary/5 border-primary'
                        }`}
                      >
                        <h4 className="font-medium text-foreground">{update.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {update.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {update.date}
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
                      <TrendingUp className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Extension Portal</CardTitle>
                      <CardDescription>Digital tools for J-ATA field officers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Extension agents can access the platform to:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Register smallholder farmers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Map farm clusters with GPS
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Provide advisory notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Track input subsidy vouchers
                    </li>
                  </ul>
                  <Button 
                    variant="governmentPrimary" 
                    className="w-full group mt-4"
                    onClick={handleAccessDashboard}
                  >
                    Access Extension System
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
