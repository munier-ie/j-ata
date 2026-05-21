import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
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

  const certificateRef = useRef<HTMLDivElement>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    setGeneratingPdf(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));

      const dataUrl = await toPng(certificateRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
      const filename = `Certificate_${selectedCert?.certificateNo || "JATA"}.pdf`;
      pdf.save(filename);
      toast({
        title: "Success",
        description: "Your certificate PDF has been generated and downloaded.",
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="print:hidden">
        <Header />
      </div>
      
      {/* Hide elements during print */}
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 print:pt-0 print:pb-0">
        
        {/* Certificate Printing Overlay (hidden off-screen for clean PDF generation capture) */}
        {selectedCert && (
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} className="print:hidden">
            <div 
              ref={certificateRef}
              className="w-[790px] h-[1120px] bg-white text-black border-[12px] border-double border-emerald-800 rounded-lg relative font-serif flex flex-col"
              style={{ padding: '36px 40px 28px' }}
            >
              {/* Header Government Seal & Info */}
              <div className="text-center space-y-1">
                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                  <img 
                    src={jigawaLogo} 
                    alt="Jigawa State Government Logo" 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h2 className="text-2xl font-extrabold tracking-wide uppercase text-emerald-800">
                  Jigawa Agricultural Transformation Agency
                </h2>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Official State Government Certification
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-emerald-800 via-yellow-500 to-emerald-800 mt-2" />
              </div>

              {/* Certificate Title */}
              <div className="text-center mt-5 mb-3 space-y-1">
                <h1 className="text-3xl font-extrabold text-emerald-900 tracking-wide uppercase">
                  Exporter's Registration Certificate
                </h1>
              </div>

              {/* Exporter Info */}
              <div className="px-8 text-center flex-1 flex flex-col justify-center space-y-6">
                
                {/* Certify statement */}
                <div className="space-y-1.5">
                  <p className="text-base italic text-emerald-800 font-semibold font-serif">This is to certify that</p>
                  <h3 className="text-3xl font-extrabold uppercase tracking-wide text-black font-serif my-2 leading-tight">
                    {selectedCert.companyName}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-sans font-bold">Official Registered Exporter Name</p>
                </div>

                {/* Elegant separator flourish */}
                <div className="flex items-center justify-center space-x-2 my-1">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-800/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-800/30" />
                  <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-800/20" />
                </div>

                {/* Main Declaration Sentence */}
                <p className="text-sm text-gray-700 leading-relaxed font-serif max-w-xl mx-auto px-4">
                  having met all mandatory regulatory conditions, is officially registered as a certified exporter of agricultural yield under the
                  <span className="font-extrabold text-emerald-900 block mt-1 uppercase tracking-wide font-sans text-xs">Jigawa Agricultural Transformation Agency</span>
                </p>

                {/* Clean Registry Details (Purely Typographical, No Boxes or Tables) */}
                <div className="w-full max-w-lg mx-auto py-3 px-2 border-t border-b border-emerald-800/10 font-sans text-xs text-gray-800 space-y-3 mt-4 text-left">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Corporate RC Number</span>
                      <span className="font-bold text-black font-mono text-sm leading-none mt-1 block">{selectedCert.rcNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Certified Representative</span>
                      <span className="font-bold text-black text-sm leading-none mt-1 block">{selectedCert.fullName}</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-2">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Registered Office Address</span>
                    <span className="font-semibold text-black text-xs leading-normal mt-1 block">{selectedCert.businessAddress}</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Export Commodity Grade</span>
                      <span className="font-bold text-emerald-800 text-sm leading-none mt-1 block">{selectedCert.commodityType} (Premium Grade)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Certificate Status</span>
                      <span className="font-extrabold text-emerald-600 uppercase text-sm leading-none mt-1 block">JATA Verified & Active</span>
                    </div>
                  </div>
                </div>

                {/* Authorization decree */}
                <p className="text-[10px] leading-relaxed text-gray-500 italic max-w-md mx-auto pt-2 font-serif">
                  Is officially authorized to export certified yield outside the territory of Jigawa State in accordance with the provisions of the Jigawa Agricultural Transformation Mandate.
                </p>
              </div>

              {/* Dates & Seal Row */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-300 pt-5 mt-4 text-center items-end px-6">
                <div className="space-y-0.5">
                  <span className="text-xs uppercase font-bold text-gray-500">Given on this Date</span>
                  <p className="text-sm font-bold text-black">{selectedCert.issuedAt ? new Date(selectedCert.issuedAt).toLocaleDateString() : 'N/A'}</p>
                </div>

                {/* Secure QR / Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold relative border-4 border-yellow-500 shadow-md">
                    <div className="absolute inset-1.5 border border-dotted border-white rounded-full flex items-center justify-center text-[10px] uppercase font-extrabold tracking-wider">
                      JATA
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-gray-500 mt-1.5 font-mono">{selectedCert.certificateNo}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs uppercase font-bold text-red-600">Valid Till (Expiry)</span>
                  <p className="text-sm font-bold text-red-600">{selectedCert.expiryDate ? new Date(selectedCert.expiryDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              {/* Signature Block */}
              <div className="mt-6 flex flex-col items-center justify-center">
                <div className="w-72 text-center">
                  {/* Space for physical signature */}
                  <div className="h-10" />
                  <div className="w-full h-0.5 bg-gray-400" />
                  <div className="pt-1.5">
                    <p className="font-serif italic text-emerald-800 font-extrabold text-base leading-none">
                      {selectedCert.signatoryName || "Dr. Munier-ie"}
                    </p>
                    <p className="text-[10px] text-gray-500 font-sans mt-0.5 font-semibold">
                      {selectedCert.signatoryTitle || "Director General, J-ATA"}
                    </p>
                    <p className="text-[8px] uppercase font-bold text-gray-400 mt-0.5">Authorized Signature</p>
                  </div>
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
                      <Button 
                        size="sm" 
                        onClick={generatePDF} 
                        disabled={generatingPdf} 
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-1.5"
                      >
                        {generatingPdf ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Printer className="w-4 h-4" />
                        )}
                        Print Certificate
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
                      <div className="text-center space-y-1 my-3">
                        <h5 className="text-[12px] uppercase font-bold text-emerald-700 tracking-wider leading-none">
                          Exporter's Registration Certificate
                        </h5>
                      </div>

                      {/* Exporter Block */}
                      <div className="text-center space-y-3 px-2 my-2">
                        
                        <div className="space-y-0.5">
                          <p className="text-[9px] italic text-emerald-800 font-semibold leading-none">This is to certify that</p>
                          <h6 className="text-[16px] font-extrabold uppercase tracking-wide text-black my-1 font-serif leading-tight">
                            {selectedCert.companyName}
                          </h6>
                          <p className="text-[7px] uppercase tracking-widest text-gray-400 font-sans leading-none font-bold">Official Registered Exporter Name</p>
                        </div>

                        {/* Elegant separator flourish */}
                        <div className="flex items-center justify-center space-x-1.5 my-1">
                          <div className="w-12 h-[0.5px] bg-gradient-to-r from-transparent to-emerald-800/20" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-800/30" />
                          <div className="w-12 h-[0.5px] bg-gradient-to-l from-transparent to-emerald-800/20" />
                        </div>

                        <p className="text-[8.5px] text-gray-700 leading-relaxed max-w-sm mx-auto">
                          having met all mandatory regulatory conditions, is officially registered as a certified exporter of agricultural yield under the 
                          <span className="font-bold text-emerald-950 block mt-0.5 uppercase tracking-wide">Jigawa Agricultural Transformation Agency</span>
                        </p>

                        <div className="w-full max-w-sm mx-auto py-2 px-3 border-t border-b border-emerald-800/10 font-sans text-[7.5px] text-gray-800 space-y-1.5 mt-2 text-left">
                          <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <div>
                              <span className="text-[6px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Corporate RC Number</span>
                              <span className="font-bold text-black font-mono text-[8px] leading-none mt-0.5 block">{selectedCert.rcNumber}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[6px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Certified Representative</span>
                              <span className="font-bold text-black text-[8px] leading-none mt-0.5 block">{selectedCert.fullName}</span>
                            </div>
                          </div>
                          
                          <div className="border-b border-gray-100 pb-1">
                            <span className="text-[6px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Registered Office Address</span>
                            <span className="font-semibold text-black text-[7.5px] leading-normal mt-0.5 block">{selectedCert.businessAddress}</span>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <span className="text-[6px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Export Commodity Grade</span>
                              <span className="font-bold text-emerald-800 text-[8px] leading-none mt-0.5 block">{selectedCert.commodityType} (Premium Grade)</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[6px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Certificate Status</span>
                              <span className="font-extrabold text-emerald-600 uppercase text-[8px] leading-none mt-0.5 block">JATA Verified & Active</span>
                            </div>
                          </div>
                        </div>

                        {/* Disclaimer text */}
                        <p className="text-[7.5px] leading-relaxed text-gray-500 italic max-w-xs mx-auto pt-1">
                          Is officially authorized to export certified yield outside the territory of Jigawa State in accordance with the provisions of the Jigawa Agricultural Transformation Mandate.
                        </p>
                      </div>

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
                      <div className="mt-4 flex flex-col items-center justify-center space-y-2 pt-3">
                        
                        {/* Single Signature Block */}
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
