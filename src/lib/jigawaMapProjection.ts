import { jigawaLGABounds, jigawaStateBounds } from "@/lib/lgaBounds";

const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 130;

const [[south, west], [north, east]] = jigawaStateBounds.bounds;

/** Project lat/lng to SVG coordinates within the Jigawa view box only */
export function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - west) / (east - west)) * VIEW_WIDTH;
  const y = ((north - lat) / (north - south)) * VIEW_HEIGHT;
  return { x, y };
}

export const jigawaMapViewBox = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`;

/**
 * Approximate Jigawa State outer boundary (lat, lng).
 * Traces the state border only — not Nigeria, not neighbouring states.
 */
const jigawaBoundaryLatLng: [number, number][] = [
  [12.92, 8.28],
  [13.02, 8.55],
  [13.05, 9.15],
  [13.02, 9.75],
  [13.05, 10.35],
  [12.72, 10.52],
  [12.35, 10.48],
  [12.05, 10.38],
  [11.72, 10.12],
  [11.08, 10.02],
  [11.05, 9.55],
  [11.12, 9.12],
  [11.35, 8.82],
  [11.85, 8.38],
  [12.35, 8.22],
  [12.72, 8.25],
  [12.92, 8.28],
];

function boundaryToPath(points: [number, number][]): string {
  return (
    points
      .map(([lat, lng], i) => {
        const { x, y } = latLngToSvg(lat, lng);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

export const jigawaStateOutlinePath = boundaryToPath(jigawaBoundaryLatLng);

export const jigawaLgaPoints = Object.values(jigawaLGABounds).map((lga) => ({
  name: lga.name,
  ...latLngToSvg(lga.center[0], lga.center[1]),
}));

export const jigawaHubPoints = [
  { name: "Dutse", lga: "Dutse", type: "State HQ" },
  { name: "Hadejia", lga: "Hadejia", type: "Innovation Hub" },
  { name: "Gumel", lga: "Gumel", type: "Service Center" },
  { name: "Kazaure", lga: "Kazaure", type: "Service Center" },
  { name: "Ringim", lga: "Ringim", type: "Extension Zone" },
].map((hub) => {
  const lga = jigawaLGABounds[hub.lga];
  const pos = latLngToSvg(lga.center[0], lga.center[1]);
  return { ...hub, ...pos };
});
