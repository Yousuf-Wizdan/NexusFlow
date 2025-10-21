'use client'

import React from "react";
import { caller } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job Queued");
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected Page - Only visible to authenticated users.
      {JSON.stringify(data)}
      <Button
        disabled={create.isPending}
        onClick={() => create.mutate()}
      >
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;
