import { MapPin, Building2, Users } from "lucide-react";
import { JigawaStateMap } from "@/components/landing/JigawaStateMap";

const mapStats = [
  { icon: MapPin, value: "27", label: "LGAs covered" },
  { icon: Building2, value: "5", label: "Innovation hubs" },
  { icon: Users, value: "10,000+", label: "Registered farmers" },
];

export function ImpactMapSection() {
  return (
    <section className="py-16 lg:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Statewide presence
            </span>
            <h2 className="font-civic text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-3">
              Jigawa State map
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mb-6">
              This map shows Jigawa State only — all 27 local government areas and
              JATA facility locations. No national or neighbouring state basemap.
            </p>

            <div className="landing-card border border-border overflow-hidden h-[340px] sm:h-[430px] lg:h-[480px] relative bg-[hsl(142_20%_96%)]">
              <JigawaStateMap />
            </div>
          </div>

          <div className="space-y-4">
            {mapStats.map((stat) => (
              <div
                key={stat.label}
                className="landing-card p-5 border border-border bg-card shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary leading-none">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground px-1">
              Hover an LGA dot for its name. Full GIS layers are in the Command Center.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
