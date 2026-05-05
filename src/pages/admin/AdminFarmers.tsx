import { useEffect, useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { farmersApi, Farmer } from '@/lib/api';
import { Search, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


export default function AdminFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const data = await farmersApi.getAll();
      setFarmers(data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFarmers = useMemo(
    () => farmers.filter(farmer => 
      farmer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      farmer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      farmer.farmerId.toLowerCase().includes(search.toLowerCase()) ||
      farmer.lga.toLowerCase().includes(search.toLowerCase())
    ),
    [farmers, search]
  );

  return (
    <AdminLayout title="Registered Farmers">
      <div className="space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Farmer Registry</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search farmers..."
                  autoComplete="off"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-secondary animate-pulse rounded" />
                ))}
              </div>
            ) : filteredFarmers.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No farmers registered yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Farmer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>LGA</TableHead>
                      <TableHead>Livestock</TableHead>
                      <TableHead>Herd Size</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFarmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-mono text-sm">
                          {farmer.farmerId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {farmer.firstName} {farmer.lastName}
                        </TableCell>
                        <TableCell>{farmer.phone}</TableCell>
                        <TableCell>{farmer.lga}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {farmer.livestockTypes.slice(0, 2).map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                            {farmer.livestockTypes.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{farmer.livestockTypes.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{farmer.herdSize}</TableCell>
                        <TableCell>
                          <Badge className={farmer.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {farmer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
