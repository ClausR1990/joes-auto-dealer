"use client";

import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store";

interface FloatingResetProps {
  className?: string;
}

export function FloatingReset({ className }: FloatingResetProps) {
  const setCarImage = useChatStore((state) => state.setCarImage);
  const { reload, setMessages, append, isLoading } = useChat({
    id: "auto-dealer",
  });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    setMessages([]);
    reload();
    append({
      role: "user",
      content: "Find me my dream car.",
    });
    setCarImage(null);
  };

  return (
    <motion.div
      className={cn("fixed bottom-4 right-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        className="rounded-full hover:shadow-lg transition-shadow overflow-hidden"
        size={isHovered ? "default" : "icon"}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading}
      >
        <motion.div className="flex items-center">
          <motion.div
            whileTap={{ rotate: 360 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <RotateCcw className="h-4 w-4" />
          </motion.div>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
              marginLeft: isHovered ? "0.5rem" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap text-sm font-medium"
          >
            Start Over
          </motion.span>
        </motion.div>
      </Button>
    </motion.div>
  );
}
