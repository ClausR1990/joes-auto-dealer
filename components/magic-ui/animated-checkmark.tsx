"use client";

import { cn } from "@/lib/utils";
import { type SVGMotionProps, motion } from "framer-motion";

interface AnimatedCheckProps
  extends Omit<SVGMotionProps<SVGSVGElement>, "color"> {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function AnimatedCheckMark({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  className,
  ...props
}: AnimatedCheckProps) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className={cn("", className)}
      width={size}
      height={size}
      {...props}
    >
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M14,24 L21,31 L34,17"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: "easeOut",
        }}
      />
    </motion.svg>
  );
}
