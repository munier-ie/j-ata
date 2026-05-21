import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Target, 
  Users, 
  Shield,
  Award,
  Globe
} from "lucide-react";
import jigawaLogo from "@/assets/jigawa-logo.png";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To modernize Jigawa's agrarian economy through digital innovation, empowering farmers, and driving sustainable agricultural development."
  },
  {
    icon: Globe,
    title: "Our Vision",
    description: "To position Jigawa State as a global leader in digital agriculture and smart farming governance."
  },
  {
    icon: Shield,
    title: "Our Commitment",
    description: "Transparency, accountability, and service excellence in every aspect of agricultural transformation."
  },
];

const objectives = [
  "Digitally empower the 1,435 extension agents already deployed",
  "Implement an integrated agricultural command & control platform",
  "Establish a centralized agricultural data hub (The Brain)",
  "Scale mechanized agricultural processing zones and agribusiness innovation hubs",
  "Automate input subsidy tracking and voucher systems",
  "Provide real-time soil intelligence and weather forecasting"
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
                About JATA
              </h1>
              <p className="text-xl text-primary-foreground/80">
                The Jigawa Agricultural Transformation Agency (JATA) is the digital heartbeat of Jigawa's farming revolution.
              </p>
            </div>
          </div>
        </section>

        {/* DG Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="elevated" className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-8 p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-primary shadow-xl">
                      <img 
                        src="/director jata.png" 
                        alt="Dr. Saifullahi Umar - Director General JATA" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-xl bg-background overflow-hidden shadow-lg p-1">
                      <img src={jigawaLogo} alt="Jigawa State Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium uppercase tracking-wider">
                    Director General
                  </p>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Dr. Saifullahi Umar
                  </h3>
                  <p className="text-sm text-muted-foreground">DG JATA and Council Secretary</p>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Director General's Message
                  </h2>
                  <blockquote className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      "Welcome to the JATA Digital Hub — a strategic engine designed to transform 
                      Jigawa's agricultural sector into a modern, data-driven agrarian economy. 
                      Our mission is to bridge the digital divide for our 1,435 extension agents 
                      and over 2 million farmers.
                    </p>
                    <p>
                      Through this integrated command and control platform, we are eliminating data 
                      fragmentation and ensuring that every policy decision is backed by real-time 
                      field intelligence. We are building a future where technology and soil meet 
                      to create unprecedented prosperity for our state.
                    </p>
                    <p>
                      I invite all stakeholders, partners, and investors to join us on this 
                      transformative journey. Together, we are planting the seeds of a digital 
                      future for Jigawa State."
                    </p>
                  </blockquote>
                  <p className="mt-4 font-display font-semibold text-foreground">
                    — Dr. Saifullahi Umar
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Corporate Overview */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-display mb-4 text-foreground">Corporate Overview</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The Jigawa Agricultural Transformation Agency (Jigawa-ATA) is a strategic government body spearheading the transition from traditional, subsistence farming to a modern, commercialized, and technology-driven agri-food system in Jigawa State.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2025, Jigawa-ATA's vision is to leverage the state's vast agricultural potential to enhance food security, create sustainable jobs, and empower rural communities. Operating on a lean, three-pillar model, Jigawa-ATA ensures its activities are data-driven (Analytics), efficiently executed on the ground (Delivery), and supported by robust administrative systems (Operations).
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-xl font-bold font-display mb-4 text-foreground">Our History</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Established in 2025, Jigawa-ATA was inspired by successful African Agricultural Transformation Initiatives demonstrated at the Africa Food System Summit in Rwanda. These models, which transformed agricultural sectors in countries like Ethiopia, Sudan, Uganda, and Sierra Leone provided a blueprint for strategic, large-scale interventions.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm mt-2">
                  The formation of Jigawa-ATA represents a direct commitment to adapting these proven approaches to Jigawa's unique context. Our mandate is to drive the transition from subsistence farming to a commercialized agricultural economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} variant="feature">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Project Objectives
                </h2>
                <p className="text-muted-foreground">
                  The JATA Digital Platform is designed to achieve the following strategic objectives:
                </p>
              </div>

              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-foreground pt-1">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Info */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={jigawaLogo} 
                    alt="Jigawa State Government Logo" 
                    className="w-20 h-20 object-contain bg-background rounded-full p-2"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-bold">JATA</h2>
                    <p className="text-background/60">Jigawa Agricultural Transformation Agency</p>
                  </div>
                </div>
                <p className="text-background/80 leading-relaxed mb-6">
                  The Jigawa Agricultural Transformation Agency (JATA) is responsible for the development, 
                  regulation, and promotion of the agricultural sector across all 27 Local Government 
                  Areas of Jigawa State.
                </p>
                <p className="text-background/80 leading-relaxed">
                  This digital platform is a flagship initiative to transform agricultural governance 
                  and position Jigawa State as a leader in agricultural technology adoption in Nigeria.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-background/5 border border-background/10 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-display font-bold text-primary">27</p>
                  <p className="text-sm text-background/60">LGAs Covered</p>
                </div>
                <div className="p-6 rounded-xl bg-background/5 border border-background/10 text-center">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-display font-bold text-primary">1st</p>
                  <p className="text-sm text-background/60">Agricultural Transformation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
