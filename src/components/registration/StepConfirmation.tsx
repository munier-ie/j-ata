import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowLeft, ArrowRight, User, MapPin, QrCode, Loader2 } from "lucide-react";

interface ConfirmationData {
  nin: string;
  personal: {
    firstName: string;
    lastName: string;
    phone: string;
    altPhone?: string;
    lga: string;
    ward: string;
    community: string;
  };
  livestock: {
    types: string[];
    counts: Record<string, number>;
  };
}

interface StepConfirmationProps {
  data: ConfirmationData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepConfirmation({ data, onBack, onSubmit, isSubmitting }: StepConfirmationProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Review & Confirm</h3>
        <p className="text-sm text-muted-foreground">
          Please review your information carefully before submitting.
        </p>
      </div>

      <div className="space-y-4">
        {/* Verification Info */}
        <Card className="border-l-4 border-l-primary/30">
          <CardContent className="pt-6">
             <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <QrCode className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                    <p className="font-medium">Identity Verification</p>
                    <div className="text-sm">
                        <span className="text-muted-foreground">NIN: </span>
                        <span className="font-medium">{data.nin || "Not Provided"}</span>
                    </div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border-l-4 border-l-primary/30">
          <CardContent className="pt-6">
             <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <User className="w-4 h-4" />
                </div>
                <div className="space-y-3 w-full">
                    <p className="font-medium">Personal Information</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div>
                            <span className="text-muted-foreground block">Full Name</span>
                            <span className="font-medium">{data.personal.firstName} {data.personal.lastName}</span>
                        </div>
                         <div>
                            <span className="text-muted-foreground block">Phone Number</span>
                            <span className="font-medium">{data.personal.phone}</span>
                            {data.personal.altPhone && (
                                <span className="text-xs text-muted-foreground block mt-1">Alt: {data.personal.altPhone}</span>
                            )}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground mt-1" />
                            <div>
                                <span className="text-muted-foreground block">Location</span>
                                <span className="font-medium block">{data.personal.community}, {data.personal.ward}</span>
                                <span className="text-xs text-muted-foreground uppercase">{data.personal.lga} LGA</span>
                            </div>
                        </div>
                     </div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Livestock Info */}
        <Card className="border-l-4 border-l-primary/30">
          <CardContent className="pt-6">
             <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <QrCode className="w-4 h-4" />
                </div>
                <div className="space-y-3 w-full">
                    <p className="font-medium">Livestock Details</p>
                     {data.livestock.types.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                             {data.livestock.types.map(type => (
                                 <div key={type} className="flex justify-between items-center p-2 rounded bg-secondary/30 text-sm">
                                     <span className="capitalize">{type}</span>
                                     <span className="font-semibold bg-background px-2 py-0.5 rounded border">
                                         {data.livestock.counts[type] || 0}
                                     </span>
                                 </div>
                             ))}
                        </div>
                     ) : (
                         <p className="text-sm text-muted-foreground italic">No livestock selected.</p>
                     )}
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 flex justify-between items-center">
            <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} size="lg" className="gap-2 bg-green-600 hover:bg-green-700 min-w-[160px]">
            {isSubmitting ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    Confirm Registration
                    <Check className="w-4 h-4" />
                </>
            )}
          </Button>
      </div>
    </div>
  );
}
