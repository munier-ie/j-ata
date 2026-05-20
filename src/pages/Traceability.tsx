import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sprout, Building, Warehouse, Globe } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Traceability = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Transparency</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Farm-to-Market Traceability</h1>
          <p className="text-xl text-muted-foreground">
            Track the journey of Jigawa's premium commodities from the farm to the global market.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Enter Batch ID (e.g., BTCH-2026-XYZ)" className="pl-10" />
            </div>
            <Button>Trace</Button>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-secondary -translate-x-1/2 hidden md:block"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="md:w-1/2 md:text-right">
                <h3 className="text-lg font-bold">Step 1: Collection</h3>
                <p className="text-sm text-muted-foreground">Produce collected from registered farmers in Maigatari LGA.</p>
                <Badge variant="outline" className="mt-1">Batch Created</Badge>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10">
                <Sprout className="h-6 w-6" />
              </div>
              <div className="md:w-1/2 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Maigatari Collection Center</p>
                <p><strong>Date:</strong> 2026-05-10</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="md:w-1/2 md:text-right text-sm text-muted-foreground order-2 md:order-1">
                <p><strong>Location:</strong> Gumel Processing Hub</p>
                <p><strong>Date:</strong> 2026-05-12</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10 order-1 md:order-2">
                <Building className="h-6 w-6" />
              </div>
              <div className="md:w-1/2 order-3 md:text-left">
                <h3 className="text-lg font-bold">Step 2: Processing & Grading</h3>
                <p className="text-sm text-muted-foreground">Cleaning, sorting, and grading of Sesame seeds.</p>
                <Badge variant="outline" className="mt-1">Grade A Verified</Badge>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="md:w-1/2 md:text-right">
                <h3 className="text-lg font-bold">Step 3: Warehousing</h3>
                <p className="text-sm text-muted-foreground">Stored in temperature-controlled state warehouse.</p>
                <Badge variant="outline" className="mt-1">Stocked</Badge>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10">
                <Warehouse className="h-6 w-6" />
              </div>
              <div className="md:w-1/2 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Dutse Central Warehouse</p>
                <p><strong>Date:</strong> 2026-05-14</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 md:text-right text-sm text-muted-foreground order-2 md:order-1">
                <p><strong>Destination:</strong> Port of Rotterdam</p>
                <p><strong>Status:</strong> Awaiting Loading</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10 order-1 md:order-2">
                <Globe className="h-6 w-6" />
              </div>
              <div className="md:w-1/2 order-3 md:text-left">
                <h3 className="text-lg font-bold">Step 4: Export</h3>
                <p className="text-sm text-muted-foreground">Cleared for export with phytosanitary certification.</p>
                <Badge variant="outline" className="mt-1">Export Ready</Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Traceability;
