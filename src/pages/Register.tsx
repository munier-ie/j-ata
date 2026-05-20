import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Rocket, DollarSign, UserCheck, ArrowRight, Check } from "lucide-react";

const roles = [
  {
    id: "farmer",
    title: "Normal Farmer",
    description: "Register as a farmer to access inputs, mapping, and support.",
    icon: User,
    path: "/farmer-registration",
    color: "bg-green-500/10 text-green-600",
    hoverColor: "hover:border-green-500/50"
  },
  {
    id: "startup",
    title: "AgTech Startup",
    description: "Apply for the incubation program and access grants.",
    icon: Rocket,
    path: "/startup/apply",
    color: "bg-blue-500/10 text-blue-600",
    hoverColor: "hover:border-blue-500/50"
  },
  {
    id: "investor",
    title: "Private Investor",
    description: "Explore investment opportunities and PPP projects.",
    icon: DollarSign,
    path: "/investor/dashboard",
    color: "bg-amber-500/10 text-amber-600",
    hoverColor: "hover:border-amber-500/50"
  },
  {
    id: "mentor",
    title: "Expert Mentor",
    description: "Share your expertise and guide agricultural startups.",
    icon: UserCheck,
    path: "/mentor",
    color: "bg-purple-500/10 text-purple-600",
    hoverColor: "hover:border-purple-500/50"
  }
];

export default function Register() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setStatus({
      farmer: localStorage.getItem('farmer_registered') === 'true',
      startup: localStorage.getItem('startup_applied') === 'true',
      investor: localStorage.getItem('investor_registered') === 'true',
      mentor: localStorage.getItem('mentor_registered') === 'true',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Join the Jigawa AgriTech Ecosystem
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your role to register and access specialized tools and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className={`cursor-pointer border-2 transition-all duration-300 ${role.hoverColor} hover:shadow-lg`}
              onClick={() => navigate(role.path)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.color}`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                    {status[role.id] && (
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="h-3 w-3" /> Registered
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-sm mt-1">{role.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
