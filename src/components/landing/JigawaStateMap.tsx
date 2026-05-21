import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { jigawaLGABounds } from "@/lib/lgaBounds";

function MapBoundsFitter({ bounds }: { bounds: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      // Invalidate map size and fit to custom bounds with comfortable 35px padding to prevent cropping
      const timer = setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [35, 35] });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [bounds, map]);
  return null;
}

const jigawaHubPoints = [
  { name: "Dutse", lga: "Dutse", type: "State HQ" },
  { name: "Hadejia", lga: "Hadejia", type: "Innovation Hub" },
  { name: "Gumel", lga: "Gumel", type: "Service Center" },
  { name: "Kazaure", lga: "Kazaure", type: "Service Center" },
  { name: "Ringim", lga: "Ringim", type: "Extension Zone" },
];

// Donut Mask Outer Ring: covers the entire globe to block all surrounding states and regions
const outerWorldRing: [number, number][] = [
  [90, -180],
  [90, 180],
  [-90, 180],
  [-90, -180],
  [90, -180],
];

export function JigawaStateMap() {
  const [activeLga, setActiveLga] = useState<string | null>(null);
  const [geojsonData, setGeojsonData] = useState<any>(null);

  useEffect(() => {
    fetch("/jigawa-boundary.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load map data");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0 && data[0].geojson) {
          setGeojsonData(data[0].geojson);
        }
      })
      .catch((err) => console.error("Error loading Jigawa boundary:", err));
  }, []);

  const convertCoordinates = (coordinates: [number, number][]): [number, number][] => {
    return coordinates.map(([lng, lat]) => [lat, lng]);
  };

  if (!geojsonData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[hsl(142_20%_96%)] text-primary">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-wider">Loading Jigawa map...</span>
        </div>
      </div>
    );
  }

  const jigawaLatLngs = convertCoordinates(geojsonData.coordinates[0]);

  // Premium, customized DivIcon for LGA markers (subtle green ring with reduced default opacity)
  const lgaIcon = L.divIcon({
    className: "custom-lga-icon-container",
    html: `<div class="w-3.5 h-3.5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 hover:bg-primary/40"><span class="w-1.5 h-1.5 rounded-full bg-primary/70"></span></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  // Premium, customized pulsing red DivIcon for main JATA facilities
  const hubIcon = L.divIcon({
    className: "custom-hub-icon-container",
    html: `<div class="relative flex items-center justify-center">
      <span class="absolute inline-flex h-5 w-5 rounded-full bg-accent/40 animate-ping"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-accent border-2 border-white shadow-md"></span>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md isolate">
      <MapContainer
        center={[12.18, 9.42]}
        zoom={7.5}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={true}
        className="h-full w-full z-0"
        style={{ background: "hsl(142 20% 96%)" }}
        maxBounds={[
          [9.5, 6.5],
          [14.5, 12.5],
        ]}
        minZoom={6.0}
        maxZoom={11.0}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Dynamically fit map bounds to avoid clipping or excessive zoom */}
        <MapBoundsFitter bounds={jigawaLatLngs} />

        {/* Donut Mask: solid background layer covering all parts of the world except Jigawa State */}
        <Polygon
          positions={[outerWorldRing, jigawaLatLngs]}
          pathOptions={{
            fillColor: "hsl(142 20% 96%)",
            fillOpacity: 1.0,
            stroke: false,
          }}
        />

        {/* Jigawa State outline: premium green stroke marking the official boundary */}
        <Polygon
          positions={jigawaLatLngs}
          pathOptions={{
            fillColor: "transparent",
            color: "hsl(142 70% 32%)",
            weight: 2.8,
            lineJoin: "round",
            lineCap: "round",
          }}
        />

        {/* LGA Centers */}
        {Object.values(jigawaLGABounds).map((lga) => (
          <Marker
            key={lga.name}
            position={lga.center}
            icon={lgaIcon}
            eventHandlers={{
              mouseover: () => setActiveLga(lga.name),
              mouseout: () => setActiveLga(null),
            }}
          >
            <Tooltip direction="top" offset={[0, -5]} opacity={0.95}>
              <span className="font-semibold text-[11px] text-foreground font-display">
                {lga.name} LGA
              </span>
            </Tooltip>
          </Marker>
        ))}

        {/* JATA Facility Hubs */}
        {jigawaHubPoints.map((hub) => {
          const lgaData = jigawaLGABounds[hub.lga];
          if (!lgaData) return null;
          return (
            <Marker key={hub.name} position={lgaData.center} icon={hubIcon}>
              <Tooltip direction="top" offset={[0, -8]} opacity={0.98}>
                <div className="p-1 px-1.5 text-center text-xs font-display">
                  <p className="font-bold text-foreground leading-none">{hub.name}</p>
                  <p className="text-[10px] text-accent font-semibold mt-0.5">{hub.type}</p>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Glassmorphic Legend */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 text-[10px] bg-card/95 border border-border rounded-sm px-2.5 py-2 z-10 shadow-md">
        <span className="flex items-center gap-2 text-muted-foreground font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
            <span className="w-1 h-1 rounded-full bg-primary"></span>
          </span>
          LGA Center
        </span>
        <span className="flex items-center gap-2 text-muted-foreground font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-accent border border-white shrink-0 shadow-sm" />
          JATA Facility
        </span>
      </div>

      {/* Active LGA glassmorphic tooltip card at bottom */}
      {activeLga && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-[220px] px-3.5 py-2.5 bg-card/98 border border-border text-xs rounded-sm shadow-lg z-10 animate-fade-in select-none">
          <span className="font-semibold text-foreground">{activeLga}</span>
          <span className="text-muted-foreground"> — Local Government Area</span>
        </div>
      )}
    </div>
  );
}
