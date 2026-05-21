import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Building2, MapPin, PieChart, FileText, Globe, 
  ArrowUpRight, UserCheck, Rocket, Landmark, ArrowRight, ShieldCheck 
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

  const scrollToMarketplace = () => {
    const el = document.getElementById("marketplace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        
        {/* Breathtaking JATA Gateways Hero Banner */}
        <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden border-b border-emerald-500/10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl space-y-6 animate-fade-up">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
              <Landmark className="w-6 h-6 animate-pulse" />
              <span className="uppercase tracking-widest text-sm font-semibold">Jigawa State Initiative</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              JATA <span className="text-white">Digital Gateways</span> Portal
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              The central directory of the Jigawa Agricultural & Technology Alliance. Secure access to digital farmer identities, startup modules, and high-yield PPP public-private pipeline deals.
            </p>
          </div>
        </section>

        {/* THREE CORE GATEWAYS (The Entry Interface) */}
        <section className="container mx-auto px-4 py-16 -mt-8 relative z-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Gateway 1: Farmer Registry */}
            <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/70 backdrop-blur-md shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              <div className="p-8 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <UserCheck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Module 1</span>
                  <CardTitle className="text-2xl">Farmer Digital Registry</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Establish your digital identity in the state agricultural registry. Complete identity check with secure NIN validation, register crop/livestock volumes, and download your unique JATA Farmer ID.
                </p>
              </div>
              <div className="p-8 pt-0">
                <Button 
                  onClick={() => navigate('/farmer-registration')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium group-hover:gap-3 transition-all"
                >
                  Launch Registration
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Gateway 2: Startup Hub */}
            <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/70 backdrop-blur-md shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              <div className="p-8 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Rocket className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Module 2</span>
                  <CardTitle className="text-2xl">Startup Portal</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Accelerating state AgTech and processing founders. Apply for startup accelerator cohorts, claim seed funding grants upon milestone delivery, and match with expert agricultural mentors.
                </p>
              </div>
              <div className="p-8 pt-0">
                <Button 
                  onClick={() => navigate('/startup')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium group-hover:gap-3 transition-all"
                >
                  Enter Startup Portal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Gateway 3: PPP Projects */}
            <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/70 backdrop-blur-md shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              <div className="p-8 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Landmark className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Module 3</span>
                  <CardTitle className="text-2xl">PPP & Projects Center</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Join public-private alliances in Jigawa's modern mechanized agricultural zones. Browse pre-mapped land allocations, review irrigation pipeline assets, and apply for Joint Venture processing hubs.
                </p>
              </div>
              <div className="p-8 pt-0">
                <Button 
                  onClick={scrollToMarketplace}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium group-hover:gap-3 transition-all"
                >
                  Explore PPP Deals
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* PPP Opportunities Showcase */}
        <section id="marketplace" className="container mx-auto px-4 py-20 border-t border-border/50 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-emerald-500/10 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-none px-3 py-1 font-bold">
              PPP Investment Opportunities
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Active Deal Marketplace</h2>
            <p className="text-muted-foreground text-base">
              Secure investment pipeline projects in Jigawa State. Review documentation, submit a profile, and pay onboarding fees to secure priority land leases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                id: 1,
                title: "Maigatari Sesame Processing Hub",
                location: "Maigatari LGA",
                goal: "₦500M",
                roi: "15-20%",
                type: "PPP Joint Venture",
                features: ["5,000 Hectares Sesame Cluster", "Pre-installed Sorting Equipment", "Dedicated Power Line"]
              },
              {
                id: 2,
                title: "Kazaure Tomato Processing Plant",
                location: "Kazaure LGA",
                goal: "₦350M",
                roi: "18%",
                type: "Commercial Franchise",
                features: ["Irrigated Farming Network", "Cold-Storage Warehousing", "JATA Offtaker Agreements"]
              }
            ].map((project) => (
              <Card key={project.id} className="border-border/50 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-background/40">
                <div className="p-6 border-b border-border/40 flex justify-between items-start bg-secondary/20">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {project.location}
                    </span>
                  </div>
                  <Badge className="bg-emerald-600 text-white border-none text-[10px] uppercase font-bold tracking-wider">
                    {project.type}
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4 border-b border-border/40 pb-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Investment Cap</p>
                      <p className="text-lg font-bold text-foreground mt-0.5">{project.goal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target ROI</p>
                      <p className="text-lg font-bold text-emerald-600 mt-0.5">{project.roi}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Asset Benefits</p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2" 
                    onClick={() => handleApply(project.id)}
                    variant={appliedProjects.includes(project.id) ? "secondary" : "default"}
                  >
                    {appliedProjects.includes(project.id) ? "Application Pending (Fee Paid)" : "Apply for Onboarding"}
                    <ArrowUpRight className="w-4 h-4" />
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
              <DialogTitle className="text-xl">PPP Investor Onboarding</DialogTitle>
              <DialogDescription>
                Apply to access Jigawa deal pipelines. Submit credentials and settle the standard $100 escrow application fee.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company / Organization Name</Label>
                <Input id="companyName" value={formState.companyName} onChange={handleInputChange} required className="focus-visible:ring-emerald-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Authorized Officer</Label>
                <Input id="contactPerson" value={formState.contactPerson} onChange={handleInputChange} required className="focus-visible:ring-emerald-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Official Corporate Email</Label>
                <Input id="email" type="email" value={formState.email} onChange={handleInputChange} required className="focus-visible:ring-emerald-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Intended On-Estate Investment ($ USD)</Label>
                <Input id="amount" type="number" value={formState.amount} onChange={handleInputChange} required className="focus-visible:ring-emerald-600" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium mt-2">
                Settle $100 & Apply
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Concierge Section */}
        <section className="bg-secondary/30 py-20 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-background/80 backdrop-blur-md rounded-[32px] p-8 lg:p-16 shadow-2xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 relative z-10">
                  <h2 className="font-display text-3xl font-bold">State Investor Concierge</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    JATA provides fast-track services for commercial agriculture, helping you register interest, match with vetted local farmer associations, and obtain tax concessions under the Jigawa investment code.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-emerald-600" />
                      Fast-track Permits
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4.5 h-4.5 text-emerald-600" />
                      Site Leases
                    </div>
                    <div className="flex items-center gap-2">
                      <PieChart className="w-4.5 h-4.5 text-emerald-600" />
                      Tax Holidays
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4.5 h-4.5 text-emerald-600" />
                      Export Clearance
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8">
                    Contact JATA Desk
                  </Button>
                </div>
                <div className="space-y-4 relative z-10">
                  {[
                    { step: "1", title: "Submit Application Profile", desc: "Choose your JATA gateway modules above or register details." },
                    { step: "2", title: "Review Technical Sheets", desc: "Gain secure credentials to survey soil moisture logs and lease maps." },
                    { step: "3", title: "Guided Field Tours", desc: "Coordinate physically with extension officers to select your plot." }
                  ].map((item, idx) => (
                    <Card key={idx} className="bg-secondary/40 border-none shadow-none">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
