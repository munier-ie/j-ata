import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Phone, ChevronRight, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import jigawaLogo from "@/assets/jigawa-logo.png";

const estatesData = [
  { name: "Auyo", head: "Ibrahim Auyo", phone: "+234 800 001 0001", email: "auyo@jata.ng", image: "/images/hausa_man_1.png", type: "Irrigation Cluster" },
  { name: "Babura", head: "Sani Babura", phone: "+234 800 002 0001", email: "babura@jata.ng", image: "/images/hausa_man_2.png", type: "Farm Estate" },
  { name: "Biriniwa", head: "Fatima Biriniwa", phone: "+234 800 003 0001", email: "biriniwa@jata.ng", image: "/images/hausa_woman_1.png", type: "Processing Zone" },
  { name: "Birnin Kudu", head: "Yusuf Kudu", phone: "+234 800 004 0001", email: "birninkudu@jata.ng", image: "/images/hausa_man_1.png", type: "Farm Estate" },
  { name: "Dutse", head: "Aminu Kano", phone: "+234 800 006 0001", email: "dutse@jata.ng", image: "/images/hausa_man_1.png", type: "Innovation Hub" },
  { name: "Gumel", head: "Ibrahim Sani", phone: "+234 800 009 0001", email: "gumel@jata.ng", image: "/images/hausa_man_1.png", type: "Farm Estate" },
  { name: "Hadejia", head: "Fatima Bichi", phone: "+234 800 013 0001", email: "hadejia@jata.ng", image: "/images/hausa_woman_1.png", type: "Irrigation Cluster" },
  { name: "Kazaure", head: "Yusuf Bala", phone: "+234 800 017 0001", email: "kazaure@jata.ng", image: "/images/hausa_man_2.png", type: "Farm Estate" },
  { name: "Ringim", head: "Musa Daura", phone: "+234 800 023 0001", email: "ringim@jata.ng", image: "/images/hausa_man_1.png", type: "Farm Estate" },
];

const FarmEstates = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEstates = useMemo(
    () => estatesData.filter(estate => 
      estate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estate.head.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary tracking-wide uppercase text-xs font-semibold">
                Agricultural Footprint
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Farm Estates & Clusters
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Directory of J-ATA managed agricultural assets across Jigawa State.
              </p>
            </div>

             <div className="w-full md:w-auto relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search estates..." 
                  autoComplete="off"
                  className="pl-10 w-full md:w-80 bg-secondary/30 focus-visible:ring-primary/20 border-border/60 transition-all hover:bg-secondary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEstates.map((estate) => (
              <Card 
                key={estate.name} 
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                          {estate.name}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] uppercase">
                          {estate.type}
                        </Badge>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {estate.head}
                      </h3>
                      <p className="text-xs text-muted-foreground italic">Estate Manager</p>
                      
                      <a 
                        href={`tel:${estate.phone}`} 
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{estate.phone}</span>
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:underline p-0 h-auto font-medium inline-flex items-center gap-1 mt-2"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    <div className="flex-shrink-0 relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105 shadow-md">
                        <img 
                          src={estate.image} 
                          alt={estate.head}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-background rounded-full border-2 border-primary shadow-lg flex items-center justify-center p-1.5">
                        <img src={jigawaLogo} alt="Jigawa Seal" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEstates.length === 0 && (
             <div className="text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No estates found matching "{searchTerm}"</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-primary"
                >
                  Clear Search
                </Button>
             </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FarmEstates;
