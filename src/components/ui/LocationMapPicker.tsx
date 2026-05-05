import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import { getLGABounds, jigawaStateBounds } from '@/lib/lgaBounds';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapPickerProps {
    onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
    selectedLga?: string; // Optional LGA to zoom to
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

// Component to update map bounds when LGA changes
function MapUpdater({ selectedLga }: { selectedLga?: string }) {
    const map = useMap();
    
    useEffect(() => {
        if (selectedLga) {
            const lgaBounds = getLGABounds(selectedLga);
            // Fit map to LGA bounds with padding
            map.fitBounds(lgaBounds.bounds, { padding: [20, 20] });
        } else {
            // No LGA selected, show entire Jigawa State
            map.fitBounds(jigawaStateBounds.bounds, { padding: [20, 20] });
        }
    }, [selectedLga, map]);
    
    return null;
}

export function LocationMapPicker({ onLocationSelect, selectedLga }: LocationMapPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPos, setSelectedPos] = useState<{lat: number, lng: number} | null>(null);

    const handleSelect = () => {
        if (selectedPos) {
             const mockAddress = `Location: ${selectedPos.lat.toFixed(5)}, ${selectedPos.lng.toFixed(5)}`;
             onLocationSelect({ ...selectedPos, address: mockAddress });
             setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Select on Map" type="button">
                    <MapPin className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Select Location</DialogTitle>
                </DialogHeader>
                <div className="h-[400px] w-full rounded-md overflow-hidden border relative isolate">
                    <MapContainer 
                        center={selectedLga ? getLGABounds(selectedLga).center : jigawaStateBounds.center}
                        zoom={selectedLga ? 11 : 9}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; Google Maps'
                            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                        />
                        <MapUpdater selectedLga={selectedLga} />
                        <LocationMarker onLocationSelect={(lat, lng) => setSelectedPos({lat, lng})} />
                    </MapContainer>
                    
                    {selectedPos && (
                         <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[1000] flex justify-between items-center border">
                            <span className="text-xs sm:text-sm font-medium">
                                {selectedPos.lat.toFixed(5)}, {selectedPos.lng.toFixed(5)}
                            </span>
                            <Button size="sm" onClick={handleSelect}>Confirm Location</Button>
                         </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
