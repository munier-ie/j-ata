import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  FileCheck,
  ArrowRight,
  QrCode
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const revenueStreams = [
  {
    title: "Market Entry Fees",
    description: "Digital permits for agricultural market entry",
    icon: FileCheck,
    amount: "₦500 - ₦2,000"
  },
  {
    title: "Slaughterhouse Fees",
    description: "Processing fees for certified slaughterhouses",
    icon: Receipt,
    amount: "₦1,000 - ₦5,000"
  },
  {
    title: "Movement Permits",
    description: "Interstate agricultural transportation permits",
    icon: QrCode,
    amount: "₦2,000 - ₦10,000"
  },
  {
    title: "Inspection & Certification",
    description: "Official inspection and certification fees",
    icon: FileCheck,
    amount: "₦500 - ₦3,000"
  },
];

const stats = [
  { label: "Daily Collections", value: "₦2.5M+", trend: "+15%" },
  { label: "Transactions Today", value: "1,234", trend: "+8%" },
  { label: "Active Permits", value: "5,678", trend: "+22%" },
];

export default function RevenuePortal() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccessDashboard = () => {
    toast({
      title: "Revenue Dashboard",
      description: "Please login with your revenue officer credentials to access the dashboard.",
    });
    navigate("/login");
  };

  const handlePayment = (method: string) => {
    toast({
      title: `${method} Payment`,
      description: `${method} payment integration coming soon. Please contact the ministry for manual payments.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                Module 3
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-background mb-4">
                Revenue Portal
              </h1>
              <p className="text-xl text-background/80">
                Automated, cashless revenue collection system for agricultural government fees.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                    <span className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Streams */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Revenue Streams Covered
              </h2>
              <p className="text-muted-foreground">
                All agricultural government fees are now digital and cashless.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {revenueStreams.map((stream, index) => (
                <Card key={index} variant="stat">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <stream.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{stream.title}</CardTitle>
                    <CardDescription>{stream.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-display font-bold text-primary">{stream.amount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Payment Options & Dashboard */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Cashless Payment Options</CardTitle>
                      <CardDescription>Multiple secure payment methods</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => handlePayment("POS")}
                      className="p-4 rounded-lg bg-secondary text-center hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-foreground">POS</p>
                      <p className="text-xs text-muted-foreground">Card Payment</p>
                    </button>
                    <button 
                      onClick={() => handlePayment("Bank Transfer")}
                      className="p-4 rounded-lg bg-secondary text-center hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-foreground">Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">Direct Transfer</p>
                    </button>
                    <button 
                      onClick={() => handlePayment("USSD")}
                      className="p-4 rounded-lg bg-secondary text-center hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <p className="font-semibold text-foreground">USSD</p>
                      <p className="text-xs text-muted-foreground">Mobile Payment</p>
                    </button>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/30">
                    <h4 className="font-medium text-foreground mb-2">Instant E-Receipt</h4>
                    <p className="text-sm text-muted-foreground">
                      Every payment generates a QR-verified e-receipt that can be used for verification.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Revenue Dashboard</CardTitle>
                      <CardDescription>Real-time analytics for ministry leadership</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Access comprehensive revenue analytics including:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Daily, weekly, and monthly reports
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      LGA-wise revenue breakdown
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Transaction audit logs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Export reports (PDF/Excel)
                    </li>
                  </ul>
                  <Button 
                    variant="governmentPrimary" 
                    className="w-full group mt-4"
                    onClick={handleAccessDashboard}
                  >
                    Access Revenue Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
