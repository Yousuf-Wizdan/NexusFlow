import type { NodeExecutor } from "@/features/executions/types";
import { ManualTriggerChannel } from "@/inngest/channels/MannualTriggers";

type ManualTriggerData = Record<string, unknown>;
export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    ManualTriggerChannel().status({
      nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("manual-trigger", async () => context);

  // TODO: Publish "success" state for manual trigger
  await publish(
    ManualTriggerChannel().status({
      nodeId,
      status: "success",
    }),
  );

  return result;
};
