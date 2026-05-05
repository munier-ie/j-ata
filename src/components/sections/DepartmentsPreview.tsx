import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Dna, Users, Store, FileText } from "lucide-react";

const departments = [
  {
    icon: Stethoscope,
    title: "Veterinary & Animal Health Services",
    description: "Ensuring the health and well-being of livestock through comprehensive veterinary care, disease surveillance, and preventive medicine.",
    responsibilities: [
      "Disease diagnosis, treatment, and prevention",
      "Vaccination campaigns across all LGAs",
      "Veterinary clinic management and supervision",
      "Zoonotic disease control and public health protection",
      "Emergency response for disease outbreaks"
    ]
  },
  {
    icon: Dna,
    title: "Animal Production & Breeding Systems",
    description: "Improving livestock genetics and productivity through modern breeding techniques and sustainable production practices.",
    responsibilities: [
      "Artificial insemination services",
      "Genetic improvement programs",
      "Livestock breed registry and documentation",
      "Production optimization and best practices",
      "Feed quality and nutrition management"
    ]
  },
  {
    icon: Users,
    title: "Pastoralism & Rural Livelihood Development",
    description: "Supporting pastoral communities through sustainable grazing management and livelihood diversification programs.",
    responsibilities: [
      "Ranch and grazing reserve management",
      "Herder-farmer conflict prevention and resolution",
      "Pastoral community welfare programs",
      "Rural livelihood support and training",
      "Migration route management and coordination"
    ]
  },
  {
    icon: Store,
    title: "Livestock Markets & Value Chain Development",
    description: "Strengthening livestock trade infrastructure and connecting producers to profitable market opportunities.",
    responsibilities: [
      "Livestock market development and management",
      "Value chain analysis and improvement",
      "Trade facilitation and market access",
      "Price monitoring and market information",
      "Processing and export promotion"
    ]
  },
  {
    icon: FileText,
    title: "Planning, Research & Policy Development",
    description: "Driving evidence-based policy making through research, data analysis, and strategic planning for the livestock sector.",
    responsibilities: [
      "Policy formulation and review",
      "Research coordination and partnerships",
      "Data collection and analysis",
      "Monitoring and evaluation",
      "Budget planning and resource allocation"
    ]
  }
];

export function DepartmentsPreview() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center animate-fade-up">
        Our Departments
      </h2>
      <div className="grid gap-8">
        {departments.map((dept, index) => (
          <Card 
            key={dept.title} 
            className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              <CardHeader className="bg-secondary/50 md:col-span-1">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <dept.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-display text-xl">{dept.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {dept.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="md:col-span-2 pt-6">
                <h4 className="font-semibold text-foreground mb-4">Key Responsibilities:</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {dept.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
