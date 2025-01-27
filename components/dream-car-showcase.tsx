"use client";

import {
  generateCarImage,
  getCarImageFromDatabase,
  updateCarImage,
} from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DreamCarShowcaseProps } from "@/data/schemas";
import { useChatStore } from "@/store";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  DollarSignIcon,
  Fuel,
  Paintbrush,
  Percent,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedCarLoader } from "./magic-ui/animated-car-loader";

export type CarProductProps = Partial<DreamCarShowcaseProps> & {
  vehicleType?: string;
  fuelType?: string;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

const CarProduct = ({
  brandName,
  modelName,
  vehicleType,
  price,
  modelYear,
  color,
  fuelType,
  salesPitch,
}: CarProductProps) => {
  const searchParams = useSearchParams();
  const [hasSelected, setHasSelected] = useState(false);
  const carImage = useChatStore((state) => state.carImage);
  const setCarImage = useChatStore((state) => state.setCarImage);
  const { append } = useChat({
    id: searchParams.get("chatId") as string,
  });

  const handlePayNow = () => {
    append({
      role: "user",
      content: "I want to pay for this car now.",
    });
    setHasSelected(true);
  };

  const handleScheduleTestDrive = () => {
    append({
      role: "user",
      content: "I want to schedule a test drive.",
    });
    setHasSelected(true);
  };

  const handleFinance = () => {
    append({
      role: "user",
      content: "I want to finance this car.",
    });
    setHasSelected(true);
  };

  useEffect(() => {
    if (!modelName || !color || !brandName || !vehicleType || !modelYear) {
      return;
    }
    const fetchImage = async () => {
      const carImage = await getCarImageFromDatabase(
        searchParams.get("chatId") as string
      );
      if (carImage) {
        setCarImage(JSON.parse(JSON.stringify(carImage)));
        return;
      }
      const image = await generateCarImage({
        carMake: brandName,
        carType: vehicleType,
        carColor: color,
        carModel: modelName,
        carYear: modelYear,
      });

      await updateCarImage(searchParams.get("chatId") as string, image);

      setCarImage(image);
    };

    fetchImage();
  }, [
    brandName,
    color,
    modelName,
    modelYear,
    vehicleType,
    setCarImage,
    searchParams,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-white rounded-lg overflow-hidden shadow-lg skeleton-bg">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-900"
              >
                {brandName}
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600"
              >
                {modelName}
              </motion.h3>
            </div>
            <div className="text-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-gray-900"
              >
                {formatPrice(price?.basePrice ?? 0)}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-600"
              >
                delivery fee: {formatPrice(price?.deliveryFee ?? 0)}
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative h-64 rounded-lg overflow-hidden basis-full"
            >
              {carImage ? (
                <Image
                  src={carImage?.url}
                  alt={`${brandName} ${modelName}`}
                  className="size-full object-cover"
                  width={640}
                  height={360}
                  placeholder="blur"
                  blurDataURL={carImage?.base64}
                />
              ) : (
                <>
                  {brandName ? (
                    <Skeleton className="size-full flex items-center justify-center">
                      <AnimatedCarLoader className="text-muted-foreground h-32" />
                    </Skeleton>
                  ) : null}
                </>
              )}
            </motion.div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 skeleton-div"
                >
                  <Calendar className="w-4 h-4" />
                  {modelYear}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 skeleton-div"
                >
                  <Paintbrush className="w-4 h-4" />
                  {color}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 skeleton-div"
                >
                  <Fuel className="w-4 h-4" />
                  {fuelType}
                </Badge>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 leading-relaxed"
              >
                {salesPitch}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-between w-full gap-4 items-end"
            >
              <div className="ext-xl text-gray-600">Total:</div>
              <div className="text-3xl font-bold text-gray-900">
                {formatPrice(
                  (price?.basePrice ?? 0) + (price?.deliveryFee ?? 0)
                )}
              </div>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-gray-50">
          <div className="w-full flex justify-between items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="flex items-center gap-2 skeleton-div flex-1"
              onClick={handleScheduleTestDrive}
              disabled={hasSelected || !carImage}
            >
              Schedule Test Drive
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 skeleton-div flex-1"
              onClick={handleFinance}
              disabled={hasSelected || !carImage}
            >
              I want to finance
              <Percent className="w-4 h-4" />
            </Button>
            <Button
              className="flex items-center gap-2 skeleton-div flex-1"
              onClick={handlePayNow}
              disabled={hasSelected || !carImage}
            >
              Pay Now
              <DollarSignIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CarProduct;
