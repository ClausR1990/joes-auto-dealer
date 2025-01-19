"use client";

import { AI } from "@/app/ai";
import { generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";

export default function Page() {
  const { sendMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      message: { value: string };
    };

    setMessages([
      ...messages,
      { id: generateId(), role: "user", display: target.message.value },
    ]);

    const response = await sendMessage(target.message.value);

    setMessages([
      ...messages,
      { id: generateId(), role: "assistant", display: response },
    ]);
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.display}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
