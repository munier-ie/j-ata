import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-20 bg-hero-civic border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="landing-card p-8 lg:p-10 bg-primary text-primary-foreground border border-primary-dark">
            <h2 className="font-civic text-2xl sm:text-3xl font-bold mb-3">
              Register as a farmer
            </h2>
            <p className="text-primary-foreground/85 text-sm leading-relaxed mb-6">
              Join thousands of farmers on the official JATA platform. Receive your
              unique digital Farmer ID for subsidies, extension support, and market
              linkage.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="bg-background text-primary hover:bg-background/90 group rounded-sm"
              onClick={() => navigate("/farmer-registration")}
            >
              Start registration
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>

          <div className="landing-card p-8 lg:p-10 bg-card border border-border">
            <h2 className="font-civic text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Contact JATA
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Visit our headquarters in Dutse or reach the team during office hours.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>5340, Kiyawa Road, Dutse, Jigawa State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+2347700000000" className="hover:text-primary transition-colors">
                  +234 770 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:support@jata.ng"
                  className="hover:text-primary transition-colors"
                >
                  support@jata.ng
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>Mon–Fri, 8:00 AM – 4:00 PM (WAT)</span>
              </li>
            </ul>
            <Link to="/contact" className="inline-block mt-6">
              <Button variant="outline" className="rounded-sm w-full sm:w-auto">
                Send a message
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Official platform of the Jigawa Agricultural Transformation Agency (JATA)
        </p>
      </div>
    </section>
  );
}
