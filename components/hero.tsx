"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Bot, Search } from "lucide-react";
import Image from "next/image";

export default function AutoDealerHero() {
  const { append } = useChat({
    id: "auto-dealer",
  });

  const handleClick = () => {
    append({
      role: "user",
      content: "Find me my dream car.",
    });
  };

  return (
    <section
      role="presentation"
      className="min-h-screen relative w-full flex items-center bg-gradient-to-b from-background to-muted overflow-x-hidden"
    >
      <div className="container max-w-[1920px] z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                  <Bot className="w-5 h-5 inline-block mr-2" />
                  Powered by AI Technology
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none"
              >
                Find Your Dream Car at
                <br />
                <span className="text-primary tracking-normal font-black">
                  Joe&apos;s Auto Dealer
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-[600px] text-muted-foreground md:text-xl dark:text-gray-400"
              >
                Our AI-powered search helps you discover the perfect vehicle
                matching your preferences, budget, and lifestyle. Experience car
                shopping reimagined.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                className={cn("rounded-full text-lg gap-2")}
                onClick={handleClick}
                size="lg"
              >
                <Search className="w-5 h-5" />
                Let&apos;s Get Started
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold">500+</span>
                <span className="text-muted-foreground">Cars Available</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">24/7</span>
                <span className="text-muted-foreground">AI Assistant</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-muted-foreground">Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative h-full z-20"
          >
            <motion.div
              initial={{ x: 500 }}
              animate={{
                x: 0,
              }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
              className="relative h-full"
            >
              <Image
                src="/hero-car.webp"
                alt="Luxury Car Showcase"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none size-full">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewBox="0 0 150 100"
          className="absolute size-full right-0 top-1/2 -translate-y-1/2 translate-x-1/4 z-0"
        >
          <motion.path
            className="fill-primary/50 md:fill-primary"
            d="M44.7,-53.4C60.3,-40.1,77.1,-28.3,79.4,-14.2C81.6,0,69.5,16.5,58.3,31.5C47.1,46.5,36.9,59.9,23.4,65.2C9.9,70.5,-6.8,67.6,-23,62.1C-39.1,56.7,-54.6,48.6,-64.9,35.3C-75.1,22,-80,3.5,-77,-13.6C-74,-30.7,-63.1,-46.4,-48.9,-60C-34.8,-73.5,-17.4,-85,-1.4,-83.3C14.5,-81.5,29,-66.7,44.7,-53.4Z"
            transform="translate(100 100)"
            animate={{
              d: [
                "M44.7,-53.4C60.3,-40.1,77.1,-28.3,79.4,-14.2C81.6,0,69.5,16.5,58.3,31.5C47.1,46.5,36.9,59.9,23.4,65.2C9.9,70.5,-6.8,67.6,-23,62.1C-39.1,56.7,-54.6,48.6,-64.9,35.3C-75.1,22,-80,3.5,-77,-13.6C-74,-30.7,-63.1,-46.4,-48.9,-60C-34.8,-73.5,-17.4,-85,-1.4,-83.3C14.5,-81.5,29,-66.7,44.7,-53.4Z",
                "M50.1,-60.1C59.7,-51.7,58.5,-30.9,59.1,-12.6C59.7,5.6,62,21.4,55.6,31.8C49.2,42.3,34.2,47.6,20.2,50.5C6.2,53.5,-6.9,54.2,-23.2,52.9C-39.5,51.7,-59,48.5,-63.9,37.9C-68.8,27.3,-59.1,9.3,-56.7,-10.9C-54.2,-31.1,-59,-53.5,-50.7,-62.2C-42.5,-70.8,-21.2,-65.7,-0.5,-65.1C20.3,-64.5,40.5,-68.5,50.1,-60.1Z",
                "M36.3,-46.5C44.2,-36.5,45.9,-22.5,51.5,-6.7C57,9,66.4,26.4,60.6,33.7C54.8,41,33.9,38.2,16.9,42.9C-0.1,47.6,-13.1,59.7,-23.6,58.6C-34.1,57.5,-42,43.2,-46.8,29.6C-51.5,16,-53.2,3.1,-49.3,-6.8C-45.3,-16.7,-35.6,-23.8,-26.4,-33.6C-17.3,-43.3,-8.6,-55.8,2.8,-59.1C14.2,-62.4,28.3,-56.5,36.3,-46.5Z",
                "M50.1,-60.1C59.7,-51.7,58.5,-30.9,59.1,-12.6C59.7,5.6,62,21.4,55.6,31.8C49.2,42.3,34.2,47.6,20.2,50.5C6.2,53.5,-6.9,54.2,-23.2,52.9C-39.5,51.7,-59,48.5,-63.9,37.9C-68.8,27.3,-59.1,9.3,-56.7,-10.9C-54.2,-31.1,-59,-53.5,-50.7,-62.2C-42.5,-70.8,-21.2,-65.7,-0.5,-65.1C20.3,-64.5,40.5,-68.5,50.1,-60.1Z",
                "M44.7,-53.4C60.3,-40.1,77.1,-28.3,79.4,-14.2C81.6,0,69.5,16.5,58.3,31.5C47.1,46.5,36.9,59.9,23.4,65.2C9.9,70.5,-6.8,67.6,-23,62.1C-39.1,56.7,-54.6,48.6,-64.9,35.3C-75.1,22,-80,3.5,-77,-13.6C-74,-30.7,-63.1,-46.4,-48.9,-60C-34.8,-73.5,-17.4,-85,-1.4,-83.3C14.5,-81.5,29,-66.7,44.7,-53.4Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    </section>
  );
}
