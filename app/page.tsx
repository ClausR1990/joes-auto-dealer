import FindMyDreamCar from "@/components/ai-find-my-dream-car";
import AutoDealerHero from "@/components/hero";

export default function Home() {
  return (
    <>
      <AutoDealerHero />
      <main className="flex flex-col items-center space-y-6" id="main">
        <FindMyDreamCar />
      </main>
    </>
  );
}
