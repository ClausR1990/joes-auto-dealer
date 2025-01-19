"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

const budgetRanges = [
  { label: "Economy", min: 20000, max: 35000, color: "bg-green-500" },
  { label: "Mid-Range", min: 35000, max: 50000, color: "bg-blue-500" },
  { label: "Luxury", min: 50000, max: 80000, color: "bg-purple-500" },
  { label: "Premium", min: 80000, max: 100000, color: "bg-rose-500" },
];

export default function PickBudget() {
  const [budget, setBudget] = React.useState(50000);
  const [selectedRange, setSelectedRange] = React.useState(budgetRanges[1]);

  const handleSliderChange = (value: number[]) => {
    setBudget(value[0]);
    const newRange = budgetRanges.find(
      (range) => value[0] >= range.min && value[0] <= range.max
    );
    if (newRange && newRange !== selectedRange) {
      setSelectedRange(newRange);
    }
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Select Your Budget</h2>
            <p className="text-muted-foreground">
              Choose a comfortable price range for your dream car
            </p>
          </div>

          <motion.div
            className="text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-4xl font-bold mb-2 flex items-center justify-center">
              {/* <DollarSign className="w-8 h-8 mr-1" /> */}
              <motion.span
                key={budget}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {formatBudget(budget)}
              </motion.span>
            </div>
            <motion.p
              className="text-muted-foreground"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {selectedRange.label} Range
            </motion.p>
          </motion.div>

          <div className="px-3">
            <Slider
              defaultValue={[50000]}
              max={100000}
              min={20000}
              step={1000}
              value={[budget]}
              onValueChange={handleSliderChange}
              className="mb-6"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {budgetRanges.map((range) => (
              <Button
                key={range.label}
                variant={selectedRange === range ? "secondary" : "outline"}
                className="relative overflow-hidden"
                onClick={() => {
                  setBudget(range.min);
                  setSelectedRange(range);
                }}
              >
                <AnimatePresence>
                  {selectedRange === range && (
                    <motion.div
                      className={`absolute inset-0 opacity-20 ${range.color}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{range.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full" size="lg">
                Next
                <ArrowRight />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
