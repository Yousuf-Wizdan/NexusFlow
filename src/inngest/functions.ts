import { getExecutor } from "@/features/executions/lib/ExecutorRegistry";
import { NodeType } from "@/generated/prisma";
import prisma from "@/lib/db";
import { NonRetriableError } from "inngest";
import { GoogleFormTriggerChannel } from "./channels/GoogleFromTrigger";
import { HttpReqestChannel } from "./channels/HttpRequest";
import { ManualTriggerChannel } from "./channels/MannualTriggers";
import { inngest } from "./client";
import { topologicalSort } from "./utils";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    retries: 0, //TODO: Not in Production,
  },
  {
    event: "execute/execute.workflow",
    channels: [
      HttpReqestChannel(),
      ManualTriggerChannel(),
      GoogleFormTriggerChannel(),
    ],
  },
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("No workflow ID provided");
    }

    const sortedNodes = await step.run("prepare-nodes", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    // Initialize the context with any initial data from the trigger
    let context = event.data.initialData || {};

    // Execute each node
    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        publish,
      });
    }

    return {
      workflowId,
      result: context,
    };
  },
);
