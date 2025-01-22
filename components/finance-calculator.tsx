"use client";

import { motion } from "framer-motion";
import { Calculator, Car, DollarSign } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { financeCalculatorSchema } from "@/data/schemas";
import { useChat } from "ai/react";
import { z } from "zod";

type FinanceCalculatorProps = Partial<z.infer<typeof financeCalculatorSchema>>;

export default function FinanceCalculator({
  carPrice = 0,
  carMake = "Tesla",
  carModel = "Model 3",
  interestRate = 4.9,
}: FinanceCalculatorProps) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2); // 20% default down payment
  const [loanTerm, setLoanTerm] = useState(60); // 60 months default
  const [hasSelected, setHasSelected] = useState(false);
  const { append } = useChat({
    id: "auto-dealer",
  });

  const calculateMonthlyPayment = () => {
    const principal = Math.max(0, carPrice - downPayment); // Prevent negative principal
    const monthlyRate = interestRate / 100 / 12;

    if (monthlyRate === 0) {
      // Special case: zero interest rate
      return principal / loanTerm;
    }

    const numberOfPayments = loanTerm;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment * 100) / 100; // Round to two decimals
  };

  const roundToTwo = (value: number) => Math.round(value * 100) / 100;

  const monthlyPayment = roundToTwo(calculateMonthlyPayment());
  const totalCost = roundToTwo(monthlyPayment * loanTerm + downPayment);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const handleLoanTermChange = (value: number) => {
    const validValue = Math.round(value / 6) * 6; // Round to nearest multiple of 6
    setLoanTerm(validValue);
  };

  const handleApplyForFinancing = () => {
    append({
      role: "system",
      content: `The financing application was approved! You can expect to pay ${formatter.format(
        monthlyPayment
      )} per month for ${loanTerm} months. The down payment is: ${downPayment}. Present the payment form to the user for the down payment.`,
    });
    setHasSelected(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl skeleton-bg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 skeleton-div">
            <Car className="h-6 w-6" />
            Finance Your {carMake} {carModel}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="calculate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculate">Calculate</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="calculate" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Vehicle Price</Label>
                  <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-muted-foreground">
                    {formatter.format(carPrice)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down Payment</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="flex-1"
                      disabled={hasSelected}
                    />
                    <div className="w-20 text-sm text-muted-foreground">
                      {((downPayment / carPrice) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <Slider
                    value={[downPayment]}
                    onValueChange={([value]) => setDownPayment(value)}
                    max={carPrice}
                    step={1000}
                    className="py-2"
                    disabled={hasSelected}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term (Months)</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="loan-term"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="flex-1"
                      disabled={hasSelected}
                    />
                    <div className="w-20 text-sm text-muted-foreground">
                      {(loanTerm / 12).toFixed(1)} years
                    </div>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={([value]) =>
                      handleLoanTermChange(Number(value))
                    }
                    min={12}
                    max={84}
                    step={6}
                    className="py-2"
                    disabled={hasSelected}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="summary" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm font-medium">
                          Monthly Payment
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatter.format(monthlyPayment)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm font-medium">Total Cost</div>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatter.format(totalCost)}
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
                      <span>Down Payment</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(downPayment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary/60" />
                      <span>Principal</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(carPrice - downPayment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary/30" />
                      <span>Interest at {interestRate}%</span>
                    </div>
                    <span className="font-medium">
                      {formatter.format(totalCost - carPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleApplyForFinancing}
                disabled={hasSelected}
              >
                Apply for Financing
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
