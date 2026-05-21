import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import jigawaLogo from "@/assets/jigawa-logo.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { exportApi, ExportApplication } from "@/lib/api";
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  FileCheck, 
  HelpCircle, 
  Loader2, 
  Search, 
  ShieldCheck, 
  User, 
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Printer,
  Sparkles,
  Calendar,
  AlertTriangle
} from "lucide-react";

const ExportPortal = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"landing" | "apply" | "lookup">("landing");
  const [loading, setLoading] = useState(false);

  // Application Form State
  const [applyStep, setApplyStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    rcNumber: "",
    businessAddress: "",
    commodityType: "Sesame",
  });

  const [createdAppId, setCreatedAppId] = useState<string | null>(null);

  // Lookup State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ExportApplication[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Selected Certificate to view
  const [selectedCert, setSelectedCert] = useState<ExportApplication | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await exportApi.createApplication(formData);
      setCreatedAppId(response.id);
      setApplyStep(4); // Advance to payment step
      toast({
        title: "Application Draft Created",
        description: "Please complete payment to submit the application.",
        className: "bg-emerald-600 text-white border-none",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Error",
        description: "Failed to create certificate application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!createdAppId) return;
    setLoading(true);
    try {
      await exportApi.payApplicationFee(createdAppId);
      toast({
        title: "Payment Received Successfully",
        description: "Application is now pending verification by JATA.",
        className: "bg-emerald-600 text-white border-none",
      });
      setActiveTab("landing");
      setApplyStep(1);
      setCreatedAppId(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        rcNumber: "",
        businessAddress: "",
        commodityType: "Sesame",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment Failed",
        description: "We could not process the certification fee. Please retry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await exportApi.getApplications();
      // Filter by email or RC number on client side
      const filtered = response.filter(
        (app) =>
          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.rcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error(error);
      toast({
        title: "Lookup Error",
        description: "Failed to query the database. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (id: string) => {
    setLoading(true);
    try {
      const response = await exportApi.renewCertificate(id);
      setCreatedAppId(response.id);
      setActiveTab("apply");
      setApplyStep(4); // Directly skip to payment step
      toast({
        title: "Renewal Request Initialized",
        description: "Please complete the fee payment of ₦15,200 to renew your license.",
        className: "bg-amber-600 text-white border-none",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Renewal Error",
        description: "Could not initialize renewal.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="print:hidden">
        <Header />
      </div>
      
      {/* Hide elements during print */}
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 print:pt-0 print:pb-0">
        
        {/* Certificate Printing Overlay (visible ONLY when printing) */}
        {selectedCert && (
          <div className="hidden print:block w-[790px] h-[1120px] p-12 bg-white text-black border-[12px] border-double border-emerald-800 rounded-lg relative mx-auto font-serif">
            {/* Header Government Seal & Info */}
            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <img 
                  src={jigawaLogo} 
                  alt="Jigawa State Government Logo" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h2 className="text-3xl font-extrabold tracking-wide uppercase text-emerald-800">
                Jigawa Agricultural Transformation Agency
              </h2>
              <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                Official State Government Certification
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-emerald-800 via-yellow-500 to-emerald-800 my-4" />
            </div>

            {/* Certificate Title */}
            <div className="text-center my-10 space-y-2">
              <h1 className="text-4xl font-extrabold text-emerald-900 tracking-wide uppercase">
                Exporter's Registration Certificate
              </h1>
              <p className="text-lg italic text-gray-700">This is to certify that the agricultural yield exporter</p>
            </div>

            {/* Exporter Info */}
            <div className="space-y-6 px-6 text-center">
              <div className="border-b-2 border-dashed border-gray-400 pb-2">
                <h3 className="text-3xl font-bold uppercase tracking-wider text-black">
                  {selectedCert.companyName}
                </h3>
                <p className="text-xs tracking-widest uppercase text-gray-500 mt-1">Official Registered Exporter Name</p>
              </div>

              <div className="grid grid-cols-2 gap-6 text-left my-8">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold text-gray-500">Corporate RC Number</span>
                  <p className="text-lg font-bold font-mono text-black">{selectedCert.rcNumber}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold text-gray-500">Certified Representative</span>
                  <p className="text-lg font-bold text-black">{selectedCert.fullName}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-xs uppercase font-extrabold text-gray-500">Registered Office Address</span>
                  <p className="text-md font-semibold text-black">{selectedCert.businessAddress}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold text-gray-500">Export Commodity Grade</span>
                  <p className="text-lg font-bold text-emerald-800">{selectedCert.commodityType} (Premium Yield)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold text-gray-500">Certificate Status</span>
                  <p className="text-lg font-extrabold uppercase text-emerald-600">JATA Verified & Active</p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 text-center px-12 my-10">
              Is officially authorized to export certified yield outside the territory of Jigawa State and the Federal Republic of Nigeria. This registration is subject to the provisions of the Jigawa Agricultural Transformation Mandate.
            </p>

            {/* Dates & Signature Area */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-300 pt-8 mt-12 text-center items-end px-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-gray-500">Given on this Date</span>
                <p className="text-md font-bold text-black">{selectedCert.issuedAt ? new Date(selectedCert.issuedAt).toLocaleDateString() : 'N/A'}</p>
              </div>

              {/* Secure QR / Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold relative border-4 border-yellow-500 shadow-md">
                  <div className="absolute inset-2 border border-dotted border-white rounded-full flex items-center justify-center text-xs uppercase font-extrabold tracking-wider">
                    JATA
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-500 mt-2 font-mono">{selectedCert.certificateNo}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-gray-500 text-red-600">Valid Till (Expiry)</span>
                <p className="text-md font-bold text-black text-red-600">{selectedCert.expiryDate ? new Date(selectedCert.expiryDate).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Stamp & Signatures */}
            <div className="mt-16 flex flex-col items-center justify-center space-y-6">
              {/* Centered Official State Seal */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-700 flex items-center justify-center text-[8px] font-mono text-emerald-700 font-extrabold leading-none text-center p-2 bg-emerald-50/50">
                  OFFICIAL STATE SEAL
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1">JATA SECRETARIAT</span>
              </div>
              
              {/* Single Signature Block Below Seal */}
              <div className="w-80 space-y-1 text-center">
                {/* Sign line space */}
                <div className="h-12 flex items-end justify-center">
                  {/* Space to sign */}
                </div>
                <div className="w-full h-0.5 bg-gray-400" />
                <div className="pt-2">
                  <p className="font-serif italic text-emerald-800 font-extrabold text-lg leading-none">
                    {selectedCert.signatoryName || "Dr. Munier-ie"}
                  </p>
                  <p className="text-[10px] text-gray-500 font-sans mt-1 font-semibold">
                    {selectedCert.signatoryTitle || "Director General, J-ATA"}
                  </p>
                  <p className="text-[9px] uppercase font-bold text-gray-400 mt-1">Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="print:hidden">
          {/* Landing State */}
          {activeTab === "landing" && (
            <div className="space-y-16">
              {/* Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 px-6 py-16 shadow-2xl sm:px-12 sm:py-24 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                    JATA Commodity Mandate
                  </span>
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl font-display">
                    Export Development & Traceability Portal
                  </h1>
                  <p className="text-lg text-emerald-100/90 leading-relaxed font-sans max-w-2xl mx-auto">
                    Acquire the mandatory official state export certification for shipping your premium yields (Sesame, Hibiscus, Gum Arabic) outside of Jigawa State or Nigeria. Complete secure digital verification and pay the unified government levy.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setActiveTab("apply")} 
                      className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20 px-8 py-6 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-5 h-5 mr-2" /> Apply for Certification
                    </Button>
                    <Button 
                      size="lg" 
                      onClick={() => setActiveTab("lookup")} 
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 rounded-xl font-bold transition-all duration-300"
                    >
                      <Search className="w-5 h-5 mr-2" /> Check Status / Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Regulatory Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">Mandatory Certification</CardTitle>
                    <CardDescription>
                      Unified government compliance mandate.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Under Jigawa State regulations, all agricultural produce exported outside state territories must be authenticated for origin, moisture content, and phytosanitary quality, guaranteeing international market excellence.
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">₦15,200 Registration Fee</CardTitle>
                    <CardDescription>
                      Consolidated single-window service fee.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    A flat fee of ₦15,200 covers quality checks, secure database registry logs, and issuance of the certified secure certificate. Payments are processed securely via official state channels.
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">1-Year License Validity</CardTitle>
                    <CardDescription>
                      Annual renewal cycle.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Each issued JATA Export Certificate remains fully active for exactly one (1) year. Prior to expiry, exporters must renew their credentials and complete the annual service renewal fee.
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Form Wizard Tab */}
          {activeTab === "apply" && (
            <div className="max-w-3xl mx-auto">
              {/* Back Link */}
              <button 
                onClick={() => { setActiveTab("landing"); setApplyStep(1); }} 
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 group transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
              </button>

              <Card className="border-none shadow-2xl relative overflow-hidden bg-background/80 backdrop-blur-md">
                {/* Visual Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                    style={{ width: `${(applyStep / 4) * 100}%` }}
                  />
                </div>

                <CardHeader className="pt-8">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                    Step {applyStep} of 4
                  </span>
                  <CardTitle className="text-2xl mt-1">
                    {applyStep === 1 && "Personal Contact Details"}
                    {applyStep === 2 && "Company Corporate Info"}
                    {applyStep === 3 && "Commodity Selection"}
                    {applyStep === 4 && "Government Certification Levy Payment"}
                  </CardTitle>
                  <CardDescription>
                    {applyStep === 1 && "Enter the contact details for the main corporate representative."}
                    {applyStep === 2 && "Provide corporate registry credentials. Official RC Number is required."}
                    {applyStep === 3 && "Choose the primary cash crop you intend to export."}
                    {applyStep === 4 && "Complete secure simulated checkout of the ₦15,200 certification levy."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-8">
                  {applyStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="fullName" 
                            name="fullName" 
                            placeholder="Musa Haruna" 
                            value={formData.fullName} 
                            onChange={handleInputChange} 
                            className="pl-10"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="musa@company.com" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            autoComplete="off"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            placeholder="+234 80 1234 5678" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {applyStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Registered Business Name</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="companyName" 
                              name="companyName" 
                              placeholder="Kano Gate Agro Exporters Ltd" 
                              value={formData.companyName} 
                              onChange={handleInputChange} 
                              className="pl-10"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rcNumber">CAC RC Number</Label>
                          <Input 
                            id="rcNumber" 
                            name="rcNumber" 
                            placeholder="RC-123456" 
                            value={formData.rcNumber} 
                            onChange={handleInputChange} 
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessAddress">Registered Office Address</Label>
                        <Input 
                          id="businessAddress" 
                          name="businessAddress" 
                          placeholder="Plot 14, Industrial Zone, Dutse, Jigawa State" 
                          value={formData.businessAddress} 
                          onChange={handleInputChange} 
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}

                  {applyStep === 3 && (
                    <form onSubmit={handleCreateApplication} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="commodityType">Primary Commodity For Export</Label>
                        <select
                          id="commodityType"
                          name="commodityType"
                          value={formData.commodityType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="Sesame">Sesame Seeds</option>
                          <option value="Hibiscus">Hibiscus Flowers</option>
                          <option value="Gum Arabic">Gum Arabic</option>
                          <option value="Cashew">Cashew Nuts</option>
                          <option value="Maize">Maize</option>
                        </select>
                      </div>

                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-sm text-emerald-800 dark:text-emerald-300">
                        <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Official Certification Notice</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            By continuing, you agree that your corporate data will be indexed in the official JATA trade directory database. An inspection of agricultural yield samples might be conducted prior to final clearance.
                          </p>
                        </div>
                      </div>
                    </form>
                  )}

                  {applyStep === 4 && (
                    <div className="space-y-6">
                      {/* Cost breakdown card */}
                      <div className="bg-emerald-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-emerald-950/20">
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                          <Building2 className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 flex justify-between items-center">
                          <div>
                            <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-widest">Certification Fee</span>
                            <p className="text-3xl font-extrabold mt-1">₦15,200.00</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">Expiry Cycle</span>
                            <p className="text-lg font-bold mt-1">1 Year Validity</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment simulation checkout fields */}
                      <div className="border border-border/80 rounded-2xl p-6 space-y-4 bg-muted/20">
                        <div className="flex gap-2 pb-2 border-b border-border/50">
                          <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> Card Checkout
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center">Official Government Checkout Channel</span>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Card Number</Label>
                            <Input placeholder="4000 1234 5678 9010" disabled={loading} defaultValue="4000 1234 5678 9010" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Expiry Date</Label>
                              <Input placeholder="12/28" disabled={loading} defaultValue="12/28" />
                            </div>
                            <div className="space-y-2">
                              <Label>CVC Security Code</Label>
                              <Input placeholder="123" disabled={loading} defaultValue="123" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between border-t border-border/50 pt-6">
                  {applyStep > 1 && applyStep < 4 ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setApplyStep((prev) => prev - 1)}
                      disabled={loading}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {applyStep < 3 && (
                    <Button 
                      onClick={() => {
                        // Simple local validations
                        if (applyStep === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
                          toast({ title: "Validation Error", description: "Please fill out all contact fields.", variant: "destructive" });
                          return;
                        }
                        if (applyStep === 2 && (!formData.companyName || !formData.rcNumber || !formData.businessAddress)) {
                          toast({ title: "Validation Error", description: "Company details are required.", variant: "destructive" });
                          return;
                        }
                        setApplyStep((prev) => prev + 1);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  {applyStep === 3 && (
                    <Button 
                      onClick={handleCreateApplication} 
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-[120px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Draft <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}

                  {applyStep === 4 && (
                    <Button 
                      onClick={handlePayment} 
                      disabled={loading}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authorizing Payment...
                        </>
                      ) : (
                        <>
                          Pay ₦15,200.00 & Complete Submission
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Certificate Lookup Tab */}
          {activeTab === "lookup" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Back Link */}
              <button 
                onClick={() => { setActiveTab("landing"); setSearchResults([]); setHasSearched(false); setSelectedCert(null); }} 
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2 group transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
              </button>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Lookup Certificate Directory</h2>
                <p className="text-sm text-muted-foreground">
                  Verify or download your secure exporters' license using your work email address or company CAC RC Number.
                </p>
              </div>

              {/* Search Card */}
              <Card className="border-none shadow-xl bg-background/80 backdrop-blur-md">
                <CardContent className="pt-6">
                  <form onSubmit={handleLookup} className="flex gap-3">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by RC Number, Work Email or Corporate Name..."
                        className="pl-10 h-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="h-12 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lookup Registry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Lookup Results */}
              {hasSearched && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Query Results ({searchResults.length})</h3>
                  
                  {searchResults.length === 0 ? (
                    <Card className="border-dashed bg-muted/10 p-12 text-center">
                      <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="font-semibold text-lg">No Exporters' Record Found</p>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                        We couldn't find an application matching your details. Make sure RC numbers match format (e.g. RC-983742).
                      </p>
                    </Card>
                  ) : (
                    <div className="grid gap-4">
                      {searchResults.map((app) => (
                        <Card key={app.id} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                  {app.applicationNo}
                                </span>
                                <span className="font-bold text-lg text-foreground">{app.companyName}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                CAC Code: <span className="font-semibold text-foreground">{app.rcNumber}</span> | Commodity: <span className="font-semibold text-foreground">{app.commodityType}</span>
                              </p>
                              {app.status === "approved" && app.expiryDate && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                  Issued: <span className="font-bold">{new Date(app.issuedAt!).toLocaleDateString()}</span> | 
                                  Expires: <span className="font-bold text-red-600">{new Date(app.expiryDate).toLocaleDateString()}</span>
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                              {/* Status Badges */}
                              {app.status === "pending" && (
                                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full border border-amber-500/20">
                                  Awaiting JATA Review
                                </span>
                              )}
                              {app.status === "rejected" && (
                                <span className="px-3 py-1 bg-red-500/10 text-red-600 text-xs font-bold rounded-full border border-red-500/20">
                                  Application Declined
                                </span>
                              )}
                              {app.status === "expired" && (
                                <span className="px-3 py-1 bg-red-500/10 text-red-600 text-xs font-bold rounded-full border border-red-500/20 flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> License Expired
                                </span>
                              )}
                              {app.status === "approved" && (
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full border border-emerald-500/20 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Active & Verified
                                </span>
                              )}

                              {/* Action Buttons */}
                              {app.status === "approved" && (
                                <Button 
                                  onClick={() => setSelectedCert(app)}
                                  size="sm" 
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-md shadow-emerald-500/10"
                                >
                                  <FileCheck className="w-4 h-4" /> View Certificate
                                </Button>
                              )}

                              {app.status === "expired" && (
                                <Button 
                                  onClick={() => handleRenew(app.id)}
                                  size="sm"
                                  disabled={loading}
                                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1"
                                >
                                  Renew & Pay (₦15,200)
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* View Certificate Details Drawer/Modal */}
              {selectedCert && (
                <Card className="border-none shadow-2xl overflow-hidden mt-8 max-w-3xl mx-auto">
                  <CardHeader className="bg-emerald-950 text-white flex flex-row items-center justify-between p-6">
                    <div>
                      <CardTitle className="text-xl">Exporter Certificate Portal</CardTitle>
                      <CardDescription className="text-emerald-200/80">Preview and download your official JATA certification.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={printCertificate} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-1.5">
                        <Printer className="w-4 h-4" /> Print / PDF
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedCert(null)} className="text-white hover:bg-white/10">
                        Close Preview
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 bg-muted/10">
                    {/* Visual Certificate Card Replica matching user style */}
                    <div className="w-full aspect-[1/1.4] max-w-xl mx-auto bg-white text-black p-6 border-[8px] border-double border-emerald-800 rounded-lg shadow-2xl flex flex-col justify-between font-serif relative">
                      
                      {/* Pattern Background overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.02] pointer-events-none" />

                      {/* Seal and Agency Info */}
                      <div className="text-center space-y-1">
                        <div className="w-12 h-12 mx-auto flex items-center justify-center">
                          <img 
                            src={jigawaLogo} 
                            alt="Jigawa State Government Logo" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <h4 className="text-[14px] font-extrabold tracking-wide uppercase text-emerald-800 leading-tight">
                          Jigawa Agricultural Transformation Agency
                        </h4>
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                          Jigawa State Government of Nigeria
                        </p>
                        <div className="w-full h-0.5 bg-gradient-to-r from-emerald-800 via-yellow-500 to-emerald-800 my-2" />
                      </div>

                      {/* Core Statement */}
                      <div className="text-center space-y-1 my-4">
                        <h5 className="text-[12px] uppercase font-bold text-emerald-700 tracking-wider leading-none">
                          Exporter's Registration Certificate
                        </h5>
                        <p className="text-[9px] italic text-gray-600 leading-none">This is to certify that</p>
                      </div>

                      {/* Exporter Block */}
                      <div className="text-center space-y-4">
                        <div className="border-b border-dashed border-gray-400 pb-1 max-w-[80%] mx-auto">
                          <h6 className="text-[16px] font-extrabold uppercase tracking-wide text-black leading-tight">
                            {selectedCert.companyName}
                          </h6>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-left text-[9px] max-w-[90%] mx-auto font-sans text-gray-800 leading-relaxed pt-2">
                          <div>
                            <span className="font-bold text-[7px] uppercase tracking-wider text-gray-400 block leading-none">CAC RC Code</span>
                            <span className="font-mono font-bold text-black text-[10px]">{selectedCert.rcNumber}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[7px] uppercase tracking-wider text-gray-400 block leading-none">Representative</span>
                            <span className="font-bold text-black">{selectedCert.fullName}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-bold text-[7px] uppercase tracking-wider text-gray-400 block leading-none">Registered Office Address</span>
                            <span className="font-medium text-black">{selectedCert.businessAddress}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[7px] uppercase tracking-wider text-gray-400 block leading-none">Commodity Focus</span>
                            <span className="font-bold text-emerald-800 text-[10px]">{selectedCert.commodityType} (Grade A)</span>
                          </div>
                          <div>
                            <span className="font-bold text-[7px] uppercase tracking-wider text-gray-400 block leading-none">Registry Status</span>
                            <span className="font-extrabold text-emerald-600 uppercase">JATA Verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer text */}
                      <p className="text-[7px] leading-relaxed text-gray-500 text-center px-6 mt-4">
                        Is officially logged under the JATA Trade Directory mandate and authorized to transact export trading across regional limits. Validity is bound to terms of registration.
                      </p>

                      {/* Signature Row */}
                      <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-gray-200 text-center items-end text-[8px]">
                        <div>
                          <span className="font-sans block text-[6px] uppercase tracking-wider text-gray-400 leading-none">Given Date</span>
                          <span className="font-bold text-black">{selectedCert.issuedAt ? new Date(selectedCert.issuedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>

                        {/* Round Mini Gold Seal */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[6px] border-2 border-yellow-500 shadow relative">
                            <div className="absolute inset-0.5 border border-dotted border-white rounded-full flex items-center justify-center">
                              JATA
                            </div>
                          </div>
                          <span className="font-mono text-[6px] text-gray-400 mt-1 font-bold">{selectedCert.certificateNo}</span>
                        </div>

                        <div>
                          <span className="font-sans block text-[6px] uppercase tracking-wider text-gray-400 leading-none text-red-600">Valid Till</span>
                          <span className="font-bold text-black text-red-600">{selectedCert.expiryDate ? new Date(selectedCert.expiryDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>

                      {/* Mini Stamp & Signature Section */}
                      <div className="mt-4 flex flex-col items-center justify-center space-y-2 border-t border-gray-200 pt-3">
                        {/* Centered Seal */}
                        <div className="flex flex-col items-center">
                          <span className="border border-dotted border-emerald-700 px-1 py-0.5 rounded text-[4px] bg-emerald-50/20 text-emerald-700 font-extrabold uppercase scale-90">SEAL</span>
                        </div>
                        
                        {/* Single Signature Block below Seal */}
                        <div className="w-48 text-center space-y-0.5">
                          {/* Space to sign */}
                          <div className="h-6 flex items-end justify-center">
                            {/* Empty signature space */}
                          </div>
                          <div className="w-full h-[0.5px] bg-gray-300" />
                          <div className="pt-1">
                            <p className="italic font-bold text-emerald-800 text-[7px] leading-none">
                              {selectedCert.signatoryName || "Dr. Munier-ie"}
                            </p>
                            <p className="leading-none text-gray-400 text-[6px] mt-0.5 font-semibold">
                              {selectedCert.signatoryTitle || "Director General, J-ATA"}
                            </p>
                            <p className="text-[5px] uppercase font-bold text-gray-300 mt-0.5">Authorized Signature</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ExportPortal;
