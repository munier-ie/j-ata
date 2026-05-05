import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { StepIndicator } from "@/components/registration/StepIndicator";
import { StepNinVerification } from "@/components/registration/StepNinVerification";
import { Loader2, Check, Printer, Download, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toPng } from 'html-to-image';
import jigawaLogo from "@/assets/jigawa-logo.png";
import { grazingPermitsApi } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationMapPicker } from "@/components/ui/LocationMapPicker";

const steps = [
  { number: 1, title: "Identity Verification" },
  { number: 2, title: "Permit Details" },
  { number: 3, title: "Payment" },
  { number: 4, title: "Digital Receipt" },
];

const COST_PER_YARD = 500;

// Jigawa State LGAs with their wards
const jigawaLGAs: Record<string, string[]> = {
  'Auyo': ['Auyo', 'Auyakayi', 'Gamafoi', 'Gatafa', 'Kanya', 'Tsidir'],
  'Babura': ['Babura', 'Batali', 'Dorawa', 'Galagamma', 'Garu', 'Insharuwa', 'Jigawa', 'Kanya', 'Kuzunzumi', 'Takwasa'],
  'Birniwa': ['Birniwa', 'Dangwaleri', 'Diginsa', 'Fagi', 'Kachallari', 'Karanka', 'Kazura', 'Machinamari', 'Nguwa', 'Yarimaram'],
  'Birnin Kudu': ['Birnin Kudu', 'Kangire', 'Kantoga', 'Kwangwara', 'Lafiya', 'Surko', 'Unguwar Ji', 'Yalwan Damai'],
  'Buji': ['Buji', 'Ahoto', 'Baturiya', 'Falageri', 'Gurin', 'Madachi', 'Maje', 'Mosari', 'Takatsaba', 'Yalwa'],
  'Dutse': ['Dutse', 'Chamo', 'Dundubus', 'Karnaya', 'Limawa', 'Madobi', 'Sakwaya', 'Sule Tankarkar', 'Takur', 'Zai'],
  'Gagarawa': ['Gagarawa', 'Bulangu', 'Huregi', 'Katange', 'Madaka', 'Maiaduwa', 'Malammadori', 'Zarada'],
  'Garki': ['Garki', 'Buduru', 'Doko', 'Farin Dabi', 'Jirima', 'Kiyako', 'Muku', 'Rafin Marke', 'Siyori', 'Yalwan Garka'],
  'Gumel': ['Gumel', 'Danama', 'Galagamma', 'Gusau', 'Hammado', 'Maikintari'],
  'Guri': ['Guri', 'Abaya', 'Adiyani', 'Batali', 'Kadira', 'Lafiya', 'Margadu', 'Matamu', 'Sara'],
  'Gwaram': ['Gwaram', 'Basirka', 'Dunari', 'Fagam', 'Fara', 'Gwarami', 'Jigawar Tsada', 'Kukuma', 'Shafe', 'Yola'],
  'Gwiwa': ['Gwiwa', 'Adiyani', 'Babaldu', 'Dangyatun', 'Dollari', 'Dunari', 'Gafaya', 'Koda'],
  'Hadejia': ['Hadejia', 'Atafi', 'Dubantu', 'Kasuwar Korama', 'Majema', 'Matsaro', 'Rumfa', 'Sabon Gari', 'Yayari'],
  'Jahun': ['Jahun', 'Abalago', 'Aujara', 'Dumadumin Toka', 'Gangawa', 'Gauza Tazara', 'Gunka', 'Harbo Sabuwa', 'Harbo Tsohuwa', 'Idanduna', 'Kale'],
  'Kafin Hausa': ['Kafin Hausa', 'Balangu', 'Dumadumin Kafin Hausa', 'Gafarga', 'Jabo', 'Kazalwa', 'Majiya', 'Mezan', 'Ruba', 'Zago'],
  'Kaugama': ['Kaugama', 'Arbus', 'Askandu', 'Dabi', 'Dabuwaran', 'Danladi', 'Fikafiki', 'Ja\'e', 'Jeke', 'Kaugama'],
  'Kazaure': ['Kazaure', 'Daba', 'Dandi', 'Gada', 'Kanti', 'Sabaru', 'Unguwar Arewa', 'Unguwar Yamma', 'Yanduna'],
  'Kiri Kasama': ['Kiri Kasama', 'Baturiya', 'Dabi', 'Fansau', 'Katuka', 'Kiri', 'Marke', 'Masanawa', 'Yandamo'],
  'Kiyawa': ['Kiyawa', 'Andaza', 'Garko', 'Generiya', 'Hadin', 'Katanga', 'Kwanda', 'Tsurma', 'Shuwarin', 'Yalwan Kiyawa'],
  'Maigatari': ['Maigatari', 'Balarabe', 'Dankumbo', 'Danzomo', 'Fulata', 'Galadi', 'Garin Gamji', 'Matoya', 'Sabulayi', 'Zango'],
  'Malam Madori': ['Malam Madori', 'Bare', 'Faru', 'Gwaram', 'Kowane', 'Kuliya', 'Machina', 'Madori', 'Miga', 'Turawa'],
  'Miga': ['Miga', 'Dangyatun', 'Garko', 'Hamma', 'Harbo', 'Sansani', 'Takatsaba', 'Yandutse', 'Zareku'],
  'Ringim': ['Ringim', 'Chai Chai', 'Dabi', 'Kafin Babushe', 'Karshi', 'Kyarama', 'Ringim', 'Sankara', 'Tofa', 'Yandutse'],
  'Roni': ['Roni', 'Amaryawa', 'Danladi', 'Faru', 'Gantsa', 'Kajiji', 'Kutuli', 'Roni', 'Yanzaki'],
  'Sule Tankarkar': ['Sule Tankarkar', 'Albasu', 'Batu', 'Ciroma', 'Dara', 'Darazau', 'Firji', 'Gurduba', 'Yalawa'],
  'Taura': ['Taura', 'Ajaura', 'Chakwaikwaiwa', 'Gujungu', 'Kiri', 'Kwalam', 'Maje', 'Majiya Taura', 'Sabon Gari Taura'],
  'Yankwashi': ['Yankwashi', 'Achilafiya', 'Duhun', 'Gwarta', 'Karkarna', 'Kusa', 'Ringim', 'Yankwashi', 'Yola']
};

export default function GrazingPermit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [ninData, setNinData] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [yardLength, setYardLength] = useState<number | "">("");
  const [selectedLga, setSelectedLga] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [community, setCommunity] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yardLength || !selectedLga || !selectedWard) {
        toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" });
        return;
    }
    setCurrentStep(3);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    const receiptId = `GP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const amount = Number(yardLength) * COST_PER_YARD;
    
    // Simulated Payment Gateway Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      // Store permit in database
      await grazingPermitsApi.create({
        receiptId,
        nin: ninData,
        fullName: fullName || 'Verified Citizen',
        phone: phone || null,
        lga: selectedLga,
        ward: selectedWard,
        community: community || null,
        address: address || null,
        yardLength: Number(yardLength),
        amount,
        paymentStatus: 'completed'
      });
      
      setReceiptData({
        receiptId,
        date: new Date().toLocaleDateString(),
        nin: ninData,
        fullName: fullName || 'Verified Citizen',
        yardLength: Number(yardLength),
        amount,
        lga: selectedLga,
        ward: selectedWard,
        community,
        address
      });
      
      setIsProcessing(false);
      setCurrentStep(4);
      toast({ title: "Payment Successful", description: "Your grazing permit receipt is ready." });
    } catch (error) {
      console.error('Error storing permit:', error);
      setIsProcessing(false);
      toast({ title: "Error", description: "Payment processed but failed to store permit. Please contact support.", variant: "destructive" });
    }
  };

  const handleDownloadReceipt = async () => {
    if (receiptRef.current) {
        try {
            setIsDownloading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const dataUrl = await toPng(receiptRef.current, { quality: 0.95, cacheBust: true });
            const link = document.createElement('a');
            link.download = `Jigawa-Grazing-Receipt-${receiptData?.receiptId}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
            toast({ title: "Error", description: "Could not generate receipt image.", variant: "destructive" });
        } finally {
            setIsDownloading(false);
        }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <HeroCarousel 
          title="Grazing Permit Portal"
          subtitle="Apply for grazing permits, calculate costs, and make payments securely online."
        >
             <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10 text-sm font-medium mb-4">
                Module 2
            </span>
        </HeroCarousel>

        <section className="py-12 bg-muted/30 flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Sidebar Steps */}
              <div className="lg:col-span-4 lg:block">
                <Card className="sticky top-24 border-none shadow-lg bg-background/80 backdrop-blur-sm print:hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">Application Status</CardTitle>
                    <CardDescription>
                       Step {currentStep} of 4
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StepIndicator steps={steps} currentStep={currentStep} />
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8">
                <Card className="border-none shadow-xl print:shadow-none">
                  <CardContent className="p-6 sm:p-8">
                    
                    {/* Step 1: NIN Verification */}
                    {currentStep === 1 && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <StepNinVerification 
                            onNext={(data) => {
                                setNinData(data.nin);
                                setFullName(data.fullName || '');
                                setPhone(data.phone || '');
                                setCurrentStep(2);
                            }} 
                        />
                      </div>
                    )}

                    {/* Step 2: Details */}
                    {currentStep === 2 && (
                      <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Permit Details</h2>
                            <p className="text-muted-foreground">Enter the dimensions and location for your grazing permit.</p>
                        </div>
                        
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="yardLength">Grazing Area Length (Yards) *</Label>
                                <Input 
                                    id="yardLength" 
                                    type="number" 
                                    placeholder="e.g. 50"
                                    value={yardLength}
                                    onChange={(e) => {
                                      // Prevent leading zeros issues
                                      const val = e.target.value;
                                      if (val === '') setYardLength("");
                                      else setYardLength(Number(val));
                                    }}
                                    required
                                    min={1}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="lga">Local Government Area (LGA) *</Label>
                                <Select value={selectedLga} onValueChange={(value) => {
                                  setSelectedLga(value);
                                  setSelectedWard(""); // Reset ward when LGA changes
                                }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select LGA" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.keys(jigawaLGAs).sort().map(lga => (
                                      <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="ward">Ward *</Label>
                                <Select 
                                  value={selectedWard} 
                                  onValueChange={setSelectedWard}
                                  disabled={!selectedLga}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={selectedLga ? "Select Ward" : "Select LGA first"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {selectedLga && jigawaLGAs[selectedLga]?.map(ward => (
                                      <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="community">Community/Village (Optional)</Label>
                                <Input 
                                    id="community" 
                                    placeholder="e.g. Gidan Sarki" 
                                    value={community}
                                    onChange={(e) => setCommunity(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address/Landmark (Optional)</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        id="address" 
                                        placeholder="e.g. Near the main market" 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="flex-1"
                                    />
                                    <LocationMapPicker 
                                        selectedLga={selectedLga}
                                        onLocationSelect={(loc) => {
                                            setAddress(loc.address || `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`);
                                        }} 
                                    />
                                </div>
                            </div>

                            {/* Cost Calculation Preview */}
                            <div className="bg-secondary/50 p-6 rounded-xl space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Rate per Yard:</span>
                                    <span className="font-mono">₦{COST_PER_YARD.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Cost:</span>
                                    <span className="text-primary">
                                        ₦{((Number(yardLength) || 0) * COST_PER_YARD).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="w-full">Back</Button>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Continue to Payment</Button>
                        </div>
                      </form>
                    )}

                    {/* Step 3: Payment Gateway */}
                    {currentStep === 3 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                         <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold">Payment Gateway</h2>
                            <p className="text-muted-foreground">Securely pay for your permit via Remita</p>
                        </div>

                        <div className="bg-card border rounded-xl p-6 space-y-4 max-w-md mx-auto">
                            <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-sm text-muted-foreground">Beneficiary</span>
                                <span className="font-medium">Jigawa State Govt</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-sm text-muted-foreground">Service</span>
                                <span className="font-medium">Grazing Permit</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-sm text-muted-foreground">Location</span>
                                <span className="font-medium">{selectedWard}, {selectedLga}</span>
                            </div>
                             <div className="flex justify-between items-center pb-4 border-b">
                                <span className="text-sm text-muted-foreground">Amount</span>
                                <span className="text-xl font-bold text-primary">₦{((Number(yardLength) || 0) * COST_PER_YARD).toLocaleString()}</span>
                            </div>
                        </div>

                        <Button 
                            onClick={handlePayment} 
                            disabled={isProcessing} 
                            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 h-12 text-lg"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    Pay Now
                                </>
                            )}
                        </Button>
                        <Button variant="ghost" onClick={() => setCurrentStep(2)} disabled={isProcessing} className="w-full">Cancel</Button>
                      </div>
                    )}

                    {/* Step 4: Receipt */}
                    {currentStep === 4 && receiptData && (
                      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
                            <p className="text-muted-foreground">Your receipt has been generated below.</p>
                        </div>

                        {/* Receipt Preview */}
                        <div className="flex justify-center my-6">
                            <div ref={receiptRef} className="bg-white p-8 rounded-none shadow-lg border w-full max-w-[400px] text-sm relative overflow-hidden">
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    <img src={jigawaLogo} alt="Watermark" className="w-64 h-64 grayscale" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-center border-b pb-4 mb-4">
                                        <img src={jigawaLogo} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
                                        <h3 className="font-bold uppercase tracking-wider text-xs">Jigawa State Government</h3>
                                        <h1 className="font-bold text-lg mt-1">Grazing Permit Receipt</h1>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Receipt ID:</span>
                                            <span className="font-mono font-medium">{receiptData.receiptId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date:</span>
                                            <span>{receiptData.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Name:</span>
                                            <span>{receiptData.fullName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">NIN:</span>
                                            <span className="font-mono">{receiptData.nin}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">LGA:</span>
                                            <span>{receiptData.lga}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Ward:</span>
                                            <span>{receiptData.ward}</span>
                                        </div>
                                        {receiptData.community && (
                                          <div className="flex justify-between">
                                              <span className="text-muted-foreground">Community:</span>
                                              <span>{receiptData.community}</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Dimensions:</span>
                                            <span>{receiptData.yardLength} Yards</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed pt-4 mb-6">
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>Total Paid:</span>
                                            <span>₦{receiptData.amount.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2">
                                         <div className="w-full h-12 bg-gray-100 flex items-center justify-center font-mono text-xs tracking-widest border border-dashed rounded">
                                            {receiptData.receiptId}
                                         </div>
                                         <p className="text-[10px] text-muted-foreground mt-2">
                                            This is an electronically generated receipt. No signature required.
                                         </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center print:hidden">
                            <Button onClick={handlePrint} variant="outline" className="gap-2">
                                <Printer className="w-4 h-4" />
                                Print
                            </Button>
                            <Button onClick={handleDownloadReceipt} disabled={isDownloading} className="gap-2">
                                {isDownloading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Download Receipt
                                    </>
                                )}
                            </Button>
                        </div>
                      </div>
                    )}

                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
