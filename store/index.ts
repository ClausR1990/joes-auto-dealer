import { Message } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChatStore = {
  messages: Message[];
  setMessages: (message: Message) => void;
  carImage: {
    base64: string;
    url: string;
  } | null;
  setCarImage: (image: { base64: string; url: string } | null) => void;
};

export const useChatStore = create<ChatStore, [["zustand/persist", ChatStore]]>(
  persist(
    (set) => ({
      messages: [],
      setMessages: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      carImage: null,
      setCarImage: (image) => set({ carImage: image }),
    }),
    { name: "chat-store" }
  )
);
