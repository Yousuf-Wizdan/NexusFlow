import { InitialNode } from "@/components/InitialNode";
import { HttpRequestNode } from "@/features/executions/components/http-request/Node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-triggers/Node";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

//Registry of Node Components
export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegesteredNodeType = keyof typeof nodeComponents;
