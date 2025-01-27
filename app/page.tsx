import AutoDealerHero from "@/components/hero";
import { LandingContent } from "@/components/landing-page-sections";
import { Chat } from "@/components/ui/chat";
import { db } from "@/prisma/client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getChatFromId = async (chatId?: string) => {
  if (!chatId) {
    return null;
  }
  const chat = await db.chat.findUnique({
    where: { id: chatId },
  });

  return chat;
};

export default async function Home({ searchParams }: PageProps) {
  const chatId = (await searchParams).chatId as string;
  let chat = await getChatFromId(chatId);

  if (!chat) {
    if (chatId) {
      redirect("/");
    }
    // find chat with no messages
    const emptyChat = await db.chat.findFirst({
      where: {
        messages: {
          equals: [],
        },
      },
    });
    if (emptyChat) {
      chat = emptyChat;
    } else {
      chat = await db.chat.create({
        data: {
          messages: [],
        },
      });
    }
  }

  if (!chat) {
    return null;
  }

  return (
    <>
      <AutoDealerHero chatId={chat?.id} />
      <main
        className="flex flex-col items-center justify-center space-y-6 max-w-full overflow-hidden"
        id="main"
      >
        {!chatId && <LandingContent />}
        {chatId && chat ? <Chat chat={chat} /> : null}
      </main>
    </>
  );
}
