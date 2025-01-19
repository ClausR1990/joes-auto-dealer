import AutoDealerHero from "@/components/hero";
import PickBrand from "@/components/pick-brand";
import PickBudget from "@/components/pick-budget";
import PickColor from "@/components/pick-color";
import { PickFuelType } from "@/components/pick-fuel-type";
import { PickVehicleType } from "@/components/pick-vehicle-type";

export default function Home() {
  return (
    <>
      <AutoDealerHero />
      <main
        className="min-h-screen flex flex-col items-center py-14 space-y-6"
        id="main"
      >
        <PickVehicleType />
        <PickBudget />
        <PickFuelType />
        <PickColor />
        <PickBrand />
      </main>
    </>
  );
}
