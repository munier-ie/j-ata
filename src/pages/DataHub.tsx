import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, CloudSun, Beaker, Code, FileJson, Cpu, 
  TrendingUp, Droplets, AlertTriangle, Calendar, 
  Sparkles, MapPin, ChevronRight, Thermometer, Sun, Wind
} from "lucide-react";
import { useState, useEffect } from "react";
import { newsApi, NewsArticle } from "@/lib/api";

const fallbackAnnouncements: Omit<NewsArticle, "id" | "createdAt" | "updatedAt" | "publishedAt">[] = [
  {
    title: "State Government Announces 50% Subsidy on NPK Fertilizer for JATA Farmers",
    slug: "subsidy-npk-fertilizer",
    excerpt: "All registered JATA farmers are eligible for a 50% discount on NPK fertilizers starting this Monday at local Service Centers.",
    content: "Detailed details...",
    imageUrl: null,
    category: "Subsidy & Support",
    isPublished: true
  },
  {
    title: "Heavy Rainfall Warning: Dutse and Ringim LGAs Alert",
    slug: "heavy-rainfall-dutse-ringim",
    excerpt: "Jigawa State Agricultural Extension Services issue flash flood alerts for low-lying farming clusters. Protect storage units.",
    content: "Detailed details...",
    imageUrl: null,
    category: "Weather Alert",
    isPublished: true
  },
  {
    title: "Sesame Sowing Optimal Planting Window Confirmed",
    slug: "sesame-optimal-planting-window",
    excerpt: "Agronomists declare the upcoming week as the prime window for high-yield sesame sowing based on current moisture forecasts.",
    content: "Detailed details...",
    imageUrl: null,
    category: "Agronomy Advisory",
    isPublished: true
  }
];

const lgaSoilData: Record<string, { ph: number; moisture: number; nitrogen: string; phosphorus: string; potassium: string; crops: string[] }> = {
  "Hadejia": { ph: 6.8, moisture: 22, nitrogen: "Medium", phosphorus: "High", potassium: "Low", crops: ["Rice", "Wheat", "Vegetables"] },
  "Dutse": { ph: 6.2, moisture: 15, nitrogen: "Low", phosphorus: "Medium", potassium: "Medium", crops: ["Groundnuts", "Millet", "Cowpeas"] },
  "Ringim": { ph: 6.5, moisture: 18, nitrogen: "Medium", phosphorus: "Medium", potassium: "High", crops: ["Rice", "Sesame", "Maize"] },
  "Kazaure": { ph: 5.8, moisture: 12, nitrogen: "Low", phosphorus: "Low", potassium: "High", crops: ["Sorghum", "Millet", "Cassava"] },
  "Birnin Kudu": { ph: 7.0, moisture: 20, nitrogen: "High", phosphorus: "High", potassium: "Medium", crops: ["Rice", "Wheat", "Tomato"] },
  "Gumel": { ph: 6.0, moisture: 14, nitrogen: "Low", phosphorus: "Medium", potassium: "Low", crops: ["Millet", "Sesame", "Beans"] },
  "Gwaram": { ph: 6.4, moisture: 16, nitrogen: "Medium", phosphorus: "Low", potassium: "High", crops: ["Sesame", "Sorghum", "Groundnuts", "Millet"] }
};

export default function DataHub() {
  const [selectedLga, setSelectedLga] = useState("Hadejia");
  const [announcements, setAnnouncements] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await newsApi.getAll();
        const active = data.filter(article => article.isPublished);
        setAnnouncements(active);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const activeAnnouncements = announcements.length > 0 ? announcements : (fallbackAnnouncements as NewsArticle[]);
  const soil = lgaSoilData[selectedLga] || lgaSoilData["Hadejia"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Sleek Hero banner */}
        <section className="bg-hero-gradient text-primary-foreground py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl space-y-6 animate-fade-up">
            <div className="flex items-center justify-center gap-3 text-emerald-400 font-medium">
              <Database className="w-6 h-6 animate-pulse" />
              <span className="uppercase tracking-widest text-sm font-semibold">Agricultural Data Hub</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Statewide <span className="text-white">Soil, Weather & Yield</span> Intelligence
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Empowering Jigawa farmers with live agronomy forecasting, while offering advanced public REST APIs for developers, researchers, and agritech founders.
            </p>
          </div>
        </section>

        {/* Tab Selection Section */}
        <section className="container mx-auto px-4 mt-12">
          <Tabs defaultValue="advisory" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="bg-emerald-950/20 p-1 border border-emerald-500/10 rounded-full">
                <TabsTrigger 
                  value="advisory" 
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Farmer Advisory Portal
                </TabsTrigger>
                <TabsTrigger 
                  value="developer" 
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Developer Open Data Hub
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB A: FARMER ADVISORY PORTAL */}
            <TabsContent value="advisory" className="space-y-12 focus-visible:outline-none">
              
              {/* Dashboard Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Visual Weather & Planting Alerts */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl flex flex-col justify-between overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-900/10 to-emerald-950/20 p-6 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">Live Forecast</span>
                        <h3 className="text-xl font-bold">Jigawa State Weather</h3>
                      </div>
                      <CloudSun className="w-8 h-8 text-emerald-600 animate-bounce" />
                    </div>
                    
                    <div className="flex items-center gap-4 mt-6">
                      <span className="text-5xl font-extrabold tracking-tight">34°C</span>
                      <div>
                        <p className="font-semibold text-foreground">Partly Cloudy</p>
                        <p className="text-xs text-muted-foreground">Wind: 14 km/h | Hum: 42%</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6 flex-grow">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Sesame Planting Active</p>
                        <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                          Soil temperature and moisture profiles are in prime bounds. Proceed with sesame sowing before heavy weekend rains.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Regional Forecast Highlights</h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-secondary/50">
                          <p className="text-muted-foreground">Dutse</p>
                          <Sun className="w-4 h-4 mx-auto my-1.5 text-amber-500" />
                          <p className="font-bold">36°C</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-secondary/50">
                          <p className="text-muted-foreground">Hadejia</p>
                          <CloudSun className="w-4 h-4 mx-auto my-1.5 text-blue-400" />
                          <p className="font-bold">32°C</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-secondary/50">
                          <p className="text-muted-foreground">Kazaure</p>
                          <Wind className="w-4 h-4 mx-auto my-1.5 text-emerald-500" />
                          <p className="font-bold">35°C</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Soil Profile Analyzer (Interactive) */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl flex flex-col justify-between overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-900/10 to-emerald-950/20 p-6 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">Interactive Tool</span>
                        <h3 className="text-xl font-bold">Soil Health Analyzer</h3>
                      </div>
                      <Beaker className="w-8 h-8 text-emerald-600" />
                    </div>

                    {/* LGA Selector */}
                    <div className="mt-4">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground">Select Local Government Area (LGA)</label>
                      <select 
                        value={selectedLga} 
                        onChange={(e) => setSelectedLga(e.target.value)}
                        className="w-full mt-1.5 p-2 rounded-xl bg-background border border-emerald-500/20 text-sm font-medium focus:outline-none focus:border-emerald-600 transition-colors"
                      >
                        {Object.keys(lgaSoilData).map(lga => (
                          <option key={lga} value={lga}>{lga} LGA</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-5 flex-grow">
                    {/* pH level gauge */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">Soil pH Scale</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{soil.ph} (Neutral/Optimal)</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 via-emerald-500 to-blue-500 rounded-full"
                          style={{ width: "100%" }}
                        />
                        <div 
                          className="absolute top-0 w-3 h-3 bg-white border border-primary rounded-full -mt-0.5 shadow-md animate-pulse"
                          style={{ left: `${(soil.ph / 14) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Moisture level indicator */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">Moisture Content</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{soil.moisture}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${soil.moisture * 3}%` }}
                        />
                      </div>
                    </div>

                    {/* NPK parameters */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 border border-border/50 rounded-xl text-center bg-background/40">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Nitrogen (N)</p>
                        <p className="text-sm font-extrabold text-emerald-600 mt-1">{soil.nitrogen}</p>
                      </div>
                      <div className="p-2 border border-border/50 rounded-xl text-center bg-background/40">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Phosphorus (P)</p>
                        <p className="text-sm font-extrabold text-emerald-600 mt-1">{soil.phosphorus}</p>
                      </div>
                      <div className="p-2 border border-border/50 rounded-xl text-center bg-background/40">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Potassium (K)</p>
                        <p className="text-sm font-extrabold text-amber-500 mt-1">{soil.potassium}</p>
                      </div>
                    </div>

                    {/* Recommended crops */}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">Top Crop Recommendations</p>
                      <div className="flex flex-wrap gap-1.5">
                        {soil.crops.map(crop => (
                          <Badge key={crop} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dynamic Commodities Yield Forecast */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl flex flex-col justify-between overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-900/10 to-emerald-950/20 p-6 border-b border-border/50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400">AI Yield Outlook</span>
                        <h3 className="text-xl font-bold">Seasonal Yield Forecast</h3>
                      </div>
                      <Cpu className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-5 flex-grow justify-center flex flex-col">
                    <div className="space-y-4">
                      {[
                        { commodity: "Rice (Estates)", forecast: "4.5 MT / Ha", increase: "+12.4%", pct: 90 },
                        { commodity: "Wheat", forecast: "3.8 MT / Ha", increase: "+8.2%", pct: 76 },
                        { commodity: "Sesame (Export)", forecast: "1.2 MT / Ha", increase: "+15.1%", pct: 40 },
                        { commodity: "Maize", forecast: "3.2 MT / Ha", increase: "+4.5%", pct: 64 },
                      ].map((crop, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-foreground">{crop.commodity}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{crop.forecast} <span className="text-[10px] text-emerald-500">({crop.increase})</span></span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${crop.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-secondary/30 border border-border/50 text-[11px] text-muted-foreground flex gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      Projections are calculated dynamically using historical LGA yield sheets, current precipitation logs, and satellite indices across active agricultural zones.
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* State Announcements and Bulletins */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Farmer Advisory & State Broadcasts</h2>
                    <p className="text-muted-foreground text-sm">
                      Announcements pushed by government administrators and extension directors in real-time.
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-muted-foreground hidden sm:block" />
                </div>

                {newsLoading ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="animate-pulse border-border/50">
                        <div className="h-44 bg-secondary" />
                        <CardHeader className="space-y-2">
                          <div className="h-4 bg-secondary w-1/3 rounded" />
                          <div className="h-6 bg-secondary w-5/6 rounded" />
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {activeAnnouncements.slice(0, 3).map((article, idx) => (
                      <Card key={idx} className="border-border/50 hover:shadow-2xl hover:border-emerald-500/30 transition-all flex flex-col justify-between overflow-hidden group bg-background/60">
                        <div>
                          <div className="h-44 bg-emerald-950/20 flex items-center justify-center border-b border-border/30 relative overflow-hidden">
                            {article.imageUrl ? (
                              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-900/10 to-emerald-950/30">
                                <Sparkles className="w-12 h-12 text-emerald-600/35" />
                              </div>
                            )}
                            <Badge className="absolute top-3 left-3 bg-emerald-600 text-white hover:bg-emerald-700 border-none px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                              {article.category || "Advisory"}
                            </Badge>
                          </div>

                          <CardHeader className="p-5 pb-3">
                            <CardTitle className="text-lg line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                              {article.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="px-5 pb-5 text-sm text-muted-foreground line-clamp-3">
                            {article.excerpt || "Click read advisory to view the complete operational guidelines for this broadcast."}
                          </CardContent>
                        </div>

                        <div className="p-5 pt-0 border-t border-border/40 flex justify-between items-center text-xs">
                          <span className="text-muted-foreground font-medium">JATA Extension Desk</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 cursor-pointer">
                            Read Advisory
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* TAB 2: DEVELOPER OPEN DATA HUB */}
            <TabsContent value="developer" className="space-y-12 focus-visible:outline-none">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-widest uppercase">
                    <Code className="w-5 h-5" />
                    <span>REST API & Integrations</span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold">Empowering Agritech Innovators</h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    JATA shares fully anonymized, aggregates-only agricultural data streams. Agritech startups, researchers, and financial investors can leverage our open API keys to query soil mapping levels, historical yields, and weather indicators across all 27 LGAs.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-border/50 bg-background/50 flex gap-3">
                      <FileJson className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">JSON Format Payload</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Highly structured LGA soil health indexes, updated seasonal calendars, and harvest metrics.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-border/50 bg-background/50 flex gap-3">
                      <Database className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">Bulk Export CSV</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Download full datasets manually for localized ML training models and offline analyses.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                      Request API Key
                    </Button>
                    <Button variant="outline" size="lg" className="border-emerald-500/20 hover:bg-emerald-500/5">
                      Download Full Datasets
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 w-full">
                  <Card className="border-none bg-emerald-950/90 text-emerald-100 font-mono shadow-2xl overflow-hidden rounded-3xl">
                    <div className="bg-emerald-950 px-6 py-3 border-b border-emerald-900/60 flex items-center justify-between text-xs text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block" />
                        <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full inline-block" />
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block" />
                      </span>
                      <span>GET /api/soil-metrics?lga={selectedLga.toLowerCase()}</span>
                    </div>
                    <CardContent className="p-6 text-xs leading-relaxed overflow-x-auto">
                      <p className="text-emerald-400 font-bold mb-1">// Sample REST API Response</p>
                      <pre className="opacity-90">
{`{
  "status": "success",
  "data": {
    "lga": "${selectedLga}",
    "soil_analysis": {
      "pH": ${soil.ph},
      "moisture": "${soil.moisture}%",
      "npk": {
        "nitrogen": "${soil.nitrogen}",
        "phosphorus": "${soil.phosphorus}",
        "potassium": "${soil.potassium}"
      }
    },
    "recommendations": ${JSON.stringify(soil.crops)},
    "last_updated": "${new Date().toISOString().split('T')[0]}"
  }
}`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
