import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function CTASection() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContactMinistry = () => {
    toast({
      title: "Contact J-ATA",
      description: "Call us at +234 770 000 0000 or email info@jata.jigawastate.gov.ng",
    });
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border-2 border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-primary-foreground rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-primary-foreground rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Agricultural Governance?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers already benefiting from digital agricultural management. 
            Register today and get your unique Farmer ID.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              className="bg-background text-primary hover:bg-background/90 group"
              onClick={() => navigate("/farmer-registration")}
            >
              Register as Farmer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={handleContactMinistry}
            >
              <Phone className="w-5 h-5" />
              Contact J-ATA
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60 mb-4">
              Official Platform of
            </p>
            <p className="font-display text-lg text-primary-foreground">
              Jigawa Agricultural Transformation Agency (J-ATA), Jigawa State
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
