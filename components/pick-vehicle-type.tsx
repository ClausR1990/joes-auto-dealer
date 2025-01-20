"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { vehicleTypes } from "@/data";
import { useChat } from "ai/react";
import { useState } from "react";

export const PickVehicleType = () => {
  const [hasPicked, setHasPicked] = useState(false);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleClick = (type: string) => {
    setHasPicked(true);
    append({
      role: "user",
      content: `I want a vehicle type of: ${type}`,
    });
  };

  return (
    <Card className="w-full max-w-lg skeleton-bg">
      <CardHeader>
        <CardTitle>Pick your vehicle type</CardTitle>
        <CardDescription>
          Select the type of vehicle you are looking for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 w-full">
          {vehicleTypes?.map((carType) => (
            <Button
              key={carType.name}
              variant="outline"
              className="flex items-center gap-2 h-auto flex-col [&_svg]:size-16 skeleton-div"
              disabled={hasPicked}
              onClick={() => handleClick(carType.name)}
            >
              {carType.icon && <carType.icon />}
              <span className="text-muted-foreground">{carType.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
