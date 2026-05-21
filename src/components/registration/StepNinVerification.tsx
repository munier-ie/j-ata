import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StepNinVerificationProps {
  onNext: (data: { nin: string; fullName?: string; phone?: string }) => void;
  initialData?: string;
}

export function StepNinVerification({ onNext, initialData = "" }: StepNinVerificationProps) {
  const [nin, setNin] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const triggerVerification = async (ninValue: string) => {
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    // Simulate Verification Delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsLoading(false);
    toast({
        title: "NIN Verified",
        description: "Identity confirmed successfully.",
        className: "bg-green-600 text-white border-none"
    });
    
    // Pass simulated data found from NIN lookup
    onNext({ 
      nin: ninValue,
      fullName: "Aminu Kano",
      phone: "08012345678"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setNin(value);
    if (error) setError("");
    
    if (value.length === 11) {
      triggerVerification(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nin.length !== 11) {
      setError("NIN must be exactly 11 digits.");
      return;
    }
    triggerVerification(nin);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Verify Identity</h3>
        <p className="text-sm text-muted-foreground">
          Enter your National Identification Number (NIN) to verify your identity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nin">NIN</Label>
          <Input 
            id="nin" 
            name="nin"
            autoComplete="off"
            inputMode="numeric"
            placeholder="Enter your 11-digit NIN" 
            value={nin}
            maxLength={11}
            disabled={isLoading}
            onChange={handleInputChange}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className="text-xs text-muted-foreground">
            This prototype simulates verification. In a real scenario, this would auto-fill your details.
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" className="gap-2 min-w-[120px]" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                </>
            ) : (
                <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
