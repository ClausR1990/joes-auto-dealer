"use client";
import { Message as MessageComponent } from "@/components/message";
import { useChatStore } from "@/store";
import { Message, useChat } from "ai/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FloatingReset } from "../floating-reset-button";

export const Chat = () => {
  const setMessages = useChatStore((state) => state.setMessages);
  const initialMessages = useChatStore((state) => state.messages);
  const { messages, isLoading } = useChat({
    id: "auto-dealer",
    initialMessages,
    onFinish: (message) => {
      console.log("onFinish", message);
      setMessages(message);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col space-y-4 min-h-screen w-full overflow-x-hidden py-14">
      {messages.map((m: Message) => (
        <div key={m.id} className="w-full container flex justify-center">
          <MessageComponent
            role={m.role}
            content={m.content}
            toolInvocations={m.toolInvocations}
          />
        </div>
      ))}
      {isLoading && (
        <div className="w-full flex justify-center items-center py-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {messages?.length > 0 && <FloatingReset />}
    </section>
  );
};
