import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building, Pickaxe, CheckCircle2, Circle } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const ProjectPipeline = () => {
  const projects = [
    {
      id: 1,
      name: "Dutse Agro-Hub Phase 2",
      stage: "Construction",
      progress: 65,
      budget: "₦150M",
      spent: "₦95M"
    },
    {
      id: 2,
      name: "Hadejia Irrigation Network",
      stage: "Planning",
      progress: 20,
      budget: "₦300M",
      spent: "₦10M"
    },
    {
      id: 3,
      name: "Birnin Kudu Dairy Center",
      stage: "Design",
      progress: 40,
      budget: "₦80M",
      spent: "₦25M"
    },
    {
      id: 4,
      name: "Kazaure Storage Facility",
      stage: "Operational",
      progress: 100,
      budget: "₦50M",
      spent: "₦48M"
    }
  ];

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Planning': return <Circle className="h-5 w-5 text-muted-foreground" />;
      case 'Design': return <Circle className="h-5 w-5 text-blue-500" fill="currentColor" />;
      case 'Construction': return <Pickaxe className="h-5 w-5 text-amber-500" />;
      case 'Operational': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default: return <Circle className="h-5 w-5" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Planning': return 'secondary';
      case 'Design': return 'default';
      case 'Construction': return 'secondary';
      case 'Operational': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Project Management</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Project Pipeline</h1>
          <p className="text-xl text-muted-foreground">
            Track the development of state agricultural infrastructure projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStageIcon(project.stage)}
                        <span className="text-sm font-medium">{project.stage}</span>
                        <Badge variant={getStageColor(project.stage) as "secondary" | "default" | "outline"} className="text-xs">
                          {project.progress}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 md:max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Budget: <span className="font-medium text-foreground">{project.budget}</span></p>
                    <p className="text-muted-foreground">Spent: <span className="font-medium text-foreground">{project.spent}</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPipeline;
