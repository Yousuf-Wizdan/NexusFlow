"use client";

import { Position, type NodeProps } from "@xyflow/react";
import Image from "next/image";
import { memo, type ComponentType, type ReactNode } from "react";
import { WorkflowNode } from "../../../components/WorkflowNode";
import { BaseHandle } from "../../../components/reactflow/base-handle";
import {
  BaseNode,
  BaseNodeContent,
} from "../../../components/reactflow/base-node";

interface BaseExecutionNodeProps extends NodeProps {
  icon: ComponentType<{ className?: string }> | string;
  name: string;
  description?: string;
  children?: ReactNode;
  // status?: NodeStatus
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    // id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseExecutionNodeProps) => {
    const handleDelete = () => {};

    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <BaseNode onDoubleClick={onDoubleClick}>
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            <BaseHandle
              id={"target-1"}
              type="target"
              position={Position.Left}
            />
            <BaseHandle
              id={"source-1"}
              type="source"
              position={Position.Right}
            />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  },
);

BaseExecutionNode.displayName = "BaseExecutionNode";
