import { InitialNode } from "@/components/InitialNode";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

//Registry of Node Components
export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegesteredNodeType = keyof typeof nodeComponents;
