"use client";

import { CreditCard, Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import { AnimatedCheckMark } from "./magic-ui/animated-checkmark";

interface PaymentFormProps {
  amount: number;
  product?: string;
  onSuccess?: () => void;
}

const formatCurrency = (amount: number) => {
  const USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return USD.format(amount);
};

export function PaymentForm({
  amount = 9.99,
  onSuccess,
  product,
}: PaymentFormProps) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentComplete, setPaymentComplete] = React.useState(false);
  const { append } = useChat({
    id: searchParams.get("chatId") as string,
  });

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPaymentComplete(true);

      toast.success("Payment successful! Thank you for your purchase.", {
        description: `${formatCurrency(amount)} has been charged to your card.`,
      });

      append({
        role: "system",
        content: `Payment completed successfully of ${product}!. Has the user got insurance for the car? If not, show the insurance calculator.`,
      });

      onSuccess?.();
    } catch {
      toast.error("Payment failed. Please try again.", {
        description: "There was an error processing your payment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Quick Checkout</CardTitle>
        <CardDescription>
          One-click payment with your saved card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2 flex-wrap p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="grid gap-0.5">
              <span className="text-sm font-medium">Ending in 4242</span>
              <span className="text-xs text-muted-foreground">
                Expires 12/24
              </span>
            </div>
          </div>
          <span className="text-2xl font-bold sm:text-right text-center flex-1">
            {formatCurrency(amount)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handlePayment}
          disabled={isLoading || paymentComplete}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : paymentComplete ? (
            <>
              <AnimatedCheckMark /> Payment Complete
            </>
          ) : (
            `Pay ${formatCurrency(amount)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
