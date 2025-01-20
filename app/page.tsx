import AutoDealerHero from "@/components/hero";
import { Chat } from "@/components/ui/chat";

export const dynamic = "force-dynamic";
export const duration = 60;

export default function Home() {
  return (
    <>
      <AutoDealerHero />
      <main
        className="flex flex-col items-center justify-center space-y-6 container max-w-full py-24"
        id="main"
      >
        <Chat />
      </main>
    </>
  );
}
