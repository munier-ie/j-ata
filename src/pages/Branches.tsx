import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, ChevronRight, User } from "lucide-react";
import { useState, useMemo } from "react";
import jigawaLogo from "@/assets/jigawa-logo.png";

// Full list of 27 Jigawa LGAs with curated AI-generated authentic portraits
// Using high-quality AI generated images of Northern Nigerian men (Babban Riga/Caps) and women (Hijab)
const branchesData = [
  { name: "Auyo", head: "Dr. Ibrahim Auyo", phone: "+234 800 001 0001", email: "auyo@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" }, // Man in cap
  { name: "Babura", head: "Alh. Sani Babura", phone: "+234 800 002 0001", email: "babura@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" }, // Distinguished man
  { name: "Biriniwa", head: "Hajiya Fatima Biriniwa", phone: "+234 800 003 0001", email: "biriniwa@jigawa-livestock.gov.ng", image: "/images/hausa_woman_1.png" }, // Woman in hijab
  { name: "Birnin Kudu", head: "Dr. Yusuf Kudu", phone: "+234 800 004 0001", email: "birninkudu@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" }, 
  { name: "Buji", head: "Mr. Ahmed Buji", phone: "+234 800 005 0001", email: "buji@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Dutse", head: "Dr. Aminu Kano", phone: "+234 800 006 0001", email: "dutse@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Gagarawa", head: "Alh. Musa Gagarawa", phone: "+234 800 007 0001", email: "gagarawa@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Garki", head: "Mrs. Zainab Garki", phone: "+234 800 008 0001", email: "garki@jigawa-livestock.gov.ng", image: "/images/hausa_woman_2.png" }, // Woman in hijab
  { name: "Gumel", head: "Dr. Ibrahim Sani", phone: "+234 800 009 0001", email: "gumel@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Guri", head: "Alh. Bello Guri", phone: "+234 800 010 0001", email: "guri@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Gwaram", head: "Mr. Yakubu Gwaram", phone: "+234 800 011 0001", email: "gwaram@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Gwiwa", head: "Dr. Hassan Gwiwa", phone: "+234 800 012 0001", email: "gwiwa@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Hadejia", head: "Hajiya Fatima Bichi", phone: "+234 800 013 0001", email: "hadejia@jigawa-livestock.gov.ng", image: "/images/hausa_woman_1.png" },
  { name: "Jahun", head: "Alh. Kabiru Jahun", phone: "+234 800 014 0001", email: "jahun@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Kafin Hausa", head: "Mr. Usman Kafin", phone: "+234 800 015 0001", email: "kafinhausa@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Kaugama", head: "Dr. Ali Kaugama", phone: "+234 800 016 0001", email: "kaugama@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Kazaure", head: "Dr. Yusuf Bala", phone: "+234 800 017 0001", email: "kazaure@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Kiri Kasama", head: "Alh. Dauda Kiri", phone: "+234 800 018 0001", email: "kirikasama@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Kiyawa", head: "Mrs. Halima Kiyawa", phone: "+234 800 019 0001", email: "kiyawa@jigawa-livestock.gov.ng", image: "/images/hausa_woman_2.png" },
  { name: "Maigatari", head: "Mr. Sadiq Maigatari", phone: "+234 800 020 0001", email: "maigatari@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Malam Madori", head: "Dr. Umar Madori", phone: "+234 800 021 0001", email: "malammadori@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Miga", head: "Alh. Abubakar Miga", phone: "+234 800 022 0001", email: "miga@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Ringim", head: "Alh. Musa Daura", phone: "+234 800 023 0001", email: "ringim@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Roni", head: "Mr. Haruna Roni", phone: "+234 800 024 0001", email: "roni@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Sule Tankarkar", head: "Dr. Idris Sule", phone: "+234 800 025 0001", email: "suletankarkar@jigawa-livestock.gov.ng", image: "/images/hausa_man_1.png" },
  { name: "Taura", head: "Alh. Bashir Taura", phone: "+234 800 026 0001", email: "taura@jigawa-livestock.gov.ng", image: "/images/hausa_man_2.png" },
  { name: "Yankwashi", head: "Mrs. Maryam Yankwashi", phone: "+234 800 027 0001", email: "yankwashi@jigawa-livestock.gov.ng", image: "/images/hausa_woman_1.png" }
];

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize filtered results to avoid unnecessary recomputation
  const filteredBranches = useMemo(
    () => branchesData.filter(branch => 
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.head.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        
        {/* Header Section including Search */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary tracking-wide uppercase text-xs font-semibold">
                Network Coverage
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Branch Directory
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Connecting all 27 Local Government Areas of Jigawa State.
              </p>
            </div>

             <div className="w-full md:w-auto relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search branches..." 
                  autoComplete="off"
                  className="pl-10 w-full md:w-80 bg-secondary/30 focus-visible:ring-primary/20 border-border/60 transition-all hover:bg-secondary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </section>

        {/* Branches Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <Card 
                key={branch.name} 
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    {/* Left side - Text content */}
                    <div className="flex-1 space-y-3">
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                        {branch.name} LGA
                      </Badge>
                      
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {branch.head}
                      </h3>
                      
                      <a 
                        href={`tel:${branch.phone}`} 
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{branch.phone}</span>
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:underline p-0 h-auto font-medium inline-flex items-center gap-1 mt-2"
                      >
                        View Office
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    {/* Right side - Circular Image with Badge */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105 shadow-md">
                        <img 
                          src={branch.image} 
                          alt={branch.head}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Floating Badge Overlay - Jigawa Logo */}
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-background rounded-full border-2 border-primary shadow-lg flex items-center justify-center p-1.5">
                        <img src={jigawaLogo} alt="Jigawa Seal" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBranches.length === 0 && (
             <div className="text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No branches found matching "{searchTerm}"</p>
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

export default Branches;
