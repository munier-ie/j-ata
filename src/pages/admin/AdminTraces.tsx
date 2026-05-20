import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, QrCode, Filter, Download } from 'lucide-react';

interface TraceBatch {
  id: string;
  product: string;
  origin: string;
  destination: string;
  status: 'Processing' | 'In Transit' | 'Exported' | 'Delivered';
  date: string;
}

const dummyBatches: TraceBatch[] = [
  { id: "BAT-2026-001", product: "Premium Sesame Seeds", origin: "Maigatari Hub", destination: "Rotterdam, Netherlands", status: "Exported", date: "2026-05-10" },
  { id: "BAT-2026-002", product: "Organic Hibiscus", origin: "Hadejia Estate", destination: "Hamburg, Germany", status: "In Transit", date: "2026-05-12" },
  { id: "BAT-2026-003", product: "Processed Cashew", origin: "Kazaure Hub", destination: "Dubai, UAE", status: "Processing", date: "2026-05-14" },
  { id: "BAT-2026-004", product: "Gum Arabic", origin: "Dutse Hub", destination: "Mumbai, India", status: "Delivered", date: "2026-05-05" },
];

export default function AdminTraces() {
  const [search, setSearch] = useState("");

  const filteredBatches = dummyBatches.filter(batch => 
    batch.id.toLowerCase().includes(search.toLowerCase()) ||
    batch.product.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exported': return 'bg-green-500/10 text-green-600';
      case 'In Transit': return 'bg-yellow-500/10 text-yellow-600';
      case 'Processing': return 'bg-blue-500/10 text-blue-600';
      case 'Delivered': return 'bg-purple-500/10 text-purple-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Export & Traceability</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,240</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Exports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">85</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">12</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Destination Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">18</p>
          </CardContent>
        </Card>
      </div>

      <Card variant="elevated">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Traceability Batches</CardTitle>
              <CardDescription>Track the journey of agricultural products from farm to export.</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search batch ID or product..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-mono font-medium">{batch.id}</TableCell>
                  <TableCell>{batch.product}</TableCell>
                  <TableCell>{batch.origin}</TableCell>
                  <TableCell>{batch.destination}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(batch.status)} variant="outline">
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.date}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <QrCode className="h-4 w-4 mr-1" /> Scan
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
