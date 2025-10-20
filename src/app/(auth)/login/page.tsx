import LoginForm from "@/features/auth/components/LoginForm";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const page = async () => {

  await requireUnAuth()

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
