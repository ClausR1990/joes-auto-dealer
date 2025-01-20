"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, Check, CircleDashed } from "lucide-react";
import * as React from "react";

type Brand = {
  id: string;
  name: string;
  origin: string;
};

type PickBrandProps = {
  carBrands?: Brand[];
};

export default function PickBrand({ carBrands }: PickBrandProps) {
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [noPreference, setNoPreference] = React.useState(false);
  const [hasSelected, setHasSelected] = React.useState(false);
  const { append } = useChat({
    id: "auto-dealer",
  });
  const handleBrandToggle = (brandId: string) => {
    if (noPreference) {
      setNoPreference(false);
    }

    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId);
      }
      return [...prev, brandId];
    });
  };

  const handleNoPreference = () => {
    if (noPreference) {
      setNoPreference(false);
    } else {
      setNoPreference(true);
      setSelectedBrands([]);
    }
  };

  const handleClick = () => {
    if (noPreference) {
      append({
        role: "user",
        content: "I want a car from any brand",
      });
    } else {
      const brands = selectedBrands.map(
        (id) => carBrands?.find((brand) => brand.id === id)?.name
      );
      append({
        role: "user",
        content: `I want a car from: ${brands.join(", ")}`,
      });
    }
    setHasSelected(true);
  };

  const groupedBrands = carBrands?.reduce((acc, brand) => {
    if (!acc[brand.origin]) {
      acc[brand.origin] = [];
    }
    acc[brand.origin].push(brand);
    return acc;
  }, {} as Record<string, typeof carBrands>);

  return (
    <Card className="w-full max-w-lg mx-auto skeleton-bg">
      <CardHeader>
        <CardTitle>Choose Your Preferred Brands</CardTitle>
        <CardDescription>
          Select multiple brands or choose &quot;No Preference&quot;
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              variant={noPreference ? "default" : "outline"}
              className="w-full relative skeleton-div"
              onClick={handleNoPreference}
              disabled={hasSelected}
            >
              <AnimatePresence>
                {noPreference && (
                  <motion.div
                    className="absolute inset-0 bg-primary opacity-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
                )}
              </AnimatePresence>
              <CircleDashed className="mr-2 h-4 w-4" />
              No Preference
            </Button>
          </motion.div>

          <div className="relative">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {groupedBrands &&
                  Object.entries(groupedBrands).map(([origin, brands]) => (
                    <div key={origin} className="space-y-3">
                      <Badge variant="outline" className="mb-2">
                        {origin}
                      </Badge>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map((brand) => (
                          <motion.div
                            key={brand.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant={
                                selectedBrands.includes(brand.id)
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full relative"
                              onClick={() => handleBrandToggle(brand.id)}
                              disabled={noPreference || hasSelected}
                            >
                              <AnimatePresence>
                                {selectedBrands.includes(brand.id) && (
                                  <motion.div
                                    className="absolute inset-0 bg-primary opacity-10"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                  />
                                )}
                              </AnimatePresence>
                              <span className="relative z-10">
                                {brand.name}
                              </span>
                              {selectedBrands.includes(brand.id) && (
                                <Check className="ml-2 h-4 w-4" />
                              )}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full skeleton-div"
              size="lg"
              disabled={
                (!noPreference && selectedBrands.length === 0) || hasSelected
              }
              onClick={handleClick}
            >
              <Car className="mr-2 h-4 w-4" />
              {noPreference
                ? "Go with all brands"
                : `Choose ${selectedBrands.length} Selected Brand${
                    selectedBrands.length !== 1 ? "s" : ""
                  }`}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
