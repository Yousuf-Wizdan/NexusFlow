import type { NodeExecutor } from "@/features/executions/types";
import { GoogleFormTriggerChannel } from "@/inngest/channels/GoogleFromTrigger";

type GoogleFormTriggerData = Record<string, unknown>;
export const googleFormTriggerExecutor: NodeExecutor<
  GoogleFormTriggerData
> = async ({ nodeId, context, step, publish }) => {
  await publish(
    GoogleFormTriggerChannel().status({
      nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("google-form-trigger", async () => context);

  // TODO: Publish "success" state for google trigger
  await publish(
    GoogleFormTriggerChannel().status({
      nodeId,
      status: "success",
    }),
  );

  return result;
};
