import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const livestockTypes = [
  { value: "cattle", label: "Cattle" },
  { value: "goats", label: "Goats" },
  { value: "sheep", label: "Sheep" },
  { value: "poultry", label: "Poultry" },
  { value: "camels", label: "Camels" },
  { value: "donkeys", label: "Donkeys" },
];

interface LivestockData {
  types: string[];
  counts: Record<string, number>;
}

interface StepLivestockDetailsProps {
  onNext: (data: LivestockData) => void;
  onBack: () => void;
  initialData?: Partial<LivestockData>;
}

export function StepLivestockDetails({ onNext, onBack, initialData = {} }: StepLivestockDetailsProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialData.types || []);
  const [counts, setCounts] = useState<Record<string, number>>(initialData.counts || {});
  const [isLoading, setIsLoading] = useState(false);

  const toggleType = (value: string) => {
    setSelectedTypes(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        const newCounts = { ...counts };
        delete newCounts[value];
        setCounts(newCounts);
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleCountChange = (value: string, count: string) => {
    setCounts(prev => ({
      ...prev,
      [value]: parseInt(count) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    onNext({ types: selectedTypes, counts });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Livestock Details</h3>
        <p className="text-sm text-muted-foreground">
          Select the types of livestock you own and specify the quantity for each.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <Label>Livestock Types</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {livestockTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTypes.includes(type.value)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary'
                }`}
              >
                <Checkbox
                  checked={selectedTypes.includes(type.value)}
                  onCheckedChange={() => toggleType(type.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm font-medium">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {selectedTypes.length > 0 && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <Label>Quantity Owned</Label>
            <div className="grid gap-4">
              {selectedTypes.map(typeValue => {
                const typeLabel = livestockTypes.find(t => t.value === typeValue)?.label;
                return (
                  <div key={typeValue} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center border p-3 rounded-md bg-secondary/20">
                    <span className="text-sm font-medium">Number of {typeLabel}</span>
                    <Input
                      type="number"
                      min="1"
                      required
                      placeholder={`Enter count for ${typeLabel}`}
                      value={counts[typeValue] || ''}
                      onChange={(e) => handleCountChange(typeValue, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={onBack} className="gap-2" disabled={isLoading}>
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>
          <Button type="submit" className="gap-2 min-w-[120px]" disabled={selectedTypes.length === 0 || isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
