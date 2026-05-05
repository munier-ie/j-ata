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
    description: "To modernize livestock administration, empower farmers, and drive sustainable economic growth across Jigawa State through digital transformation."
  },
  {
    icon: Globe,
    title: "Our Vision",
    description: "To position Jigawa State as a national leader in livestock governance and digital innovation in Nigeria."
  },
  {
    icon: Shield,
    title: "Our Commitment",
    description: "Transparency, accountability, and service excellence in every aspect of livestock management."
  },
];

const objectives = [
  "Digitally register and authenticate all livestock farmers across Jigawa State",
  "Digitize veterinary services and livestock health records",
  "Automate livestock market, slaughterhouse, and related revenue collection",
  "Eliminate cash handling, paper records, and data fragmentation",
  "Increase internally generated revenue (IGR) for Jigawa State",
  "Provide real-time data for policy formulation and decision-making"
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
                About the Platform
              </h1>
              <p className="text-xl text-primary-foreground/80">
                The official digital backbone of the Ministry of Livestock, Jigawa State Government.
              </p>
            </div>
          </div>
        </section>

        {/* Commissioner Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="elevated" className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-8 p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-primary shadow-xl">
                      <img 
                        src="/Hon.%20commissioner.png" 
                        alt="Professor Saleem Abdurrahman - Honourable Commissioner for Livestock" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-xl bg-background overflow-hidden shadow-lg p-1">
                      <img src={jigawaLogo} alt="Jigawa State Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium uppercase tracking-wider">
                    Honourable Commissioner
                  </p>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Professor Saleem Abdurrahman
                  </h3>
                  <p className="text-sm text-muted-foreground">Ministry of Livestock, Jigawa State</p>
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Welcome Message
                  </h2>
                  <blockquote className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      "Welcome to the Jigawa State Livestock Digital Platform — a strategic initiative 
                      to modernize livestock administration, empower our farmers, strengthen veterinary 
                      services, and drive sustainable economic growth across Jigawa State.
                    </p>
                    <p>
                      This platform represents a bold step towards eliminating manual processes, improving 
                      livestock governance, and generating sustainable revenue for our great state. Through 
                      this digital transformation, we are positioning Jigawa as a national leader in 
                      livestock digitalization.
                    </p>
                    <p>
                      I invite all livestock farmers, veterinary officers, and stakeholders to embrace 
                      this initiative and join us in building a more prosperous future for our livestock sector."
                    </p>
                  </blockquote>
                  <p className="mt-4 font-display font-semibold text-foreground">
                    — Professor Saleem Abdurrahman
                  </p>
                </div>
              </div>
            </Card>
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
                  The Jigawa Livestock Digital Platform is designed to achieve the following strategic objectives:
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
                    <h2 className="font-display text-2xl font-bold">Ministry of Livestock</h2>
                    <p className="text-background/60">Jigawa State Government</p>
                  </div>
                </div>
                <p className="text-background/80 leading-relaxed mb-6">
                  The Ministry of Livestock, Jigawa State, is responsible for the development, 
                  regulation, and promotion of the livestock sector across all 27 Local Government 
                  Areas of Jigawa State.
                </p>
                <p className="text-background/80 leading-relaxed">
                  This digital platform is a flagship initiative to transform livestock governance 
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
                  <p className="text-sm text-background/60">Digital Livestock Platform</p>
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
