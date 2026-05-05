import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, CloudSun, Beaker, Code, FileJson, Cpu } from "lucide-react";

const DataHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl space-y-6 animate-fade-up">
              <div className="flex items-center gap-3 text-white/80 font-medium">
                <Database className="w-6 h-6" />
                <span>Agricultural Data Hub (The Brain)</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Centralized <span className="text-white">Soil & Weather</span> Intelligence
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Aggregating statewide soil mapping data, weather forecasts, and yield historicals 
                to provide data APIs for partners, researchers, and startups.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Code className="w-5 h-5" />
                  API Documentation
                </Button>
                <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 text-white">
                  Download Dataset Samples
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Streams */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/50 transition-all group overflow-hidden">
              <div className="h-48 bg-primary/5 p-8 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Beaker className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Soil Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  High-resolution soil mapping across all 27 LGAs. Tracking pH levels, nitrogen, 
                  phosphorus, and potassium (NPK) concentrations.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Statewide Soil Profile Mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Fertilizer Recommendation Engine
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-all group overflow-hidden">
              <div className="h-48 bg-accent/5 p-8 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <CloudSun className="w-16 h-16 text-accent/40 group-hover:scale-110 transition-transform" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Weather Forecasting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Integration with global weather models and local sensors to provide 
                  hyper-local forecasts for planting and harvesting windows.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Real-time Precipitation Alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Historical Yield Correlation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary-light/50 transition-all group overflow-hidden">
              <div className="h-48 bg-primary-light/5 p-8 flex items-center justify-center group-hover:bg-primary-light/10 transition-colors">
                <Cpu className="w-16 h-16 text-primary-light/40 group-hover:scale-110 transition-transform" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Yield Forecasting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  AI-driven models predicting seasonal outputs based on input levels, 
                  weather patterns, and acreage data across all Farm Estates.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                    Harvest Volume Predictions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                    Food Security Early Warning
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* API Section */}
        <section className="bg-secondary/30 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 lg:p-16 shadow-xl border border-border/50">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="space-y-6 flex-1">
                  <h2 className="font-display text-3xl font-bold">Open Data APIs</h2>
                  <p className="text-muted-foreground">
                    Empowering the ecosystem by sharing anonymized data with verified partners, 
                    agritech startups, and financial institutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <FileJson className="w-5 h-5 text-primary" />
                      REST API (JSON)
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Database className="w-5 h-5 text-primary" />
                      Bulk Export (CSV)
                    </div>
                  </div>
                  <Button size="lg">Request API Key</Button>
                </div>
                <div className="w-full md:w-1/3 bg-secondary/50 rounded-2xl p-6 font-mono text-[10px] text-foreground leading-relaxed overflow-hidden">
                  <p className="text-primary mb-2">// Sample API Response</p>
                  <pre className="opacity-70">
{`{
  "lga": "Hadejia",
  "soil_ph": 6.8,
  "moisture": "22%",
  "nutrients": {
    "N": "medium",
    "P": "high",
    "K": "low"
  },
  "recommendation": "Rice"
}`}
                  </pre>
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

export default DataHub;
