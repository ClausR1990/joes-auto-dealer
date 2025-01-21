"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

type Budget = {
  label: "Economy" | "Mid-Range" | "Luxury" | "Premium";
  min: number;
  max: number;
  color: string;
};

type BudgetRangeProps = {
  budgets?: Budget[];
};

const getMinBudget = (budgets?: Budget[]) => {
  return (
    budgets?.reduce((acc, curr) => (acc.min < curr.min ? acc : curr)).min ?? 0
  );
};

const getMaxBudget = (budgets?: Budget[]) => {
  return (
    budgets?.reduce((acc, curr) => (acc.max > curr.max ? acc : curr)).max ?? 0
  );
};

const getMidRangeBudget = (budgets?: Budget[]) => {
  return (
    budgets?.find((range) => range.label === "Mid-Range")?.min ??
    budgets?.[1].min ??
    0
  );
};

export default function PickBudget({ budgets }: BudgetRangeProps) {
  const [budget, setBudget] = React.useState(50000);
  const [hasSelected, setHasSelected] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState(budgets?.[1]);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleSliderChange = (value: number[]) => {
    setBudget(value[0]);
    const newRange = budgets?.find(
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

  const handleClick = () => {
    setHasSelected(true);
    append({
      role: "user",
      content: `My budget is: ${formatBudget(budget)}`,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto skeleton-bg">
      <CardHeader>
        <CardTitle>Select Your Budget</CardTitle>
        <CardDescription>
          Choose a comfortable price range for your dream car
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
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
              {selectedRange?.label} Range
            </motion.p>
          </motion.div>

          <div className="px-3">
            <Slider
              defaultValue={[
                Math.round(getMidRangeBudget(budgets) / 1000) * 1000,
              ]}
              max={getMaxBudget(budgets)}
              min={getMinBudget(budgets)}
              step={1000}
              value={[budget]}
              onValueChange={handleSliderChange}
              className="mb-6 skeleton-div"
              disabled={hasSelected}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {budgets &&
              budgets?.map((range) => (
                <Button
                  key={range.label}
                  variant={selectedRange === range ? "secondary" : "outline"}
                  className="relative overflow-hidden"
                  onClick={() => {
                    // Round to nearest thousand
                    const roundedBudget = Math.round(range.min / 1000) * 1000;
                    setBudget(roundedBudget);
                    setSelectedRange(range);
                  }}
                  disabled={hasSelected}
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
              <Button
                className="w-full skeleton-div"
                size="lg"
                onClick={handleClick}
                disabled={hasSelected}
              >
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
