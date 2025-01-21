"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedCar } from "./magic-ui/animated-car";

type ContentSection = {
  title: string;
  description: string;
  image?: string;
  imagePosition?: "left" | "right";
  className?: string;
};

export const LandingSection = ({
  title,
  description,
  image,
  imagePosition = "right",
  className,
}: ContentSection) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className={cn(
        "py-12 md:py-40 overflow-hidden w-full",
        imagePosition === "left" ? "bg-secondary/50" : "bg-background",
        className
      )}
    >
      <div className="container">
        <div
          className={cn(
            "grid gap-6 md:gap-12 lg:gap-20 items-center lg:grid-cols-2",
            imagePosition === "left" && "[grid-auto-flow:dense]"
          )}
        >
          <div className="space-y-4">
            <AnimatedCar className="text-secondary -mb-6 size-16" />
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400"
            >
              {description}
            </motion.p>
          </div>
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className={cn(
                "mx-auto aspect-video overflow-hidden rounded-xl sm:w-full",
                imagePosition === "left" && "lg:-order-1"
              )}
            >
              <Image
                alt="Section image"
                className="aspect-video object-cover"
                src={image}
                width={800}
                height={600}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export function LandingContent() {
  const { messages } = useChat({
    id: "auto-dealer",
  });

  if (messages.length > 0) {
    return null;
  }

  return (
    <>
      <LandingSection
        title="AI-Powered Car Matching"
        description="Our sophisticated AI technology analyzes your preferences, driving habits, and lifestyle to recommend the perfect vehicles for you. Experience personalized car shopping that understands your needs and budget constraints."
        image="/ai-salesmen.webp"
        imagePosition="right"
      />

      <LandingSection
        title="24/7 Virtual Assistant"
        description="Get instant answers to your questions anytime, anywhere. Our AI assistant helps you explore vehicles, compare options, and schedule test drives - all at your convenience. Experience round-the-clock support tailored to your car-buying journey."
        image="/virtual-assistant.webp"
        imagePosition="left"
      />

      <LandingSection
        title="Seamless Buying Experience"
        description="From initial search to final purchase, enjoy a streamlined process that puts you in control. Compare prices, explore financing options, and even complete your purchase online. Experience the future of car buying with our innovative platform."
        image="/seamless-buying-experience.webp"
        imagePosition="right"
      />
    </>
  );
}
