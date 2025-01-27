"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type AnimatedCarProps = {
  className?: string;
};

export function AnimatedCarLoader({ className }: AnimatedCarProps) {
  return (
    <div
      className={cn("w-full h-24 flex items-center justify-center", className)}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="256"
        viewBox="0 0 256 256"
        xmlSpace="preserve"
        className="w-auto h-full"
      >
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          {/* Wheels */}
          <motion.path
            d="M 73.944 59.742 c -4.001 0 -7.256 -3.255 -7.256 -7.255 s 3.255 -7.255 7.256 -7.255 c 4 0 7.255 3.255 7.255 7.255 S 77.944 59.742 73.944 59.742 z M 73.944 47.232 c -2.898 0 -5.256 2.357 -5.256 5.255 s 2.357 5.255 5.256 5.255 c 2.897 0 5.255 -2.357 5.255 -5.255 S 76.842 47.232 73.944 47.232 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
          <motion.path
            d="M 19.651 59.742 c -4 0 -7.255 -3.255 -7.255 -7.255 s 3.255 -7.255 7.255 -7.255 s 7.255 3.255 7.255 7.255 S 23.651 59.742 19.651 59.742 z M 19.651 47.232 c -2.898 0 -5.255 2.357 -5.255 5.255 s 2.357 5.255 5.255 5.255 c 2.897 0 5.255 -2.357 5.255 -5.255 S 22.548 47.232 19.651 47.232 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />

          {/* Car body */}
          <motion.path
            d="M 13.974 56.113 c -0.081 0 -0.164 -0.01 -0.247 -0.03 L 2.152 53.146 c -1.469 -0.373 -2.391 -1.83 -2.099 -3.317 l 1.662 -8.442 c 0.426 -2.167 2.339 -3.74 4.547 -3.74 h 2.493 c 1.486 0 2.966 -0.367 4.281 -1.061 l 6.238 -3.293 c 3.762 -1.986 7.998 -3.035 12.25 -3.035 h 10.654 c 4.002 0 7.949 1.062 11.411 3.071 l 8.399 4.874 l 23.719 4.802 C 88.194 43.508 90 45.716 90 48.254 v 3.626 c 0 1.774 -1.331 3.257 -3.096 3.448 l -7.175 0.779 c -0.556 0.057 -1.043 -0.338 -1.103 -0.886 c -0.06 -0.55 0.337 -1.043 0.886 -1.103 l 7.176 -0.779 C 87.437 53.259 88 52.631 88 51.88 v -3.626 c 0 -1.59 -1.131 -2.974 -2.689 -3.289 l -23.88 -4.834 c -0.106 -0.021 -0.209 -0.061 -0.304 -0.115 l -8.542 -4.957 c -3.157 -1.832 -6.756 -2.801 -10.407 -2.801 H 31.524 c -3.929 0 -7.842 0.97 -11.317 2.804 l -6.238 3.293 c -1.601 0.845 -3.404 1.292 -5.214 1.292 H 6.262 c -1.255 0 -2.342 0.894 -2.585 2.126 l -1.661 8.441 c -0.087 0.444 0.188 0.881 0.628 0.992 l 11.575 2.938 c 0.535 0.137 0.859 0.681 0.723 1.216 C 14.828 55.813 14.42 56.113 13.974 56.113 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
          <motion.path
            d="M 68.267 56.113 H 25.329 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 42.938 c 0.553 0 1 0.447 1 1 S 68.819 56.113 68.267 56.113 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
          <motion.path
            d="M 53.462 42.099 H 24.787 c -2.72 0 -5.352 -0.803 -7.608 -2.323 l -3.09 -2.081 c -0.458 -0.309 -0.58 -0.93 -0.271 -1.388 c 0.309 -0.458 0.93 -0.58 1.388 -0.271 l 3.09 2.081 c 1.925 1.296 4.17 1.982 6.491 1.982 h 28.675 c 2.301 0 4.538 -0.464 6.648 -1.38 l 1.121 -0.486 c 0.504 -0.219 1.096 0.014 1.314 0.52 c 0.22 0.507 -0.013 1.096 -0.52 1.315 l -1.12 0.486 C 58.543 41.579 56.038 42.099 53.462 42.099 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
          <motion.path
            d="M 39.396 42.099 c -0.459 0 -0.873 -0.318 -0.976 -0.785 l -2.172 -9.841 c -0.119 -0.539 0.222 -1.073 0.761 -1.192 c 0.536 -0.122 1.073 0.222 1.192 0.761 l 2.172 9.841 c 0.119 0.539 -0.222 1.073 -0.761 1.192 C 39.541 42.092 39.468 42.099 39.396 42.099 z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
}
