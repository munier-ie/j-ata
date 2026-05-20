import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Warehouse, Package, AlertTriangle } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const WarehouseTracking = () => {
  const warehouses = [
    { id: 1, name: "Dutse Central Warehouse", commodity: "Sesame", capacity: 5000, current: 3500 },
    { id: 2, name: "Maigatari Border Store", commodity: "Hibiscus", capacity: 3000, current: 2800 },
    { id: 3, name: "Gumel Hub Storage", commodity: "Gum Arabic", capacity: 2000, current: 500 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Logistics & Storage</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Digital Warehouse Tracking</h1>
          <p className="text-xl text-muted-foreground">
            Monitor real-time inventory levels across state-owned storage facilities.
          </p>
        </div>

        {/* Warehouse Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {warehouses.map((wh) => {
            const percentage = Math.round((wh.current / wh.capacity) * 100);
            const isCritical = percentage > 85;

            return (
              <Card key={wh.id} className={isCritical ? 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Warehouse className={`h-5 w-5 ${isCritical ? 'text-amber-500' : 'text-primary'}`} />
                    {isCritical && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs flex gap-1 items-center">
                        <AlertTriangle className="h-3 w-3" /> Near Capacity
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-2">{wh.name}</CardTitle>
                  <CardDescription>{wh.commodity}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Space Used</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Current: <strong>{wh.current} Tons</strong></span>
                    <span>Max: <strong>{wh.capacity} Tons</strong></span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Inventory Ledger */}
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Stock Ledger
            </CardTitle>
            <CardDescription>Detailed breakdown of stored commodities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Commodity</TableHead>
                  <TableHead className="text-right">Current Stock</TableHead>
                  <TableHead className="text-right">Available Space</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouses.map((wh) => (
                  <TableRow key={wh.id}>
                    <TableCell className="font-medium">{wh.name}</TableCell>
                    <TableCell>{wh.commodity}</TableCell>
                    <TableCell className="text-right font-medium">{wh.current} Tons</TableCell>
                    <TableCell className="text-right">{wh.capacity - wh.current} Tons</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={wh.current / wh.capacity > 0.85 ? 'outline' : 'default'}>
                        {wh.current / wh.capacity > 0.85 ? 'Full' : 'Available'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default WarehouseTracking;
