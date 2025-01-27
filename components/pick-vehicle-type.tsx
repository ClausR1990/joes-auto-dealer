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

export const PickVehicleType = () => {
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
      content: `I want a vehicle type of: ${type}`,
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
              Pick your vehicle type
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Select the type of vehicle you are looking for
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full"
            variants={!hasPicked ? container : undefined}
            initial={!hasPicked ? "hidden" : false}
            animate={!hasPicked ? "show" : false}
          >
            {vehicleTypes?.map((carType) => (
              <motion.div
                key={carType.name}
                variants={!hasPicked ? item : undefined}
                whileHover={!hasPicked ? { scale: 1.05 } : {}}
                whileTap={!hasPicked ? { scale: 0.95 } : {}}
                onHoverStart={() => !hasPicked && setHoveredType(carType.name)}
                onHoverEnd={() => !hasPicked && setHoveredType(null)}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "relative w-full h-full flex items-center gap-2 flex-col",
                    "md:[&_svg]:size-16 [&_svg]:size-10",
                    "skeleton-div hyphens-auto",
                    "transition-all duration-300",
                    {
                      "bg-primary/10 ring-2 ring-primary":
                        !hasPicked && hoveredType === carType.name,
                      "opacity-50": hasPicked && hoveredType !== carType.name,
                    }
                  )}
                  disabled={hasPicked}
                  onClick={() => handleClick(carType.name)}
                >
                  <div className="transition-transform duration-300">
                    {carType.icon && (
                      <carType.icon
                        className={cn("transition-colors duration-300", {
                          "text-primary":
                            !hasPicked && hoveredType === carType.name,
                          "text-muted-foreground": !(
                            !hasPicked && hoveredType === carType.name
                          ),
                        })}
                      />
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-sm md:text-base font-medium block w-full text-center",
                      "hyphens-auto break-words whitespace-normal",
                      "transition-colors duration-300 leading-none",
                      {
                        "text-primary":
                          !hasPicked && hoveredType === carType.name,
                        "text-muted-foreground": !(
                          !hasPicked && hoveredType === carType.name
                        ),
                      }
                    )}
                  >
                    {carType.name}
                  </span>

                  {!hasPicked && hoveredType === carType.name && (
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
