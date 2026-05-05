import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Map as MapIcon, BarChart3, Radio, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommandCenter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-up">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                Integrated Agricultural Command & Control
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Data-Driven <span className="text-white">Transformation Control</span>
              </h1>
              <p className="text-xl opacity-90">
                A high-level dashboard for J-ATA leadership to monitor all programs in real time. 
                From farmer registration to yield forecasting—all in one place.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button variant="secondary" size="lg" className="gap-2" onClick={() => navigate('/admin')}>
                  <LayoutDashboard className="w-5 h-5" />
                  Access Admin Dashboard
                </Button>
                <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 text-white gap-2" onClick={() => navigate('/map')}>
                  <MapIcon className="w-5 h-5" />
                  Open GIS Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { 
                title: "Program Performance", 
                icon: BarChart3, 
                value: "92%", 
                label: "Target Completion",
                desc: "Real-time tracking of subsidy distribution and farm estate development."
              },
              { 
                title: "Active Field Units", 
                icon: Radio, 
                value: "1,435", 
                label: "Extension Agents",
                desc: "Live connectivity status and GPS reporting from all LGAs."
              },
              { 
                title: "Security & Audits", 
                icon: ShieldCheck, 
                value: "Verified", 
                label: "System Status",
                desc: "Every transaction and report is digitally signed and audited."
              }
            ].map((stat, i) => (
              <Card key={i} className="border-border/50 shadow-sm overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-primary font-semibold mb-4">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50 shadow-xl overflow-hidden bg-secondary/20">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16 space-y-8">
                <h2 className="font-display text-3xl font-bold">Operational Modules</h2>
                <div className="space-y-6">
                  {[
                    { title: "Farmer Database Management", desc: "Digital identity and verification system for all 2M+ farmers." },
                    { title: "GIS Farm Mapping", desc: "Spatial tracking of farm boundaries and soil health indices." },
                    { title: "Input Subsidy Tracking", desc: "Voucher-based distribution monitoring for seeds and fertilizer." },
                    { title: "Irrigation Control", desc: "Status tracking for solar-powered irrigation and water clusters." }
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                      <h3 className="font-semibold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                        {item.title}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary/5 p-8 flex items-center justify-center">
                <div className="w-full h-full min-h-[300px] rounded-2xl bg-white shadow-2xl border border-border p-4">
                   <div className="w-full h-full bg-secondary/30 rounded-xl flex items-center justify-center border border-dashed border-primary/20">
                      <div className="text-center">
                        <MapIcon className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                        <p className="font-medium text-primary/60">GIS Map Preview</p>
                        <Button variant="link" className="mt-2" onClick={() => navigate('/map')}>View Live Map</Button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommandCenter;
