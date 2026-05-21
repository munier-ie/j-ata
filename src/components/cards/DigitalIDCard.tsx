 import { useRef } from "react";
import { QrCode, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import jigawaLogo from "@/assets/jigawa-logo.png"; // Assuming this path exists from previous context
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DigitalIDCardProps {
  farmerId: string;
  name: string;
  lga: string;
  ward: string;
  livestockCount?: number;
  issueDate?: string;
  className?: string;
  passportUrl?: string | null;
}

export function DigitalIDCard({
  farmerId,
  name,
  lga,
  ward,
  livestockCount,
  issueDate = new Date().toLocaleDateString(),
  className,
  passportUrl,
}: DigitalIDCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden w-full max-w-[640px] mx-auto aspect-[1.5/1] rounded-2xl border-0 shadow-2xl",
        className
      )}
      id="digital-id-card"
    >
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-5 z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-3">
            <img 
              src={jigawaLogo} 
              alt="Jigawa State" 
              className="w-10 h-10 object-contain drop-shadow-md"
            />
            <div>
              <h3 className="text-[10px] font-medium text-green-200 uppercase tracking-widest">Jigawa State</h3>
              <h1 className="text-lg font-display font-bold text-white leading-tight">Farmer Identity Card</h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-semibold text-green-100 uppercase tracking-wider">Active</span>
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-1 flex gap-5 items-center">
          {/* Avatar Area */}
          <div className="shrink-0 relative">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-white/20 shadow-lg flex items-center justify-center overflow-hidden">
              {passportUrl ? (
                <img src={passportUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">👨🏾‍🌾</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div>
              <label className="text-[9px] text-green-300 uppercase tracking-wider font-semibold">Name</label>
              <p className="text-xl font-bold text-white leading-tight truncate">{name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
                <div>
                   <label className="text-[9px] text-green-300 uppercase tracking-wider font-semibold">Farmer ID</label>
                   <p className="font-mono text-xs text-white/90">{farmerId}</p>
                </div>
                 <div>
                   <label className="text-[9px] text-green-300 uppercase tracking-wider font-semibold">Issued</label>
                   <p className="font-mono text-xs text-white/90">{issueDate}</p>
                </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
                <MapPin className="w-3 h-3 text-green-400 shrink-0" />
                <p className="text-xs text-green-100 truncate">{ward}, {lga}</p>
            </div>
          </div>
        </div>

        {/* Footer / QR */}
        <div className="mt-auto pt-2 border-t border-white/10 flex justify-between items-end">
          <div className="text-[10px] text-green-400/80 max-w-[300px] leading-tight">
             Jigawa Agricultural Transformation Agency (JATA), Jigawa State Government.
          </div>
          <div className="bg-white p-1 rounded-sm shadow-sm shrink-0">
             <QrCode className="w-8 h-8 text-green-900" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </Card>
  );
}
