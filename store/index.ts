import { create } from "zustand";
import { persist } from "zustand/middleware";

type ToolsCalled = {
  name: string;
  hasSelected: boolean;
};

export type ChatStore = {
  tools: ToolsCalled[] | null;
  setTools: (tools: ToolsCalled[] | null) => void;
  carImage: {
    base64: string;
    url: string;
  } | null;
  setCarImage: (image: { base64: string; url: string } | null) => void;
};

export const useChatStore = create<ChatStore, [["zustand/persist", ChatStore]]>(
  persist(
    (set) => ({
      tools: null,
      carImage: null,
      setCarImage: (image) => set({ carImage: image }),
      setTools: (tools) => set({ tools }),
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        tools: state.tools,
        carImage: null, // Default value instead of actual state
        setCarImage: state.setCarImage,
        setTools: state.setTools,
      }),
    }
  )
);
