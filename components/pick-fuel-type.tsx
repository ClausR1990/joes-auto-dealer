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
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export const PickFuelType = () => {
  const searchParams = useSearchParams();
  const [hasPicked, setHasPicked] = useState(false);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const { append } = useChat({
    id: searchParams.get("chatId") as string,
  });

  const handleClick = (type: string) => {
    setHasPicked(true);
    setHoveredType(null);
    append({
      role: "user",
      content: `I want a car that runs on fuel type: ${type}`,
    });
  };

  return (
    <motion.div
      initial={!hasPicked ? { opacity: 0, y: 20 } : false}
      animate={!hasPicked ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-lg skeleton-bg backdrop-blur-sm bg-background/95">
        <CardHeader>
          <motion.div
            initial={!hasPicked ? { opacity: 0, x: -20 } : false}
            animate={!hasPicked ? { opacity: 1, x: 0 } : false}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold">
              Pick your fuel type
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Select the type of fuel you want your car to run on
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid grid-cols-2 gap-4 w-full"
            variants={!hasPicked ? container : undefined}
            initial={!hasPicked ? "hidden" : false}
            animate={!hasPicked ? "show" : false}
          >
            {fuelTypes.map((fuelType) => (
              <motion.div
                key={fuelType.name}
                variants={!hasPicked ? item : undefined}
                whileHover={!hasPicked ? { scale: 1.05 } : {}}
                whileTap={!hasPicked ? { scale: 0.95 } : {}}
                onHoverStart={() => !hasPicked && setHoveredType(fuelType.name)}
                onHoverEnd={() => !hasPicked && setHoveredType(null)}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "relative w-full h-full flex items-center gap-2 flex-col p-6",
                    "transition-all duration-300",
                    {
                      "bg-primary/10 ring-2 ring-primary":
                        !hasPicked && hoveredType === fuelType.name,
                      "opacity-50": hasPicked && hoveredType !== fuelType.name,
                    }
                  )}
                  disabled={hasPicked}
                  onClick={() => handleClick(fuelType.name)}
                >
                  <div className="transition-transform duration-300">
                    {fuelType.icon && (
                      <fuelType.icon
                        className={cn(
                          "size-16 transition-colors duration-300",
                          {
                            "text-primary":
                              !hasPicked && hoveredType === fuelType.name,
                            "text-muted-foreground": !(
                              !hasPicked && hoveredType === fuelType.name
                            ),
                          }
                        )}
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-sm md:text-base font-medium",
                      "transition-colors duration-300",
                      {
                        "text-primary":
                          !hasPicked && hoveredType === fuelType.name,
                        "text-muted-foreground": !(
                          !hasPicked && hoveredType === fuelType.name
                        ),
                      }
                    )}
                  >
                    {fuelType.name}
                  </span>

                  {!hasPicked && hoveredType === fuelType.name && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-lg"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
