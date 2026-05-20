import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, MapPin, PieChart, FileText, Globe, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const InvestmentPortal = () => {
  const navigate = useNavigate();
  const [appliedProjects, setAppliedProjects] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    amount: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleApply = (id: number) => {
    setSelectedProjectId(id);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('investor_applications') || '[]');
    existing.push({ ...formState, id: Date.now(), projectId: selectedProjectId, status: 'Pending', feePaid: true });
    localStorage.setItem('investor_applications', JSON.stringify(existing));
    
    setAppliedProjects([...appliedProjects, selectedProjectId!]);
    setIsDialogOpen(false);
    toast({
      title: "Application Submitted",
      description: "Your investment application has been received. Fee of $100 charged.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <div className="flex items-center gap-3 text-white/80 font-medium">
                  <Globe className="w-6 h-6" />
                  <span>Invest-in-Jigawa Portal</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  Premium <span className="text-white">Agricultural Investment</span> Opportunities
                </h1>
                <p className="text-xl opacity-90 max-w-xl">
                  Unlock access to mechanized Farm Estates, PPP projects, and processing clusters. 
                  A dedicated deal room for domestic and international investors.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Enter Deal Room
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 text-white gap-2" onClick={() => navigate('/map')}>
                    <MapPin className="w-5 h-5" />
                    View Available Land
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 space-y-2">
                  <p className="text-3xl font-bold">50,000+</p>
                  <p className="text-sm opacity-80">Hectares Available</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mt-8 space-y-2">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-80">PPP Projects</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 space-y-2">
                  <p className="text-3xl font-bold">27</p>
                  <p className="text-sm opacity-80">LGAs Covered</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mt-8 space-y-2">
                  <p className="text-3xl font-bold">$250M</p>
                  <p className="text-sm opacity-80">Investment Target</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Categories */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Investment Pathways</h2>
            <p className="text-muted-foreground text-lg">
              Explore diverse opportunities tailored for commercial farmers, processors, 
              and technology providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Mechanized Farm Estates",
                desc: "Secure long-term leases on pre-mapped land with core infrastructure including power and roads."
              },
              {
                icon: PieChart,
                title: "PPP Projects",
                desc: "Joint venture opportunities in irrigation clusters, storage facilities, and processing hubs."
              },
              {
                icon: Briefcase,
                title: "Processing Clusters",
                desc: "Industrial-scale processing for rice, tomato, wheat, and sesame for export and domestic markets."
              }
            ].map((item, i) => (
              <Card key={i} className="border-border/50 hover:shadow-xl transition-all group overflow-hidden">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{item.desc}</p>
                  <Button variant="ghost" className="p-0 group-hover:text-primary gap-2">
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Opportunities Marketplace */}
        <section className="container mx-auto px-4 py-24 border-t border-border/50">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Active Opportunities</h2>
            <p className="text-muted-foreground text-lg">
              Direct access to pre-vetted investment projects in Jigawa State.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "Maigatari Sesame Processing Hub",
                location: "Maigatari LGA",
                goal: "₦500M",
                roi: "15-20%",
                type: "PPP"
              },
              {
                id: 2,
                title: "Kazaure Tomato Processing Plant",
                location: "Kazaure LGA",
                goal: "₦350M",
                roi: "18%",
                type: "Private"
              }
            ].map((project) => (
              <Card key={project.id} className="border-border/50 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <CardDescription>{project.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Goal:</span>
                    <span className="font-bold">{project.goal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected ROI:</span>
                    <span className="font-bold text-green-600">{project.roi}</span>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleApply(project.id)}
                    variant={appliedProjects.includes(project.id) ? "secondary" : "default"}
                  >
                    {appliedProjects.includes(project.id) ? "Application Pending (Fee Paid)" : "Apply to Invest"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Application Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Investor Onboarding</DialogTitle>
              <DialogDescription>
                Apply to invest in this project. Processing fee is $100.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" value={formState.companyName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" value={formState.contactPerson} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formState.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Investment Amount ($)</Label>
                <Input id="amount" type="number" value={formState.amount} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full">
                Pay $100 & Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Investor Support */}
        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-[32px] p-8 lg:p-20 shadow-xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 relative z-10">
                  <h2 className="font-display text-4xl font-bold">Investor Concierge Services</h2>
                  <p className="text-muted-foreground text-lg">
                    We provide end-to-end support to ensure your investment journey in Jigawa 
                    is seamless and successful.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: FileText, text: "Fast-track Licensing" },
                      { icon: MapPin, text: "Site Selection Support" },
                      { icon: PieChart, text: "Tax Incentives Guide" },
                      { icon: Globe, text: "Local Partner Matching" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 font-medium">
                        <feature.icon className="w-5 h-5 text-primary" />
                        {feature.text}
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="px-12">Contact JATA Deal Room</Button>
                </div>
                <div className="grid gap-4 relative z-10">
                  <Card className="bg-secondary/50 border-none">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-bold">1</div>
                      <div>
                        <p className="font-bold">Register Interest</p>
                        <p className="text-sm text-muted-foreground">Submit your investment profile online.</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/50 border-none">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-bold">2</div>
                      <div>
                        <p className="font-bold">Access Deal Room</p>
                        <p className="text-sm text-muted-foreground">Review technical documents and project specs.</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/50 border-none">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary font-bold">3</div>
                      <div>
                        <p className="font-bold">Site Visit</p>
                        <p className="text-sm text-muted-foreground">Guided field tour of available farm estates.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentPortal;
