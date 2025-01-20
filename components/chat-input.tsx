"use client";

import { useChat } from "ai/react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const ChatInput = () => {
  const { handleSubmit, input, isLoading, handleInputChange } = useChat({
    id: "auto-dealer",
  });

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Have any further questions?"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : null}
        Send
      </Button>
    </form>
  );
};
