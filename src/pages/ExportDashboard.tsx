import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Truck, Anchor, CheckCircle } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const ExportDashboard = () => {
  const shipments = [
    { id: "SH-2026-001", destination: "China", commodity: "Sesame", status: "In Transit", eta: "2026-06-15" },
    { id: "SH-2026-002", destination: "UAE", commodity: "Hibiscus", status: "At Port", eta: "2026-05-20" },
    { id: "SH-2026-003", destination: "Netherlands", commodity: "Gum Arabic", status: "Loading", eta: "2026-05-25" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Global Trade</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Export Compliance Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Monitor international trade readiness and active shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Compliance Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                State Compliance Score
              </CardTitle>
              <CardDescription>Overall readiness for international export.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Current Score</span>
                <span className="font-bold">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Phytosanitary Standards Met
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" /> Packaging Requirements Verified
              </div>
            </CardContent>
          </Card>

          {/* Active Shipments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Active Shipments
              </CardTitle>
              <CardDescription>Tracking produce on the move to international markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.map((sh) => (
                  <div key={sh.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold text-foreground">{sh.id} - {sh.commodity}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Anchor className="h-3 w-3" /> Destination: {sh.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={sh.status === 'In Transit' ? 'default' : 'secondary'}>
                        {sh.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">ETA: {sh.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commodity Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Sesame', 'Hibiscus', 'Gum Arabic'].map((crop) => (
            <Card key={crop} className="border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{crop}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available for Export:</span>
                  <span className="font-bold">2,500 Tons</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Grade A Share:</span>
                  <span className="font-medium text-emerald-600">70%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportDashboard;
