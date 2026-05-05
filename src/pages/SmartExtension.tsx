import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Users, MessageSquare, ShieldCheck, Download, CheckCircle2 } from "lucide-react";

const SmartExtension = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  Smart Extension & Farmer Support
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Digitally Empowering <span className="text-white">1,435 Extension Agents</span>
                </h1>
                <p className="text-lg opacity-90 max-w-xl">
                  A comprehensive mobile ecosystem providing real-time field intelligence, 
                  pest reporting, and multilingual advisory services to farmers across Jigawa.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Download Agent App
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 text-white">
                    View Advisory Portal
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block animate-fade-in">
                <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=800" 
                    alt="Farmer using mobile app" 
                    className="rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">New Field Report</p>
                        <p className="text-sm font-bold text-foreground">Rice Blast Detected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Components */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Core Components</h2>
            <p className="text-muted-foreground text-lg">
              Our support system is built on four pillars designed to bridge the gap between 
              policy and the field.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Field Reporting",
                desc: "Real-time data collection from the farm level, including pest & disease outbreaks."
              },
              {
                icon: Users,
                title: "Agent Management",
                desc: "Deployment tracking and performance monitoring for all 1,435 extension staff."
              },
              {
                icon: MessageSquare,
                title: "Farmer Advisory",
                desc: "SMS & USSD-based notifications in Hausa and English for weather and crop tips."
              },
              {
                icon: ShieldCheck,
                title: "Quality Control",
                desc: "Verification of input distribution and field practices for subsidy compliance."
              }
            ].map((item, i) => (
              <Card key={i} className="border-border/50 hover:shadow-lg transition-all group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border/50">
              <div className="grid lg:grid-cols-2">
                <div className="p-12 lg:p-20 space-y-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold">Driving Real Impact</h2>
                  <div className="space-y-6">
                    {[
                      "Faster response to critical farm issues and outbreaks.",
                      "Real-time field intelligence for policy makers.",
                      "Increased farmer productivity through data-driven advice.",
                      "Offline capability for remote rural deployments."
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        <p className="text-lg text-muted-foreground">{text}</p>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="px-8">Get Started</Button>
                </div>
                <div className="relative h-[400px] lg:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1595841055318-47ec05a1099f?auto=format&fit=crop&q=80&w=800" 
                    alt="Agriculture field" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
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

export default SmartExtension;
