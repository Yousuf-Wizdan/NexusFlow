import { InitialNode } from "@/components/InitialNode";
import { GeminiNode } from "@/features/executions/components/gemini/Node";
import { HttpRequestNode } from "@/features/executions/components/http-request/Node";
import { GoogleFormNode } from "@/features/triggers/components/google-form-trigger/Node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-triggers/Node";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

//Registry of Node Components
export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormNode,
  [NodeType.GEMINI]: GeminiNode,
} as const satisfies NodeTypes;

export type RegesteredNodeType = keyof typeof nodeComponents;
