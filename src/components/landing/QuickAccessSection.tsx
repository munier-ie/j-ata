import { Link } from "react-router-dom";
import {
  UserPlus,
  Smartphone,
  Briefcase,
  Scale,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  {
    label: "Farmer Register",
    href: "/farmer-registration",
    icon: UserPlus,
  },
  {
    label: "Extension",
    href: "/extension",
    icon: Smartphone,
  },
  {
    label: "Investors",
    href: "/investors",
    icon: Briefcase,
  },
  {
    label: "Transparency",
    href: "/transparency",
    icon: Scale,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export function QuickAccessSection() {
  return (
    <section
      className="border-b border-border bg-card"
      aria-label="Quick access services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "snap-start shrink-0 flex items-center gap-3 min-w-[160px] md:min-w-0",
                "landing-card px-4 py-3 border border-border bg-background",
                "hover:border-primary/40 hover:bg-secondary/50 transition-colors"
              )}
            >
              <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
