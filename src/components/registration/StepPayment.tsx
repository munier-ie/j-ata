import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  Building, 
  Smartphone,
  Copy,
  Check
} from "lucide-react";

interface StepPaymentProps {
  onNext: () => void;
  onBack: () => void;
  feeAmount?: number;
}

export function StepPayment({ onNext, onBack, feeAmount = 1550 }: StepPaymentProps) {
  const { toast } = useToast();
  const [method, setMethod] = useState<"card" | "transfer" | "ussd">("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Payment Processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    setLoading(false);
    setSuccess(true);
    toast({
      title: "Payment Received",
      description: `Unified farmer registration fee of ₦${feeAmount.toLocaleString()} paid successfully.`,
      className: "bg-green-600 text-white border-none",
    });

    // Auto proceed after short delay
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied",
      description: "Simulation details copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-extrabold text-foreground">Payment Confirmed</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Levy authenticated successfully. Generating your official JATA digital profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Government Registration Levy</h3>
        <p className="text-sm text-muted-foreground">
          A mandatory single-window administrative service levy of ₦{feeAmount.toLocaleString()} is required to complete farmer registration.
        </p>
      </div>

      {/* Payment Levy Info banner */}
      <div className="bg-emerald-950 text-white p-6 rounded-2xl relative overflow-hidden shadow-lg shadow-emerald-950/15">
        <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 opacity-10">
          <CreditCard className="w-40 h-40" />
        </div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase font-extrabold text-emerald-300 tracking-wider">Registration Levy</span>
            <p className="text-3xl font-extrabold mt-0.5">₦{feeAmount.toLocaleString()}.00</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Authentication</span>
            <p className="text-sm font-semibold mt-0.5">Instant Digital Registry</p>
          </div>
        </div>
      </div>

      {/* Method Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 border border-border/80 p-1.5 rounded-xl bg-muted/10">
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            method === "card"
              ? "bg-background shadow text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" /> Card
        </button>
        <button
          type="button"
          onClick={() => setMethod("transfer")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            method === "transfer"
              ? "bg-background shadow text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="w-3.5 h-3.5" /> Transfer
        </button>
        <button
          type="button"
          onClick={() => setMethod("ussd")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            method === "ussd"
              ? "bg-background shadow text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" /> USSD
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handlePay} className="space-y-6">
        {method === "card" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-2">
              <Label>Cardholder Name</Label>
              <Input placeholder="Musa Ibrahim" disabled={loading} defaultValue="Musa Ibrahim" />
            </div>
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input placeholder="5061 1234 5678 9012" disabled={loading} defaultValue="5061 1234 5678 9012" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input placeholder="09/29" disabled={loading} defaultValue="09/29" />
              </div>
              <div className="space-y-2">
                <Label>CVV Code</Label>
                <Input placeholder="123" disabled={loading} defaultValue="123" />
              </div>
            </div>
          </div>
        )}

        {method === "transfer" && (
          <div className="space-y-4 bg-muted/20 border border-border/60 rounded-xl p-5 animate-in fade-in duration-200">
            <p className="text-xs text-muted-foreground text-center">
              Transfer exactly <span className="font-bold text-foreground">₦{feeAmount.toLocaleString()}</span> to the Jigawa Government TSA account details below.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Bank Name</span>
                <span className="font-bold">Jigawa State TSA Bank (Simulation)</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Account Number</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-extrabold text-emerald-600">1204982734</span>
                  <button 
                    type="button"
                    onClick={() => copyText("1204982734")}
                    className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Beneficiary</span>
                <span className="font-bold uppercase text-xs">JATA Farmer Registry Levy</span>
              </div>
            </div>
          </div>
        )}

        {method === "ussd" && (
          <div className="space-y-4 bg-muted/20 border border-border/60 rounded-xl p-5 animate-in fade-in duration-200 text-center">
            <p className="text-xs text-muted-foreground">
              Dial the state payment USSD prompt below on your registered phone number.
            </p>
            <div className="py-4">
              <code className="text-xl font-mono font-extrabold tracking-wider text-emerald-600 bg-background px-4 py-2 rounded-lg border border-border/60">
                *7006*15*1550#
              </code>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Follow instructions on your mobile screen to authorize the TSA payment.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="pt-4 flex justify-between gap-3 border-t border-border/50">
          <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-[140px]">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Confirm Payment <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
