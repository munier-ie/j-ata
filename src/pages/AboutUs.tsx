import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users, Award } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display">
            About Jigawa-ATA
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming farming from subsistence to modern, technology-driven agribusiness.
          </p>
        </div>

        {/* Corporate Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold font-display mb-4 text-foreground">Corporate Overview</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The Jigawa Agricultural Transformation Agency (Jigawa-ATA) is a strategic government body spearheading the transition from traditional, subsistence farming to a modern, commercialized, and technology-driven agri-food system in Jigawa State.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2025, Jigawa-ATA's vision is to leverage the state's vast agricultural potential to enhance food security, create sustainable jobs, and empower rural communities. Operating on a lean, three-pillar model, Jigawa-ATA ensures its activities are data-driven (Analytics), efficiently executed on the ground (Delivery), and supported by robust administrative systems (Operations).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card variant="elevated" className="bg-primary/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Target className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-foreground">Analytics</h3>
                <p className="text-xs text-muted-foreground">Data-driven decisions</p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="bg-primary/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-foreground">Delivery</h3>
                <p className="text-xs text-muted-foreground">Efficient execution</p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="bg-primary/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-foreground">Operations</h3>
                <p className="text-xs text-muted-foreground">Robust administration</p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="bg-primary/5">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-bold text-foreground">Impact</h3>
                <p className="text-xs text-muted-foreground">Rural empowerment</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our History */}
        <div className="bg-secondary/30 rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-display mb-4 text-foreground">Our History</h2>
            <p className="text-muted-foreground leading-relaxed">
              Established in 2025, Jigawa-ATA was inspired by successful African Agricultural Transformation Initiatives demonstrated at the Africa Food System Summit in Rwanda. These models, which transformed agricultural sectors in countries like Ethiopia, Sudan, Uganda, and Sierra Leone with support from the Bill & Melinda Gates Foundation, African Development Bank, and Mastercard Foundation, provided a blueprint for strategic, large-scale interventions.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The formation of Jigawa-ATA represents a direct commitment to adapting these proven approaches to Jigawa's unique context. Our mandate is to drive the transition from subsistence farming to a commercialized agricultural economy.
            </p>
          </div>
        </div>

        {/* Contact Info (Brief) */}
        <div className="text-center">
          <h2 className="text-2xl font-bold font-display mb-4 text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground">5340, Kiyawa Road, Dutse, Jigawa State, Nigeria</p>
          <p className="text-muted-foreground">support@jata.ng | dg.jata@jigawastate.gov.ng</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
