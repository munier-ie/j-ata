import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const images = [
  "/gov-jigawa-1.jpg",
  "/gov-jigawa-2.jpg",
];

interface HeroCarouselProps {
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}

export function HeroCarousel({ title, subtitle, className, children }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative w-full h-[300px] md:h-[400px] overflow-hidden bg-black", className)}>
      {/* Background Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
          <img
            src={src}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up">
          {title}
        </h1>
        <p 
            className="text-lg md:text-xl opacity-90 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
        >
          {subtitle}
        </p>

        {children && (
          <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {children}
          </div>
        )}

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </div>
  );
}
