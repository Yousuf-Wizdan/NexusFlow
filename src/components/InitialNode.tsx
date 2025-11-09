"use client";

import { PlaceholderNode } from "@/components/reactflow/placeholder-node";
import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { WorkflowNode } from "./WorkflowNode";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbars={false}>
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNode.displayName = "InitialNode";
