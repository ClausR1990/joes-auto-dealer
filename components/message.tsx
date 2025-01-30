"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { BotIcon, Loader2, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import { Markdown } from "./markdown";
import { ToolInvocations } from "./tool-invocations";

export const Message = ({
  role,
  content,
  toolInvocations,
  isLoading,
}: {
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
  isLoading?: boolean;
}) => {
  if (role === "user" || role === "system") return null;

  return (
    <motion.div
      className={`flex flex-col sm:flex-row gap-4 w-full max-w-lg`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <>
        {role === "assistant" ? (
          <BotIcon />
        ) : isLoading ? (
          <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
            <Loader2 className="animate-spin size-5 text-foreground" />
          </div>
        ) : (
          <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
            <UserIcon />
          </div>
        )}
      </>
      <div className="flex flex-col gap-2 w-full">
        {content && typeof content === "string" && (
          <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
            <Markdown>{content}</Markdown>
          </div>
        )}

        <ToolInvocations toolInvocations={toolInvocations} />
      </div>
    </motion.div>
  );
};
