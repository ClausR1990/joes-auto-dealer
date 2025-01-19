import { createAI } from "ai/rsc";
import { ClientMessage, ServerMessage, sendMessage } from "./actions";

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<
  AIState,
  UIState,
  {
    sendMessage: typeof sendMessage;
  }
>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
  },
});
