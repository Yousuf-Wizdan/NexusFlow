import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-triggers/executor";
import { NodeType } from "@/generated/prisma";
import { httpRequestExecutor } from "../components/http-request/executor";
import { NodeExecutor } from "../types";

export const executorRegistry: Partial<
  Record<NodeType, NodeExecutor<Record<string, unknown>>>
> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor as NodeExecutor<
    Record<string, unknown>
  >,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor as NodeExecutor<
    Record<string, unknown>
  >,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
