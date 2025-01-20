import { ToolInvocation } from "ai";
import { ToolComponentMapper } from "./tool-component-mapper";

export const ToolInvocations = ({
  toolInvocations,
}: {
  toolInvocations: Array<ToolInvocation> | undefined;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {toolInvocations?.map((toolInvocation) => {
        const { toolCallId } = toolInvocation;

        return <ToolComponentMapper key={toolCallId} {...toolInvocation} />;
      })}
    </div>
  );
};
