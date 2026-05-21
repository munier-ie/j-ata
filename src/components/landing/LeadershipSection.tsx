import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function LeadershipSection() {
  return (
    <section className="py-16 lg:py-20 bg-hero-civic border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="mx-auto lg:mx-0 w-full max-w-[200px]">
            <div className="landing-card overflow-hidden border border-border aspect-[3/4]">
              <img
                src="/director jata.png"
                alt="Dr. Saifullahi Umar, Director General JATA"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Leadership message
            </span>

            <hr className="border-border w-16 mx-auto lg:mx-0" />

            <blockquote className="font-civic text-xl sm:text-2xl text-foreground leading-relaxed">
              &ldquo;Our goal is to digitally empower every extension agent to provide
              real-time field intelligence. JATA is transforming into a digital command
              center, ensuring that our agricultural transformation is backed by data and
              delivers real impact to our farmers.&rdquo;
            </blockquote>

            <div className="pt-2">
              <p className="font-semibold text-foreground">Dr. Saifullahi Umar</p>
              <p className="text-sm text-primary font-medium">
                Director General, JATA — Council Secretary
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              <Link to="/about">
                <Button variant="governmentPrimary" size="sm" className="gap-2 rounded-sm">
                  Read JATA Mandate
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/management">
                <Button variant="outline" size="sm" className="rounded-sm">
                  Meet the Management
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
