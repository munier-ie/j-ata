import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import jigawaLogo from "@/assets/jigawa-logo.png";

export const CommissionerSection = () => {
  return (
    <section className="py-16 bg-secondary/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="relative">
                <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl relative z-10">
                    <img 
                    src="/director jata.png" 
                    alt="Dr. Saifullahi Umar" 
                    className="w-full h-full object-cover"
                    />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-tl-3xl opacity-20 -z-0" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-br-3xl -z-0" />
                
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-background p-2 shadow-xl z-20">
                     <img src={jigawaLogo} alt="Jigawa State" className="w-full h-full object-contain" />
                </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Leadership Focus
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Empowering 1,435 Extension Agents
            </h2>
            
            <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-primary/20 transform -scale-x-100" />
                <blockquote className="text-xl text-muted-foreground leading-relaxed italic relative z-10 pl-6">
                    "Our goal is to digitally empower every extension agent to provide real-time field intelligence. JATA is transforming into a digital command center, ensuring that our agricultural transformation is backed by data and delivers real impact to our farmers."
                </blockquote>
            </div>

            <div>
                <h3 className="text-xl font-bold text-foreground">Dr. Saifullahi Umar</h3>
                <p className="text-primary font-medium">Director General JATA and Council Secretary</p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link to="/about">
                    <Button variant="governmentPrimary" className="gap-2">
                        Read JATA Mandate
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
                <Link to="/management">
                    <Button variant="outline" className="gap-2">
                        Meet the Management
                    </Button>
                </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
