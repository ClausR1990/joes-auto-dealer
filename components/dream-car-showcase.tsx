"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, Fuel, Paintbrush } from "lucide-react";
import Image from "next/image";

type CarProductProps = {
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
  brandName = "Toyota",
  modelName = "Camry XSE Hybrid",
  price = "$45,000",
  modelYear = "2023",
  color = "Sunburst Yellow",
  fuelType = "Hybrid",
  salesPitch = "Experience the perfect blend of luxury...",
  image,
}: CarProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="bg-white rounded-lg overflow-hidden shadow-lg">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative h-64 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={`${brandName} ${modelName}`}
                  className="w-full h-full object-cover"
                  width={640}
                  height={360}
                  placeholder="blur"
                  blurDataURL={image.base64}
                />
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {modelYear}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Paintbrush className="w-4 h-4" />
                  {color}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
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
            <Button variant="outline" className="flex items-center gap-2">
              Schedule Test Drive
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button className="flex items-center gap-2">
              Inquire Now
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CarProduct;
