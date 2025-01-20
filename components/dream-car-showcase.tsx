"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  DollarSignIcon,
  Fuel,
  Paintbrush,
} from "lucide-react";
import Image from "next/image";

export type CarProductProps = {
  brandName?: string;
  modelName?: string;
  price?: string;
  modelYear?: string;
  color?: string;
  fuelType?: string;
  salesPitch?: string;
  image?: {
    url: string;
    base64: string;
  };
};

const CarProduct = ({
  brandName,
  modelName,
  price,
  modelYear,
  color,
  fuelType,
  salesPitch,
  image,
}: CarProductProps) => {
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handlePayNow = () => {
    append({
      role: "user",
      content: "I want to pay for this car now.",
    });
  };

  const handleScheduleTestDrive = () => {
    append({
      role: "user",
      content: "I want to schedule a test drive.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-white rounded-lg overflow-hidden shadow-lg skeleton-bg">
        <CardHeader className="p-6 space-y-4">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-gray-900"
            >
              {price}
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-wrap gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative h-64 rounded-lg overflow-hidden basis-full"
            >
              {image ? (
                <Image
                  src={image.url}
                  alt={`${brandName} ${modelName}`}
                  className="size-full object-cover"
                  width={640}
                  height={360}
                  placeholder="blur"
                  blurDataURL={image.base64}
                />
              ) : (
                <div className="skeleton-div size-full"></div>
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
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-gray-50">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 skeleton-div"
              onClick={handleScheduleTestDrive}
            >
              Schedule Test Drive
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              className="flex items-center gap-2 skeleton-div"
              onClick={handlePayNow}
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
