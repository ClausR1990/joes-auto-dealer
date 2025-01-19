"use client";

import { ClientMessage } from "@/app/actions";
import { AI } from "@/app/ai";
import { useScrollAnchor } from "@/hooks/scroll-to-anchor";
import { useConversation } from "@/hooks/use-conversation";
import { useActions } from "ai/rsc";

export default function FindMyDreamCar() {
  const { sendMessage } = useActions<typeof AI>();
  const { conversation } = useConversation<ClientMessage>({
    serverAction: sendMessage,
  });

  const { visibilityRef } = useScrollAnchor();

  if (conversation.length === 0) return null;

  return (
    <section className="flex flex-col h-full py-14 space-y-4">
      <div className="flex flex-col space-y-6">
        {conversation.map((message) => {
          // if (message.role === "user") return null;

          return <div key={message.id}>{message.display}</div>;
        })}
        <div className="h-px w-full max-w-xl break-words" ref={visibilityRef} />
      </div>
    </section>
  );
}
