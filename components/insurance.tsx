import { motion } from "framer-motion";
import { Calculator, Loader2, Shield } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InsuranceCalculatorProps } from "@/data/schemas";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import { AnimatedCheckMark } from "./magic-ui/animated-checkmark";

export default function InsuranceCalculator({
  carValue = 35000,
  carMake = "Tesla",
  carModel = "Model 3",
  baseRate = 100,
  additionals = [
    {
      name: "Comprehensive Coverage",
      description: "Covers theft, weather damage, vandalism",
      price: 30,
    },
    {
      name: "Collision Coverage",
      description: "Covers damage from accidents",
      price: 40,
    },
    {
      name: "Roadside Assistance",
      description: "24/7 emergency assistance",
      price: 10,
    },
    {
      name: "Rental Coverage",
      description: "Covers rental car costs",
      price: 15,
    },
  ],
}: InsuranceCalculatorProps) {
  const searchParams = useSearchParams();
  const [deductible, setDeductible] = useState(500);
  const [selectedAdditionals, setSelectedAdditionals] = useState<Set<string>>(
    new Set([additionals[0]?.name, additionals[1]?.name].filter(Boolean))
  );
  const [hasSelected, setHasSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const { append } = useChat({
    id: searchParams.get("chatId") as string,
  });

  const calculateMonthlyPremium = () => {
    let premium = baseRate;

    premium *= 1 + carValue / 100000;
    premium *= 1 - (deductible - 500) / 5000;

    additionals.forEach((additional) => {
      if (selectedAdditionals.has(additional.name)) {
        premium += additional.price;
      }
    });

    return Math.max(premium, 50);
  };

  const monthlyPremium = Math.round(calculateMonthlyPremium());
  const annualPremium = monthlyPremium * 12;
  const additionalCost = additionals.reduce(
    (total, additional) =>
      selectedAdditionals.has(additional.name)
        ? total + additional.price
        : total,
    0
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const handleToggleAdditional = (name: string) => {
    setSelectedAdditionals((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handlePurchaseInsurance = async () => {
    setIsLoading(true);

    // Simulate insurance verification API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsApproved(true);
    setHasSelected(true);

    const selectedCoverages = additionals
      .filter((additional) => selectedAdditionals.has(additional.name))
      .map((additional) => additional.name)
      .join(", ");

    append({
      role: "system",
      content: `Insurance quote approved! Your premium will be ${formatter.format(
        monthlyPremium
      )} per month with a ${formatter.format(
        deductible
      )} deductible. Coverage includes: ${selectedCoverages}. Please proceed to purchase. Show the payment form to the user.`,
    });
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="size-4 animate-spin" />
          Verifying Coverage
        </>
      );
    }
    if (isApproved) {
      return (
        <>
          <AnimatedCheckMark />
          Quote Approved
        </>
      );
    }
    return "Purchase Insurance";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Insure Your {carMake} {carModel}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="coverage" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coverage">Coverage</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="coverage" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Deductible</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[deductible]}
                      onValueChange={([value]) => setDeductible(value)}
                      min={250}
                      max={2000}
                      step={250}
                      className="flex-1"
                      disabled={hasSelected}
                    />
                    <div className="w-24 text-right">
                      {formatter.format(deductible)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {additionals.map((additional) => (
                    <div
                      key={additional.name}
                      className="flex items-center justify-between gap-2"
                    >
                      <Label
                        htmlFor={additional.name}
                        className="flex flex-col"
                      >
                        <span>{additional.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {additional.description}
                        </span>
                      </Label>
                      <Switch
                        id={additional.name}
                        checked={selectedAdditionals.has(additional.name)}
                        onCheckedChange={() =>
                          handleToggleAdditional(additional.name)
                        }
                        disabled={hasSelected}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="summary" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm font-medium">
                          Monthly Premium
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatter.format(monthlyPremium)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm font-medium">Annual Total</div>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatter.format(annualPremium)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <span>Base Coverage</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(baseRate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary/60" />
                      <span>Additional Coverage</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(additionalCost)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary/30" />
                      <span>Deductible</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(deductible)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handlePurchaseInsurance}
                disabled={hasSelected || isLoading}
              >
                {getButtonContent()}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
