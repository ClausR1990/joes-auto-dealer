"use client";

import { Button } from "@/components/ui/button";
import { Battery, Droplet, Gauge, Zap } from "lucide-react";
import { useState } from "react";

const fuelTypes = [
  { name: "Petrol", icon: Gauge },
  { name: "Diesel", icon: Droplet },
  { name: "Electric", icon: Zap },
  { name: "Hybrid", icon: Battery },
];

export const PickFuelType = () => {
  const [hasPicked, setHasPicked] = useState(false);

  const handleClick = (type: string) => {
    console.log(`Picked ${type}`);
    setHasPicked(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-2xl w-full">
      <h2 className="font-bold text-2xl">Pick your fuel type</h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        {fuelTypes.map((fuelType) => (
          <Button
            key={fuelType.name}
            variant="outline"
            className="flex items-center gap-2 h-auto flex-col p-6 [&_svg]:size-8"
            disabled={hasPicked}
            onClick={() => handleClick(fuelType.name)}
          >
            {fuelType.icon && (
              <fuelType.icon className="size-16" strokeWidth={1.5} />
            )}
            <span className="text-muted-foreground">{fuelType.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
