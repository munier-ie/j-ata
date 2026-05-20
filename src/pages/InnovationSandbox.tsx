import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Copy, Key, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const InnovationSandbox = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-2 border-primary/30 text-primary">Data Hub Access</Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Innovation Sandbox</h1>
            <p className="text-xl text-muted-foreground">
              API Access for startups to build on top of Jigawa's agricultural data.
            </p>
          </div>

          {/* API Credentials */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Your Sandbox Credentials
              </CardTitle>
              <CardDescription>Use these credentials to authenticate your requests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sandbox API Key</label>
                <div className="flex gap-2">
                  <code className="flex-1 p-2 bg-background border rounded text-sm font-mono overflow-x-auto">
                    sb_live_51Parnsetlfyinorydelzz_test_key_abc123
                  </code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard('sb_live_51Parnsetlfyinorydelzz_test_key_abc123')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Quick Start Example
              </CardTitle>
              <CardDescription>Fetch soil moisture data for a specific LGA.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg overflow-x-auto text-sm font-mono">
{`curl -X GET "https://api.jata.gov.ng/v1/sandbox/soil-data?lga=Dutse" \\
  -H "Authorization: Bearer sb_live_51Parnsetlfyinorydelzz_test_key_abc123" \\
  -H "Content-Type: application/json"`}
              </pre>
            </CardContent>
          </Card>

          {/* Available Endpoints */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Available Endpoints</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600">GET</Badge>
                    <span className="font-mono text-sm font-bold">/v1/sandbox/soil-data</span>
                  </div>
                  <Badge variant="secondary">Live Data</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Retrieve real-time soil moisture, pH levels, and nutrient content indexed by LGA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600">GET</Badge>
                    <span className="font-mono text-sm font-bold">/v1/sandbox/market-prices</span>
                  </div>
                  <Badge variant="secondary">Daily Updates</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Access current market prices for commodities across major Jigawa markets.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg flex gap-3">
            <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Sandbox Environment</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-500">
                This is a sandbox environment. Data returned is simulated or anonymized historical data. Rate limits are restricted to 100 requests per minute.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InnovationSandbox;
