"use client";

import { ClientMessage } from "@/app/actions";
import { AI } from "@/app/ai";
import { useConversation } from "@/hooks/use-conversation";
import { useActions } from "ai/rsc";
import { useState } from "react";
import {
  Convertible,
  Coupe,
  HatchBack,
  Sedan,
  StationWagon,
  SUV,
} from "./car-icons";
import { Button } from "./ui/button";

const carTypes = [
  { name: "Sedan", icon: Sedan },
  { name: "SUV", icon: SUV },
  { name: "Station Wagon", icon: StationWagon },
  { name: "Hatchback", icon: HatchBack },
  { name: "Coupe", icon: Coupe },
  { name: "Convertible", icon: Convertible },
];

export const PickVehicleType = () => {
  const [hasPicked, setHasPicked] = useState(false);
  const { sendMessage } = useActions<typeof AI>();
  const { handler } = useConversation<ClientMessage>({
    serverAction: sendMessage,
  });

  const handleClick = (type: string) => {
    console.log(`Picked ${type}`);
    setHasPicked(true);
    handler(`I want a vehicle type of: ${type}`);
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-2xl w-full">
      <h2 className="font-bold text-2xl">Pick your vehicle type</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {carTypes.map((carType) => (
          <Button
            key={carType.name}
            variant="outline"
            className="flex items-center gap-2 h-auto flex-col [&_svg]:size-16"
            disabled={hasPicked}
            onClick={() => handleClick(carType.name)}
          >
            {carType.icon && <carType.icon />}
            <span className="text-muted-foreground">{carType.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
