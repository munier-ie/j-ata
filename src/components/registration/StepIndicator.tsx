import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border -z-10" />
      <div className="space-y-8">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-start gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors duration-300 bg-background",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <div className="pt-1">
                <p
                  className={cn(
                    "text-sm font-medium leading-none transition-colors duration-300",
                    isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {isCurrent && (
                  <p className="text-xs text-muted-foreground mt-1 animate-in fade-in">
                    In Progress
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
