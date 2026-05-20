import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Globe, ShieldCheck, Truck, ClipboardCheck, ScanLine, Plus } from "lucide-react";

const ExportPortal = () => {
  // Simulation State
  const [batches, setBatches] = useState([
    { id: "BAT-001", commodity: "Sesame", weight: "500kg", origin: "Maigatari", status: "Collected", fee: "₦5,000" },
    { id: "BAT-002", commodity: "Hibiscus", weight: "200kg", origin: "Kazaure", status: "Processed", fee: "₦2,000" },
  ]);

  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      const newBatch = {
        id: `BAT-00${batches.length + 1}`,
        commodity: "Sesame",
        weight: "100kg",
        origin: "Hadejia",
        status: "Collected",
        fee: "₦1,000"
      };
      setBatches([...batches, newBatch]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Export Development & Traceability
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Boosting international market access and trust for Jigawa's premium commodities: Hibiscus, Sesame, and Gum Arabic.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" onClick={simulateScan} disabled={scanning}>
              {scanning ? "Scanning..." : "Simulate Scan (Trace Batch)"}
            </Button>
            <Button size="lg" variant="outline">Apply for Certification</Button>
          </div>
        </div>

        {/* Simulation Section: Active Batches */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Active Traceability Batches</h2>
          <div className="grid grid-cols-1 gap-4">
            {batches.map((batch) => (
              <Card key={batch.id}>
                <CardContent className="flex justify-between items-center py-4">
                  <div>
                    <p className="font-bold">{batch.id} - {batch.commodity}</p>
                    <p className="text-sm text-muted-foreground">Origin: {batch.origin} | Weight: {batch.weight}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {batch.status}
                    </span>
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Plus className="h-4 w-4" /> Pay Levy ({batch.fee})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Farm-to-Market Tracking */}
          <Card>
            <CardHeader>
              <ScanLine className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Farm-to-Market Tracking</CardTitle>
              <CardDescription>
                Complete traceability from smallholder farms to international ports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate and scan QR codes for produce bags to prove origin and maintain a transparent chain of custody.
              </p>
            </CardContent>
          </Card>

          {/* Quality Certification */}
          <Card>
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Quality Certification</CardTitle>
              <CardDescription>
                Digital records of laboratory tests and phytosanitary certificates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access tamper-proof digital certificates for moisture content, purity, and safety compliance.
              </p>
            </CardContent>
          </Card>

          {/* Export Compliance */}
          <Card>
            <CardHeader>
              <ClipboardCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Export Compliance</CardTitle>
              <CardDescription>
                Country-specific checklists and regulatory guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay updated with requirements for EU, US, and Asian markets to avoid rejections.
              </p>
            </CardContent>
          </Card>

          {/* Warehouse Tracking */}
          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Digital Warehouse Tracking</CardTitle>
              <CardDescription>
                Real-time inventory of certified export warehouses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor stock levels and grades of commodities waiting for export.
              </p>
            </CardContent>
          </Card>

          {/* Grading System */}
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Commodity Grading System</CardTitle>
              <CardDescription>
                Standardized quality assessment for fair pricing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ensuring Jigawa commodities meet international Grade A standards.
              </p>
            </CardContent>
          </Card>

          {/* Market Access */}
          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Global Market Access</CardTitle>
              <CardDescription>
                Connecting Jigawa exporters with global buyers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Leveraging trust built through traceability to access premium markets.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportPortal;
