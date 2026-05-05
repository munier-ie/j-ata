import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";

const lgas = [
  "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa",
  "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa",
  "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori",
  "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"
];

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  phone: string;
  altPhone?: string;
  lga: string;
  ward: string;
  community: string;
}

interface StepPersonalLevelProps {
  onNext: (data: PersonalInfoData) => void;
  onBack: () => void;
  initialData?: Partial<PersonalInfoData>;
  disableInputs?: boolean;
}

export function StepPersonalLevel({ onNext, onBack, initialData = {}, disableInputs = false }: StepPersonalLevelProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const phone = formData.get("phone") as string;
    
    // Phone Validation (only if not pre-filled/disabled)
    if (!disableInputs && !/^\d{11}$/.test(phone)) {
        setPhoneError("Phone number must be exactly 11 digits.");
        return;
    }
    setPhoneError("");
    setIsLoading(true);

    // Simulate Processing Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);

    const data: PersonalInfoData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: phone,
      altPhone: formData.get("altPhone") as string,
      lga: formData.get("lga") as string,
      ward: formData.get("ward") as string,
      community: formData.get("community") as string,
    };
    onNext(data);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your accurate personal details for registration.
        </p>
        {disableInputs && (
             <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                Your name has been retrieved from your NIN and cannot be changed.
             </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              name="firstName"
              autoComplete="given-name"
              placeholder="Enter your first name" 
              required 
              defaultValue={initialData.firstName}
              readOnly={disableInputs}
              className={disableInputs ? "bg-muted cursor-not-allowed" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              name="lastName"
              autoComplete="family-name"
              placeholder="Enter your last name" 
              required 
              defaultValue={initialData.lastName}
              readOnly={disableInputs}
              className={disableInputs ? "bg-muted cursor-not-allowed" : ""}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
                id="phone" 
                name="phone"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="e.g., 08012345678" 
                required 
                defaultValue={initialData.phone}
                maxLength={11}
                readOnly={disableInputs}
                className={disableInputs ? "bg-muted cursor-not-allowed" : ""}
                onChange={(e) => {
                    if (disableInputs) return;
                    const value = e.target.value.replace(/\D/g, '');
                    e.target.value = value;
                    if (phoneError) setPhoneError("");
                }}
            />
            {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="altPhone">Alternative Phone (Optional)</Label>
            <Input 
                id="altPhone" 
                name="altPhone"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="e.g., 08012345678" 
                defaultValue={initialData.altPhone}
                maxLength={11}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    e.target.value = value;
                }}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lga">Local Government Area</Label>
            <Select name="lga" required defaultValue={initialData.lga}>
              <SelectTrigger>
                <SelectValue placeholder="Select LGA" />
              </SelectTrigger>
              <SelectContent>
                {lgas.map((lga) => (
                  <SelectItem key={lga} value={lga.toLowerCase().replace(/\s/g, '-')}>
                    {lga}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Ward</Label>
            <Input 
              id="ward" 
              name="ward" 
              placeholder="Enter your ward" 
              required 
              defaultValue={initialData.ward}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="community">Community/Village</Label>
          <Input 
            id="community" 
            name="community"
            placeholder="Enter your community or village name" 
            required 
            defaultValue={initialData.community}
          />
        </div>

        <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={onBack} className="gap-2" disabled={isLoading}>
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>
          <Button type="submit" className="gap-2 min-w-[120px]" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
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
