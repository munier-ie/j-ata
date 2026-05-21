import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, Cpu, Coins, Check, Clock, ShieldAlert, Award, 
  BookOpen, Sparkles, Network, Scale, Users2, Landmark
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StartupPortal = () => {
  const [applied, setApplied] = useState(false);
  const [applicationData, setApplicationData] = useState<{ id?: string | number; startupName?: string; status: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('startup_applications') || '[]');
    if (existing.length > 0) {
      setApplied(true);
      setApplicationData(existing[0]);
    }
  }, []);

  const handleDownloadPlaybook = () => {
    toast({
      title: "Playbook Download Initiated",
      description: "JATA Cohort 2026 Programme Playbook & Rules (PDF) is compiling.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-950 dark:selection:text-emerald-200">
      <Header />
      
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-950/20 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[15%] w-[450px] h-[450px] bg-emerald-400/5 dark:bg-emerald-900/10 rounded-full blur-[130px]" />
      </div>

      <main className="flex-grow relative z-10">
        
        {/* Breathtaking JATA Startup Hero Banner (Matches dynamic dark green theme) */}
        <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden border-b border-emerald-500/10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold tracking-wider uppercase mb-2">
              <Rocket className="h-3.5 w-3.5 text-emerald-300" /> JATA Cohort 2026 Accelerate
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
              Agribusiness Startup & <span className="text-emerald-300">AgTech Portal</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Empowering homegrown agricultural startups with non-dilutive capital, state-wide pilot estates, agricultural datasets, and strategic agronomic frameworks.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                disabled={applied}
                onClick={() => navigate("/startup/apply")}
                className="bg-white text-emerald-900 hover:bg-emerald-50 border border-white/30 rounded-xl px-7 py-6 font-bold shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                {applied ? "Application Logged" : "Apply for Cohort"}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleDownloadPlaybook}
                className="border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 rounded-xl px-7 py-6 font-bold text-white transition-all duration-300"
              >
                <BookOpen className="mr-2 h-4 w-4 text-emerald-300" /> Programme Playbook
              </Button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl space-y-20 relative z-20">
          
          {/* Active Application Status Alert (If Applied) */}
          {applied && applicationData && (
            <div className="-mt-24 relative z-30">
              <Card className="border-emerald-500/20 bg-background/85 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
                <CardHeader className="border-b border-border/40 pb-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                          Active Application
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">ID: JATA-ST-{applicationData.id || "2026"}</span>
                      </div>
                      <CardTitle className="text-2xl font-bold tracking-tight mt-1 text-foreground">
                        {applicationData.startupName || "Your AgTech Proposal"}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/20 shadow-inner">
                      <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                      <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                        Status: {applicationData.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground max-w-2xl mb-6">
                    Your registration is successfully logged in the JATA AgTech Registry. The screening panel is actively reviewing your tech architecture, feasibility framework, and economic projection model. No further action is required.
                  </p>
                  
                  {/* Visual Startup Pipeline Stage */}
                  <div className="relative pt-2">
                    <div className="absolute top-[17px] left-4 right-4 h-0.5 bg-secondary pointer-events-none" />
                    <div className="absolute top-[17px] left-4 w-1/3 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 pointer-events-none" />

                    <div className="grid grid-cols-4 text-center relative z-10 gap-2">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-emerald-500/20">
                          <Check className="h-4 w-4 stroke-[3px]" />
                        </div>
                        <span className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">Submitted</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-background border border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shadow-inner animate-pulse">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">Auditing</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-background border border-border text-muted-foreground flex items-center justify-center font-bold text-xs">
                          3
                        </div>
                        <span className="mt-2 text-xs font-medium text-muted-foreground">Live Pitch</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-background border border-border text-muted-foreground flex items-center justify-center font-bold text-xs">
                          4
                        </div>
                        <span className="mt-2 text-xs font-medium text-muted-foreground">Acceleration</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 1. Startup Tracks */}
          <section>
            <div className="flex flex-col items-center text-center mb-12 space-y-2">
              <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-none uppercase tracking-widest text-[9px] px-3 py-1 font-extrabold">
                Program Tracks
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">AgTech Verticals We Support</h2>
              <p className="text-sm text-muted-foreground max-w-lg">We focus on high-impact technology segments directly solving problems for dry-season agronomy and supply lines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Track 1 */}
              <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/50 backdrop-blur-sm transition-all duration-300 group shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/10 mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 transition-all duration-300">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Smart Agronomy & IoT
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                  Startups building physical soil multi-sensors, IoT drip irrigation automation, crop pest identification AI models, or dry-season micro-climate mapping infrastructure.
                </CardContent>
              </Card>

              {/* Track 2 */}
              <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/50 backdrop-blur-sm transition-all duration-300 group shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/10 mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 transition-all duration-300">
                    <Network className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Value-Chain & Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                  Logistics platforms offering temperature-traceable cold storage links, micro-warehouse allocations, cooperative transport pools, or direct-to-market trade platforms.
                </CardContent>
              </Card>

              {/* Track 3 */}
              <Card className="border-emerald-500/10 hover:border-emerald-500/30 bg-background/50 backdrop-blur-sm transition-all duration-300 group shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/10 mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 transition-all duration-300">
                    <Coins className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Farmer Financial Inclusion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                  Micro-fintech solutions specialized in indexed dry-season climate insurance, cooperative micro-savings escrow, or algorithmic seed credit scoring.
                </CardContent>
              </Card>

            </div>
          </section>

          {/* 2. Value Proposition */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-none uppercase tracking-widest text-[9px] px-3 py-1 font-extrabold">
                  cohort benefits
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  What Startups <span className="text-emerald-600 dark:text-emerald-400">Secure</span> in the JATA Cohort
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  JATA is not a theoretical curriculum. We deploy tangible resources, direct capital, and pilot locations to stress-test your AgTech code and hardware in the field.
                </p>
                
                <div className="pt-2 border-t border-border space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">100% Equity-Free Program</h4>
                      <p className="text-xs text-muted-foreground">We do not take board seats or dilution in exchange for program support.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Direct PPP Procurement Pipes</h4>
                      <p className="text-xs text-muted-foreground">Graduating cohort members gain priority bidding status for Jigawa state farm contracts.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Benefit 1 */}
                <div className="p-6 bg-background/50 border border-emerald-500/10 rounded-2xl space-y-3 shadow-md hover:border-emerald-500/20 transition-all">
                  <Coins className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-foreground text-lg">₦5M Seed Funding</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Non-dilutive, milestone-backed grants disbursed directly into operational accounts as verified engineering milestones are passed.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="p-6 bg-background/50 border border-emerald-500/10 rounded-2xl space-y-3 shadow-md hover:border-emerald-500/20 transition-all">
                  <Users2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-foreground text-lg">Elite Mentorship</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Direct 1-on-1 access to veteran research agronomists, regional export logisticians, and elite software architecture leads.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="p-6 bg-background/50 border border-emerald-500/10 rounded-2xl space-y-3 shadow-md hover:border-emerald-500/20 transition-all">
                  <Sparkles className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-foreground text-lg">Data Sandbox Access</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Developer API keys giving direct REST query access to Jigawa State high-fidelity soil parameters, weather streams, and crop indices.
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="p-6 bg-background/50 border border-emerald-500/10 rounded-2xl space-y-3 shadow-md hover:border-emerald-500/20 transition-all">
                  <Landmark className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-foreground text-lg">Pilot Agricultural Zones</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Guaranteed land deployment segments inside official Jigawa State dry-season agricultural zones to run active product testing.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 3. Startup Pipeline Roadmap */}
          <section>
            <div className="flex flex-col items-center text-center mb-12 space-y-2">
              <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-none uppercase tracking-widest text-[9px] px-3 py-1 font-extrabold">
                Program Timeline
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Application & Accelerate Journey</h2>
              <p className="text-sm text-muted-foreground max-w-lg">How to navigate our selection procedure from initial filing to physical milestone funding.</p>
            </div>

            <div className="relative border-l border-emerald-500/20 pl-6 ml-4 sm:ml-8 space-y-12">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-background border border-emerald-500 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">Stage 01</span>
                  <h3 className="text-lg font-bold text-foreground">Interactive Registry Pitch Submission</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Register your AgTech startup details online via `/startup/apply`. The system logs your target crop vectors, engineering outline, core founders, and physical targets.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-background border border-emerald-500 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">Stage 02</span>
                  <h3 className="text-lg font-bold text-foreground">Feasibility & Impact Auditing</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    The JATA technical committee carries out deep architectural audits on the submissions. Projects are checked for real agronomic impact, software viability, and database integrity.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-background border border-emerald-500 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">Stage 03</span>
                  <h3 className="text-lg font-bold text-foreground">Demo Pitch Day</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Finalists are invited to Dutse to pitch live to the JATA Committee, representatives of agricultural farm cooperatives, PPP partners, and venture funds.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-background border border-emerald-500 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">Stage 04</span>
                  <h3 className="text-lg font-bold text-foreground">Audited Milestone Sandbox</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Selected startups enter a 6-month hands-on sandbox program. Funding is unlocked bi-monthly upon verification of tested codebase releases or physical field deployment benchmarks.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 4. Critical Warning & Rejection Checklist ("What You Might Miss") */}
          <section>
            <Card className="border-red-500/20 bg-red-500/5 dark:bg-red-950/5 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[30px]" />
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg text-red-600 dark:text-red-400 border border-red-500/20">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">Critical Guidelines & Red-Flags</CardTitle>
                    <CardDescription className="text-xs text-red-500/80">Make sure your startup complies with these strict operational parameters to avoid immediate rejection.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground">
                  <div className="p-4 bg-background/60 rounded-xl border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                      <Scale className="h-3.5 w-3.5" /> No Speculative Tech
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Cryptocurrency projects, pure peer-to-peer retail micro-lending apps, or asset trading applications that lack physical agronomy or local logistics integrations are strictly barred.
                    </p>
                  </div>
                  <div className="p-4 bg-background/60 rounded-xl border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                      <Cpu className="h-3.5 w-3.5" /> Demo/System Architecture Required
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Conceptual mockups with zero engineering implementation are not accepted. Applications must contain either a live API/app link or an explicit system architecture schema.
                    </p>
                  </div>
                  <div className="p-4 bg-background/60 rounded-xl border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                      <Award className="h-3.5 w-3.5" /> Regional Deployment Clause
                  </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Selected startups must commit to conducting actual farm pilots, hardware deployments, or field engineering trials within Jigawa State LGAs during the acceleration phase.
                    </p>
                  </div>
                  <div className="p-4 bg-background/60 rounded-xl border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                      <Coins className="h-3.5 w-3.5" /> Milestone Auditing
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Funds are never paid as a lump-sum check at onboarding. Every Naira is strictly mapped to evaluated codebase merges, component tests, or physically inspected sensor setups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 5. Bottom Onboarding Call to Action */}
          <section className="text-center relative">
            <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-background p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Ready to Join Jigawa's AgTech Ecosystem?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Verify your team credentials, check our Technical Guidelines PDF, and register your agribusiness proposal before the Cohort 2026 deadline.
                </p>
                
                <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button 
                    size="lg" 
                    disabled={applied}
                    onClick={() => navigate("/startup/apply")}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/20 rounded-xl px-8 py-5 font-bold shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    {applied ? "Application Submitted" : "Submit Cohort Application"}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleDownloadPlaybook}
                    className="w-full sm:w-auto border-border hover:bg-secondary rounded-xl px-8 py-5 font-bold text-foreground transition-all duration-300"
                  >
                    Download Program Playbook
                  </Button>
                </div>

                <div className="pt-6 border-t border-border/50 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground font-medium">
                  <span>Application Fee: ₦2,450 (JATA Portal Levy)</span>
                  <span>•</span>
                  <span>Cohort Limit: 15 Agri-Startups</span>
                  <span>•</span>
                  <span>Auditing Windows: Bi-weekly</span>
                </div>
              </div>
            </Card>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default StartupPortal;
