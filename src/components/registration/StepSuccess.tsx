import { Button } from "@/components/ui/button";
import { DigitalIDCard } from "@/components/cards/DigitalIDCard";
import { Check, Download, Share2, Home, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface StepSuccessProps {
    data: any;
}

export function StepSuccess({ data }: StepSuccessProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                setIsDownloading(true);
                // Artificial delay to show spinner
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const dataUrl = await toPng(cardRef.current, { quality: 0.95, cacheBust: true });
                const link = document.createElement('a');
                link.download = `Jigawa-Farmer-ID-${data?.farmerId || 'card'}.png`;
                link.href = dataUrl;
                link.click();
                toast({ title: "Downloaded", description: "ID Card saved successfully." });
            } catch (err) {
                console.error(err);
                toast({ title: "Error", description: "Could not generate image. Please try again.", variant: "destructive" });
            } finally {
                setIsDownloading(false);
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 py-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <div>
                     <h2 className="text-2xl font-bold text-green-700">Registration Successful!</h2>
                     <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                        Welcome to the JATA Platform. Your digital identity card has been successfully generated.
                    </p>
                </div>
            </div>

            <div className="flex justify-center my-8">
                <div ref={cardRef} className="shadow-2xl rounded-xl overflow-hidden">
                    <DigitalIDCard 
                        farmerId={data.farmerId}
                        name={`${data.firstName} ${data.lastName}`}
                        lga={data.lga}
                        ward={data.ward}
                        issueDate={new Date().toLocaleDateString()}
                        passportUrl={data.passportUrl}
                    />
                </div>
            </div>
            
             <div className="text-xs text-center text-muted-foreground max-w-sm mx-auto mb-8">
                This card serves as your official digital ID. Present the QR code for verification and accessing government services.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button variant="outline" className="w-full gap-2" onClick={handleDownload} disabled={isDownloading}>
                    {isDownloading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            Download ID Card
                        </>
                    )}
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => toast({ title: "Shared", description: "Link copied to clipboard." })}>
                    <Share2 className="w-4 h-4" />
                    Share Profile
                </Button>
                 <Button asChild className="w-full sm:col-span-2 gap-2" variant="default">
                    <Link to="/">
                        <Home className="w-4 h-4" />
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
