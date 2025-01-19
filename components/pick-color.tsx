"use client";

import { Check } from "lucide-react";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const colors = [
  {
    name: "Cherry Red",
    value: "red",
    class: "bg-gradient-to-r from-red-600 to-red-500",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Ocean Blue",
    value: "blue",
    class: "bg-gradient-to-r from-blue-600 to-blue-500",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Midnight Black",
    value: "black",
    class: "bg-gradient-to-r from-gray-900 to-gray-800",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]",
  },
  {
    name: "Sterling Grey",
    value: "grey",
    class: "bg-gradient-to-r from-gray-500 to-gray-400",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Sunburst Yellow",
    value: "yellow",
    class: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Forest Green",
    value: "green",
    class: "bg-gradient-to-r from-green-700 to-green-600",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
];

export default function PickColor() {
  const [selectedColor, setSelectedColor] = React.useState(colors[0].value);
  const selectedColorData = colors.find((c) => c.value === selectedColor);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Choose Your Car Color</CardTitle>
        <CardDescription>
          Select from our premium metallic paint options
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-center p-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg">
          <div className="relative w-full max-w-[280px] aspect-[2/1] rounded-lg overflow-hidden shadow-xl">
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300",
                selectedColorData?.class,
                selectedColorData?.metallic
              )}
            />
          </div>
        </div>
        <RadioGroup
          defaultValue={selectedColor}
          onValueChange={setSelectedColor}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {colors.map((color) => (
            <div key={color.value}>
              <RadioGroupItem
                value={color.value}
                id={color.value}
                className="peer sr-only"
                aria-label={color.name}
              />
              <Label
                htmlFor={color.value}
                className="flex flex-col items-center text-center h-full justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="relative h-10 w-10 rounded-full border border-gray-200 overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0",
                      color.class,
                      color.metallic
                    )}
                  />
                  {selectedColor === color.value && (
                    <Check
                      className={cn(
                        "absolute inset-0 m-auto h-4 w-4 z-10",
                        color.value === "yellow" ? "text-black" : "text-white"
                      )}
                    />
                  )}
                </div>
                <span className="mt-2 text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {color.name}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
