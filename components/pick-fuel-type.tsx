"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fuelTypes } from "@/data";
import { useChat } from "ai/react";
import { useState } from "react";

export const PickFuelType = () => {
  const [hasPicked, setHasPicked] = useState(false);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleClick = (type: string) => {
    setHasPicked(true);
    append({
      role: "user",
      content: `I want a car that runs on fuel type: ${type}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pick your fuel type</CardTitle>
        <CardDescription>
          Select the type of fuel you want your car to run on
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
