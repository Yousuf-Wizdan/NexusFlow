import React, { Suspense } from "react";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Client from "./client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import LogoutButton from "@/features/auth/components/LogoutButton";

const Page = async () => {

  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected Page - Only visible to authenticated users.
      {JSON.stringify(data)}
      <LogoutButton />
    </div>
  );
};

export default Page;
