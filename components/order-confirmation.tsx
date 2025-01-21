"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Check, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderConfirmationSchema } from "@/data/schemas";
import { useChatStore } from "@/store";
import { z } from "zod";

type CarReceiptProps = Partial<z.infer<typeof orderConfirmationSchema>>;

export function OrderConfirmation(props: CarReceiptProps) {
  const carImage = useChatStore((state) => state.carImage);
  const { product, orderDate, deliveryDate } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl overflow-hidden skeleton-bg">
        <CardHeader className="border-b bg-muted/40 p-6">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Order Confirmation
              </h2>
              <p className="text-sm text-muted-foreground">
                Thank you for your purchase
              </p>
            </div>
            <Badge variant="secondary" className="h-6 skeleton-div">
              <Check className="mr-1 h-3 w-3" />
              Confirmed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative mb-6 h-48 w-full overflow-hidden rounded-lg sm:h-64 skeleton-div"
          >
            {carImage ? (
              <Image
                src={carImage?.url}
                alt={`${product?.carMake} ${product?.carModel}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Vehicle</div>
                <div className="font-semibold">
                  {product?.carMake} {product?.carModel}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product?.carPrice ?? 0)}
                </div>
              </div>
            </div>
            {deliveryDate && orderDate && (
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Order Date
                  </div>
                  <div className="font-semibold">
                    {format(orderDate ?? new Date(), "PPPP")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </div>
                  <div className="font-semibold">
                    {format(new Date(deliveryDate ?? ""), "PPPP")}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Separator className="my-6" />
          <motion.div
            whileHover={{ x: 5 }}
            className="flex cursor-pointer items-center justify-between rounded-lg border p-4 skeleton-div"
          >
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Add to Calendar</div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
