import { ClientMessage } from "@/app/actions";
import { AI } from "@/app/ai";
import { generateId } from "ai";
import { useUIState } from "ai/rsc";
import { useCallback, useState } from "react";

export function useConversation<T extends ClientMessage>({
  serverAction,
}: {
  serverAction: (input: string) => Promise<T>;
}) {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState<typeof AI>();
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(
    conversation.length > 1 ? false : true
  );

  const handler = useCallback(
    async (customInput?: string) => {
      setLoading(true);
      setShowHint(false);
      const userMessage = {
        id: generateId(),
        role: "user" as const,
        display: customInput ?? input,
      };
      setConversation((currentConversation) => [
        ...currentConversation,
        userMessage,
      ]);
      setInput("");

      const message = await serverAction(customInput ?? input);

      setConversation((currentConversation) => [
        ...currentConversation,
        message,
      ]);
      setLoading(false);
    },
    [input, serverAction, setConversation]
  );

  return {
    input,
    setInput,
    conversation,
    setConversation,
    loading,
    setLoading,
    showHint,
    setShowHint,
    handler,
  };
}
