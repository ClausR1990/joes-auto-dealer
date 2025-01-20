"use client";
import { Message as MessageComponent } from "@/components/message";
import { Message, useChat } from "ai/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const Chat = () => {
  const { messages, isLoading } = useChat({
    id: "auto-dealer",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 h-full">
      {messages.map((m: Message) => (
        <div key={m.id}>
          <MessageComponent
            role={m.role}
            content={m.content}
            toolInvocations={m.toolInvocations}
          />
        </div>
      ))}
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};
