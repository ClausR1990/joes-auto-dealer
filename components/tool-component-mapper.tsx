import { ToolInvocation } from "ai";
import { Loader2 } from "lucide-react";
import CarProduct from "./dream-car-showcase";
import PickBrand from "./pick-brand";
import PickBudget from "./pick-budget";
import PickColor from "./pick-color";
import { PickFuelType } from "./pick-fuel-type";
import { PickVehicleType } from "./pick-vehicle-type";

export const ToolComponentMapper = (props: ToolInvocation) => {
  if (props.state === "result") {
    const { result, toolName } = props;
    if (toolName === "pickVehicleType") {
      return <PickVehicleType {...result} />;
    }
    if (toolName === "pickBudget") {
      return <PickBudget {...result} />;
    }
    if (toolName === "pickColor") {
      return <PickColor {...result} />;
    }
    if (toolName === "pickFuelType") {
      return <PickFuelType {...result} />;
    }
    if (toolName === "pickBrandPreference") {
      return <PickBrand {...result} />;
    }
    if (toolName === "getDreamCarResults") {
      return <CarProduct {...result} />;
    }

    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  } else {
    return (
      <div className="skeleton">
        <LoadingUI {...props} />
      </div>
    );
  }
};

const LoadingUI = (props: ToolInvocation) => {
  const { toolName } = props;
  if (toolName === "pickVehicleType") {
    return <PickVehicleType />;
  }
  if (toolName === "pickBudget") {
    return <PickBudget />;
  }
  if (toolName === "pickColor") {
    return <PickColor />;
  }
  if (toolName === "pickFuelType") {
    return <PickFuelType />;
  }
  if (toolName === "pickBrandPreference") {
    return <PickBrand />;
  }
  if (toolName === "getDreamCarResults") {
    return <CarProduct />;
  }

  return <Loader2 className="animate-spin" />;
};
