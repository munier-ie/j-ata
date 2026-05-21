import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import jigawaLogo from "@/assets/jigawa-logo.png";

const DB_NAME = "jata-media-cache";
const STORE_NAME = "videos";
const DB_VERSION = 1;
const VIDEO_KEY = "hero-background-video";
const DEFAULT_VIDEO_URL = "/Create_video_with_images_202605150917.mp4";

// Open connection to IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e: any) => resolve(e.target.result);
    request.onerror = (e: any) => reject(e.target.error);
  });
}

// Retrieve cached video blob from IndexedDB
async function getCachedVideo(): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(VIDEO_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Save video blob to IndexedDB
async function cacheVideo(blob: Blob): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.put(blob, VIDEO_KEY);
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

const kpis = [
  { value: "1,435", label: "Extension Agents" },
  { value: "500K+", label: "Farmers Supported" },
  { value: "5", label: "Innovation Hubs" },
];

const governor = {
  role: "His Excellency, The Executive Governor",
  name: "Mallam Umar Namadi",
  ministry: "Jigawa State Government",
  image: "/govt.jpg",
};

export function CivicHeroSection() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO_URL);

  useEffect(() => {
    let active = true;
    let localUrl = "";

    if (videoRef.current) {
      videoRef.current.muted = true;
    }

    async function loadVideo() {
      // 1. Try to load from IndexedDB cache
      const cachedBlob = await getCachedVideo();
      if (!active) return;

      if (cachedBlob) {
        // Cache hit: create local Object URL
        localUrl = URL.createObjectURL(cachedBlob);
        setVideoSrc(localUrl);
      } else {
        // Cache miss: stream from network & cache in background
        fetch(DEFAULT_VIDEO_URL)
          .then((res) => {
            if (!res.ok) throw new Error("Network fetch failed");
            return res.blob();
          })
          .then((blob) => {
            if (active) {
              cacheVideo(blob);
            }
          })
          .catch((err) => console.warn("Background video caching failed:", err));
      }
    }

    loadVideo();

    return () => {
      active = false;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 border-b border-border overflow-hidden">
      <div className="civic-stripe-bar w-full relative z-20" aria-hidden />

      {/* Video background — crisp, natural, darkened with elegant deep green/organic overlay */}
      <div className="absolute inset-0 z-0 bg-emerald-950" aria-hidden>
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.75] contrast-[1.08] pointer-events-none [transform:translate3d(0,0,0)] [will-change:transform]"
        />
        {/* Beautiful subtle green gradient overlay to make text pop while keeping the video extremely visible and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/35 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-950/95 z-0" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.85fr] gap-10 lg:gap-12 items-center lg:min-h-[440px]">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-emerald-500/25 bg-emerald-950/90 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Official JATA Platform
            </div>

            <h1 className="font-civic text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-white drop-shadow-md">
              Digital backbone for <span className="text-emerald-400">Jigawa&apos;s agricultural transformation</span>
            </h1>

            <p className="text-zinc-200 text-base sm:text-lg max-w-xl leading-relaxed drop-shadow-sm">
              Empowering extension agents, connecting farmers to markets, and giving
              leadership real-time intelligence across all 27 LGAs.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                variant="governmentPrimary"
                size="lg"
                className="group rounded-sm shadow-md"
                onClick={() => navigate("/farmer-registration")}
              >
                Register as Farmer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-sm border-white/20 bg-white/15 hover:bg-white/25 text-white transition-colors"
                onClick={() => {
                  const el = document.getElementById("modules");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore Modules
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="landing-card px-4 py-2.5 border border-emerald-500/20 bg-emerald-950/85 shadow-lg"
                >
                  <p className="text-lg font-semibold text-emerald-400 leading-none">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Governor portrait — stunning modern glassmorphic panel */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] sm:max-w-[360px] bg-emerald-950/92 border border-emerald-500/25 p-5 rounded-md shadow-2xl relative">
              <div className="relative p-1.5 bg-emerald-800/40 border border-emerald-500/30 shadow-md">
                <div className="p-1 bg-emerald-950/20 border border-emerald-500/20">
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      src={governor.image}
                      alt={governor.name}
                      className="w-full h-full object-cover object-top filter brightness-[1.05]"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-sm bg-white p-1.5 shadow-lg border border-zinc-200">
                  <img
                    src={jigawaLogo}
                    alt="Jigawa State Government"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  {governor.role}
                </p>
                <p className="font-civic text-xl font-bold text-white mt-1">
                  {governor.name}
                </p>
                <p className="text-sm text-zinc-300 mt-0.5">
                  {governor.ministry}
                </p>
                
                {/* Quote inspired by the second image */}
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] italic text-zinc-300/90 leading-relaxed">
                  &ldquo;Transforming Jigawa&apos;s agrarian economy through digital innovation and empowering our rural communities for sustainable agricultural development.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
