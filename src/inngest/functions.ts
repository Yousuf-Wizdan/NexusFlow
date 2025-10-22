import { inngest } from "./client";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import * as Sentry from "@sentry/nextjs";

// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {

//     await step.sleep("wait-a-moment", "5s");

//     await step.sleep("wait-a-moment", "5s");

//     await step.sleep("wait-a-moment", "5s");

//     await step.run("create-workflow" , async () => {
//         return prisma.workflows.create({
//             data: {
//                 name: "workflow-from-inngest"
//             }
//         })
//     })

//     return { message: `Hello ${event.data.email}!` };
//   },
// );

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    Sentry.logger.info("User triggered test log", {
      log_source: "sentry_test",
    });

    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpfull Assitant",
      prompt: "What is 2 + 2 ?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return steps;
  }
);
