import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { polarClient } from "./polar";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
            checkout({
                products: [
                    {
                        productId: "9998fc91-c8ca-4d8b-a3f5-b6b0059f60ec",
                        slug: "NexusFlow-Pro"
                    }
                ],
                successUrl: process.env.POLAR_SUCCESS_URL,
                authenticatedUsersOnly: true
            }),
            portal()
        ]
    })
  ],
});
