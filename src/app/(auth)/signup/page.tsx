import SignUpForm from "@/features/auth/components/SignUpForm";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const page = async () => {
  await requireUnAuth();

  return <SignUpForm />;
};

export default page;
