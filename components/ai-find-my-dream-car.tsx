"use client";

import { ClientMessage } from "@/app/actions";
import { AI } from "@/app/ai";
import { useScrollToBottom } from "@/hooks/scroll-to-anchor";
import { useConversation } from "@/hooks/use-conversation";
import { useActions } from "ai/rsc";
import React from "react";

export default function FindMyDreamCar() {
  const { sendMessage } = useActions<typeof AI>();
  const { conversation } = useConversation<ClientMessage>({
    serverAction: sendMessage,
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  if (conversation.length === 0) return null;

  return (
    <section className="flex flex-col space-y-4 h-full w-full">
      <div
        className="flex flex-col space-y-6 gap-6 items-center h-full overflow-y-scroll py-14"
        ref={messagesContainerRef}
      >
        {conversation.map((message) => {
          if (message.role === "user") return null;

          return (
            <React.Fragment key={message.id}>{message.display}</React.Fragment>
          );
        })}
        <div className="h-px w-full" ref={messagesEndRef} />
      </div>
    </section>
  );
}
