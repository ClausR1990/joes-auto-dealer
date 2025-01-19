"use server";

import { openai } from "@ai-sdk/openai";
import { generateId } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};

export const sendMessage = async (input: string): Promise<ClientMessage> => {
  "use server";

  const history = getMutableAIState();

  const response = await streamUI({
    model: openai("gpt-4o"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: response.value,
  };
};
