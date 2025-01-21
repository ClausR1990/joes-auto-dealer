import { Message } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChatStore = {
  messages: Message[];
  setMessages: (message: Message) => void;
};

export const useChatStore = create<ChatStore, [["zustand/persist", ChatStore]]>(
  persist(
    (set) => ({
      messages: [],
      setMessages: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    }),
    { name: "chat-store" }
  )
);
