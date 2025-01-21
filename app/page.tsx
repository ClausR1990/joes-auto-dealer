import AutoDealerHero from "@/components/hero";
import { Chat } from "@/components/ui/chat";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <AutoDealerHero />
      <main
        className="flex flex-col items-center justify-center space-y-6 max-w-full"
        id="main"
      >
        <Chat />
      </main>
    </>
  );
}
