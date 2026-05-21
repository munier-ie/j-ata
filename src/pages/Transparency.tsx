import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Stethoscope, 
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Zap,
  Droplets,
  MapPin
} from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

type FacilityStatus = 'planned' | 'under_construction' | 'operational' | 'rehabilitated';

const statusConfig: Record<FacilityStatus, { label: string; color: string; icon: React.ElementType }> = {
  planned: { label: 'Planned', color: 'bg-gray-100 text-gray-800', icon: Clock },
  under_construction: { label: 'Under Construction', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
  operational: { label: 'Operational', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  rehabilitated: { label: 'Rehabilitated', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 }
};

const formatCurrency = (amount: number | null) => {
  if (!amount) return '₦0';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Transparency = () => {
  const { data: clinics, isLoading: clinicsLoading } = useQuery({
    queryKey: ['veterinary-clinics'],
    queryFn: async () => {
      const response = await fetch('/api/transparency/clinics');
      if (!response.ok) {
        throw new Error('Failed to fetch clinics');
      }
      return response.json();
    }
  });

  const { data: ranches, isLoading: ranchesLoading } = useQuery({
    queryKey: ['ranches'],
    queryFn: async () => {
      const response = await fetch('/api/transparency/ranches');
      if (!response.ok) {
        throw new Error('Failed to fetch ranches');
      }
      return response.json();
    }
  });

  // Calculate statistics
  const clinicStats = clinics ? {
    total: clinics.length,
    operational: clinics.filter(c => c.status === 'operational').length,
    underConstruction: clinics.filter(c => c.status === 'under_construction').length,
    planned: clinics.filter(c => c.status === 'planned').length,
    rehabilitated: clinics.filter(c => c.status === 'rehabilitated').length,
    totalBudget: clinics.reduce((sum, c) => sum + (Number(c.budget_allocated) || 0), 0),
    totalSpent: clinics.reduce((sum, c) => sum + (Number(c.budget_spent) || 0), 0)
  } : null;

  const ranchStats = ranches ? {
    total: ranches.length,
    operational: ranches.filter(r => r.status === 'operational').length,
    underConstruction: ranches.filter(r => r.status === 'under_construction').length,
    planned: ranches.filter(r => r.status === 'planned').length,
    rehabilitated: ranches.filter(r => r.status === 'rehabilitated').length,
    totalBudget: ranches.reduce((sum, r) => sum + (Number(r.budget_allocated) || 0), 0),
    totalSpent: ranches.reduce((sum, r) => sum + (Number(r.budget_spent) || 0), 0),
    totalHectares: ranches.reduce((sum, r) => sum + (Number(r.total_hectares) || 0), 0)
  } : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <HeroCarousel 
          title="Transparency Portal"
          subtitle="Track our investments, monitor project progress, and hold us accountable. Your right to know how public funds are being utilized."
        >
          <Link to="/map" className="inline-block">
            <Button variant="secondary" className="gap-2 text-primary-foreground bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
              View Interactive Map
            </Button>
          </Link>
        </HeroCarousel>

        {/* Summary Statistics */}
        <section className="container mx-auto px-4 -mt-8">
          <div className="grid md:grid-cols-4 gap-4">
            {clinicsLoading || ranchesLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))
            ) : (
              <>
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-3xl font-bold text-foreground">{clinicStats?.total || 0}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Veterinary Clinics</p>
                    <p className="text-xs text-primary mt-1">{clinicStats?.operational || 0} Operational</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-3xl font-bold text-foreground">{ranchStats?.total || 0}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Ranches</p>
                    <p className="text-xs text-primary mt-1">{ranchStats?.totalHectares?.toLocaleString() || 0} Hectares</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xl font-bold text-foreground">
                        {formatCurrency((clinicStats?.totalBudget || 0) + (ranchStats?.totalBudget || 0))}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xl font-bold text-foreground">
                        {formatCurrency((clinicStats?.totalSpent || 0) + (ranchStats?.totalSpent || 0))}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Amount Utilized</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </section>

        {/* Detailed View */}
        <section className="container mx-auto px-4 py-12">
          <Tabs defaultValue="clinics" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="clinics" className="gap-2">
                <Stethoscope className="w-4 h-4" />
                Veterinary Clinics
              </TabsTrigger>
              <TabsTrigger value="ranches" className="gap-2">
                <Building2 className="w-4 h-4" />
                Ranches
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clinics">
              {clinicsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-xl" />
                  ))}
                </div>
              ) : clinics && clinics.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinics.map((clinic, index) => {
                    const status = clinic.status as FacilityStatus;
                    const StatusIcon = statusConfig[status]?.icon || Clock;
                    return (
                      <Card 
                        key={clinic.id} 
                        className="border-border/50 hover:shadow-md transition-shadow animate-fade-up"
                        style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-base font-semibold line-clamp-2">
                                {clinic.name}
                              </CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {clinic.lga} LGA • {clinic.zone || 'N/A'}
                              </CardDescription>
                            </div>
                            <Badge className={`${statusConfig[status]?.color || 'bg-gray-100'} text-xs flex-shrink-0`}>
                              {statusConfig[status]?.label || clinic.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Completion</span>
                                <span className="font-medium">{clinic.completion_percentage}%</span>
                              </div>
                              <Progress value={clinic.completion_percentage || 0} className="h-2" />
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs">
                              <div className={`flex items-center gap-1 ${clinic.has_power ? 'text-green-600' : 'text-muted-foreground'}`}>
                                <Zap className="w-3 h-3" />
                                Power
                              </div>
                              <div className={`flex items-center gap-1 ${clinic.has_water ? 'text-blue-600' : 'text-muted-foreground'}`}>
                                <Droplets className="w-3 h-3" />
                                Water
                              </div>
                            </div>

                            <div className="pt-2 border-t border-border text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Budget:</span>
                                <span className="font-medium">{formatCurrency(Number(clinic.budget_allocated))}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-muted-foreground">Spent:</span>
                                <span className="text-primary font-medium">{formatCurrency(Number(clinic.budget_spent))}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">No clinic data available.</p>
              )}
            </TabsContent>

            <TabsContent value="ranches">
              {ranchesLoading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-72 rounded-xl" />
                  ))}
                </div>
              ) : ranches && ranches.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {ranches.map((ranch, index) => {
                    const status = ranch.status as FacilityStatus;
                    return (
                      <Card 
                        key={ranch.id} 
                        className="border-border/50 hover:shadow-md transition-shadow animate-fade-up"
                        style={{ animationDelay: `${Math.min(index * 0.1, 0.5)}s` }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="font-display text-xl">{ranch.name}</CardTitle>
                              <CardDescription className="text-sm mt-1">
                                {ranch.lga} LGA • {ranch.zone || 'N/A'}
                              </CardDescription>
                            </div>
                            <Badge className={statusConfig[status]?.color || 'bg-gray-100'}>
                              {statusConfig[status]?.label || ranch.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-secondary/50 rounded-lg p-3">
                                <p className="text-muted-foreground text-xs">Total Area</p>
                                <p className="font-semibold">{Number(ranch.total_hectares)?.toLocaleString()} Ha</p>
                              </div>
                              <div className="bg-secondary/50 rounded-lg p-3">
                                <p className="text-muted-foreground text-xs">Cattle Capacity</p>
                                <p className="font-semibold">{ranch.capacity_cattle?.toLocaleString()}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground mb-2">Facilities:</p>
                              <div className="flex flex-wrap gap-2">
                                {ranch.has_feed_facilities && <Badge variant="outline" className="text-xs">Feed Plant</Badge>}
                                {ranch.has_school && <Badge variant="outline" className="text-xs">School</Badge>}
                                {ranch.has_health_center && <Badge variant="outline" className="text-xs">Health Center</Badge>}
                                {ranch.has_veterinary_clinic && <Badge variant="outline" className="text-xs">Vet Clinic</Badge>}
                                {ranch.has_power && <Badge variant="outline" className="text-xs">Power</Badge>}
                                {ranch.has_water && <Badge variant="outline" className="text-xs">Water</Badge>}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Completion Progress</span>
                                <span className="font-semibold">{ranch.completion_percentage}%</span>
                              </div>
                              <Progress value={ranch.completion_percentage || 0} className="h-2" />
                            </div>

                            <div className="pt-3 border-t border-border grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground">Budget Allocated</p>
                                <p className="font-semibold">{formatCurrency(Number(ranch.budget_allocated))}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Amount Spent</p>
                                <p className="font-semibold text-primary">{formatCurrency(Number(ranch.budget_spent))}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">No ranch data available.</p>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transparency;