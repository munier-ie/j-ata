import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import jigawaLogo from "@/assets/jigawa-logo.png";

const governorData = {
  role: "His Excellency, The Executive Governor",
  name: "Mallam Umar Namadi",
  ministry: "Jigawa State Government",
  image: "/govt.jpg",
  quote: "Transforming Jigawa's agrarian economy through digital innovation and empowering our rural communities for sustainable agricultural development."
};

export function HeroSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Create_video_with_images_202605150917.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-background">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Official JATA Platform</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Jigawa Agricultural <br />
                <span className="text-primary">Transformation Agency</span> <br />
                (JATA)
              </h1>
              
              <p className="text-lg text-background/80 max-w-xl leading-relaxed">
                Empowering the 1,435 extension agents to digitally support our farmers. 
                Modernizing the value chain through smart extension and data-driven agribusiness.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="governmentPrimary" 
                size="lg" 
                className="group"
                onClick={() => navigate("/farmer-registration")}
              >
                Access Farmer Database
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-background/10">
              <div>
                <p className="text-3xl font-display font-bold text-primary">1,435</p>
                <p className="text-sm text-background/60">Extension Agents</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">500K+</p>
                <p className="text-sm text-background/60">Farmers Supported</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary">5</p>
                <p className="text-sm text-background/60">Innovation Hubs</p>
              </div>
            </div>
          </div>

          {/* Carousel Card */}
          <div className="relative">
            <div className="bg-background/10 backdrop-blur-md rounded-2xl p-10 border border-background/20 shadow-2xl transition-all duration-500 flex flex-col justify-center">
              <div className="flex items-center gap-8 flex-1">
                 {/* Info (Left) */}
                <div className="flex-1 space-y-6 text-left">
                   <div className="space-y-2">
                      <p className="text-sm text-primary font-medium uppercase tracking-wider">
                        {governorData.role}
                      </p>
                      <h3 className="font-display text-3xl font-bold text-background leading-tight">
                        {governorData.name}
                      </h3>
                      <p className="text-sm text-background/60">{governorData.ministry}</p>
                   </div>
                   <blockquote className="text-background/80 italic text-base leading-relaxed border-l-4 border-primary pl-4">
                     "{governorData.quote}"
                   </blockquote>
                </div>

                {/* Image (Right) */}
                <div className="relative flex-shrink-0">
                  <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-primary shadow-lg">
                    <img 
                      src={governorData.image}
                      alt={governorData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                   <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-xl bg-background overflow-hidden shadow-md p-1">
                    <img src={jigawaLogo} alt="Jigawa Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
