import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, 
  Lightbulb, 
  Warehouse, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Droplets,
  Filter,
  Truck
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FacilityStatus = 'planned' | 'under_construction' | 'operational' | 'rehabilitated';
type FacilityType = 'innovation_hub' | 'service_center' | 'farm_estate';

const statusConfig: Record<FacilityStatus, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  planned: { label: 'Planned', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Clock },
  under_construction: { label: 'Under Construction', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: AlertCircle },
  operational: { label: 'Operational', color: 'text-green-600', bgColor: 'bg-green-100', icon: CheckCircle2 },
  rehabilitated: { label: 'Rehabilitated', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: CheckCircle2 }
};

const facilityTypeLabels: Record<FacilityType, string> = {
  innovation_hub: 'Innovation Hub',
  service_center: 'Agro Service Center',
  farm_estate: 'Farm Estate'
};

interface AgriculturalHub {
  id: string;
  name: string;
  lga: string;
  zone: string;
  status: FacilityStatus;
  facility_type: string;
  total_hectares: number;
  has_power: boolean;
  has_water: boolean;
  completion_percentage: number;
  latitude: number;
  longitude: number;
}

interface FarmEstate {
  id: string;
  name: string;
  lga: string;
  zone: string;
  status: FacilityStatus;
  total_hectares: number;
  has_power: boolean;
  has_water: boolean;
  has_access_road: boolean;
  completion_percentage: number;
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  const { data: hubs, isLoading: hubsLoading } = useQuery({
    queryKey: ['map-hubs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('innovation_hubs' as never)
        .select('*')
        .order('facility_type', { ascending: false })
        .order('name');
      
      if (error) throw error;
      return data as unknown as AgriculturalHub[];
    }
  });

  const { data: estates, isLoading: estatesLoading } = useQuery({
    queryKey: ['map-estates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farm_estates' as never)
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as unknown as FarmEstate[];
    }
  });

  // Get unique zones
  const hubsArray = hubs || [];
  const estatesArray = estates || [];

  const zones = [...new Set([
    ...hubsArray.map(c => c.zone).filter(Boolean),
    ...estatesArray.map(r => r.zone).filter(Boolean)
  ])].sort();

  // Filter facilities
  const filteredHubs = hubs?.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (zoneFilter !== 'all' && c.zone !== zoneFilter) return false;
    return true;
  });

  const filteredEstates = estates?.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (zoneFilter !== 'all' && r.zone !== zoneFilter) return false;
    return true;
  });

  // Group hubs by type
  const mainHubs = filteredHubs?.filter(c => c.facility_type === 'innovation_hub') || [];
  const serviceCenters = filteredHubs?.filter(c => c.facility_type === 'service_center') || [];

  const isLoading = hubsLoading || estatesLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8" />
              <h1 className="font-display text-3xl md:text-4xl font-bold animate-fade-up">
                J-ATA Interactive Map
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Explore our Agribusiness Innovation Hubs and Mechanized Farm Estates across Jigawa State.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 py-6">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="under_construction">Under Construction</SelectItem>
                    <SelectItem value="rehabilitated">Rehabilitated</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={zoneFilter} onValueChange={setZoneFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    {zones.map(zone => (
                      <SelectItem key={zone} value={zone as string}>{zone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legend */}
        <section className="container mx-auto px-4 pb-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.bgColor}`}></div>
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-6">
          <Tabs defaultValue="hubs" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="hubs" className="gap-2">
                <Lightbulb className="w-4 h-4" />
                Innovation Hubs ({filteredHubs?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="estates" className="gap-2">
                <Warehouse className="w-4 h-4" />
                Farm Estates ({filteredEstates?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hubs">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Innovation Hubs */}
                  {mainHubs.length > 0 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        Agribusiness Innovation Hubs ({mainHubs.length})
                      </h3>
                      <div className="grid gap-4">
                        {mainHubs.map(hub => (
                          <FacilityCard key={hub.id} facility={hub} type="hub" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Service Centers */}
                  {serviceCenters.length > 0 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        Agro Service Centers ({serviceCenters.length})
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {serviceCenters.map(hub => (
                          <FacilityCard key={hub.id} facility={hub} type="hub" />
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredHubs?.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">No hubs match the selected filters.</p>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="estates">
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                  ))}
                </div>
              ) : filteredEstates && filteredEstates.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEstates.map(estate => (
                    <FacilityCard key={estate.id} facility={estate} type="estate" />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">No estates match the selected filters.</p>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface FacilityCardProps {
  facility: AgriculturalHub | FarmEstate;
  type: 'hub' | 'estate';
  compact?: boolean;
}

const isHub = (f: AgriculturalHub | FarmEstate): f is AgriculturalHub => 'facility_type' in f;
const isEstate = (f: AgriculturalHub | FarmEstate): f is FarmEstate => 'has_access_road' in f;

const FacilityCard = ({ facility, type }: FacilityCardProps) => {
  const status = facility.status as FacilityStatus;
  const StatusIcon = statusConfig[status]?.icon || Clock;

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${statusConfig[status]?.bgColor} flex items-center justify-center flex-shrink-0`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig[status]?.color}`} />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{facility.name}</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                {facility.lga} LGA • {facility.zone || 'N/A'}
                {isHub(facility) && facility.facility_type && (
                  <span className="ml-1">• {facilityTypeLabels[facility.facility_type as FacilityType]}</span>
                )}
              </CardDescription>
            </div>
          </div>
          <Badge className={`${statusConfig[status]?.bgColor} ${statusConfig[status]?.color} text-xs`}>
            {statusConfig[status]?.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-secondary/50 rounded-lg p-2">
              <p className="text-[10px] text-muted-foreground">Area</p>
              <p className="font-semibold text-sm">{Number(facility.total_hectares)?.toLocaleString()} Ha</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-2">
              <p className="text-[10px] text-muted-foreground">Status</p>
              <p className="font-semibold text-sm capitalize">{facility.status.replace('_', ' ')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 ${facility.has_power ? 'text-green-600' : 'text-muted-foreground'}`}>
                <Zap className="w-3 h-3" />
                Power
              </div>
              <div className={`flex items-center gap-1 ${facility.has_water ? 'text-blue-600' : 'text-muted-foreground'}`}>
                <Droplets className="w-3 h-3" />
                Water
              </div>
              {isEstate(facility) && (
                <div className={`flex items-center gap-1 ${facility.has_access_road ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Truck className="w-3 h-3" />
                  Roads
                </div>
              )}
            </div>
            <span className="font-semibold">{facility.completion_percentage}% Complete</span>
          </div>

          {facility.latitude && facility.longitude && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {Number(facility.latitude).toFixed(4)}°N, {Number(facility.longitude).toFixed(4)}°E
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;