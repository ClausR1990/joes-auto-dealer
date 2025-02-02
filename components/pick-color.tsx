"use client";

import { ArrowRight, Check } from "lucide-react";
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
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const colors = [
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
  {
    name: "Royal Purple",
    value: "purple",
    class: "bg-gradient-to-r from-purple-700 to-purple-600",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Crimson Pink",
    value: "pink",
    class: "bg-gradient-to-r from-pink-600 to-pink-500",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Burnt Orange",
    value: "orange",
    class: "bg-gradient-to-r from-orange-600 to-orange-500",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  {
    name: "Ice Silver",
    value: "silver",
    class: "bg-gradient-to-r from-gray-300 to-gray-200",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-black/20 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)]",
  },
  {
    name: "Bronze Blaze",
    value: "bronze",
    class: "bg-gradient-to-r from-yellow-700 to-yellow-600",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/25 before:via-transparent before:to-black/30 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_50%)]",
  },
  {
    name: "Copper Glow",
    value: "copper",
    class: "bg-gradient-to-r from-orange-700 to-orange-600",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/25 before:via-transparent before:to-black/30 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_50%)]",
  },
  {
    name: "Pearl White",
    value: "white",
    class: "bg-gradient-to-r from-gray-100 to-gray-50",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:via-transparent before:to-black/10 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_50%)]",
  },
  {
    name: "Electric Lime",
    value: "lime",
    class: "bg-gradient-to-r from-lime-600 to-lime-500",
    metallic:
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-black/40 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
];

export default function PickColor() {
  const [selectedColor, setSelectedColor] = React.useState(colors[0].value);
  const [hasSelected, setHasSelected] = React.useState(false);
  const selectedColorData = colors.find((c) => c.value === selectedColor);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleClick = () => {
    setHasSelected(true);
    append({
      role: "user",
      content: `I want a ${selectedColorData?.name} colored car`,
    });
  };

  return (
    <Card className="w-full max-w-lg skeleton-bg">
      <CardHeader>
        <CardTitle>Choose Your Car Color</CardTitle>
        <CardDescription>
          Select from our premium metallic paint options
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-center p-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg">
          <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] max-w-full rounded-lg overflow-hidden shadow-xl">
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300",
                "metallic-noise metallic-shine size-full",
                selectedColorData?.class,
                selectedColorData?.metallic
              )}
            />
          </div>
        </div>
        <RadioGroup
          defaultValue={selectedColor}
          onValueChange={setSelectedColor}
          className="grid grid-cols-1 gap-2"
          disabled={hasSelected}
        >
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
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
                  className="flex items-center gap-3 rounded-lg border border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="relative h-8 w-8 rounded-full border border-gray-200 overflow-hidden shrink-0">
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
                  <span className="text-sm font-medium truncate peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {color.name}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full"
              size="lg"
              onClick={handleClick}
              disabled={hasSelected}
            >
              Next
              <ArrowRight />
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
