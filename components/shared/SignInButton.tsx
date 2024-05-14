"use client";

import { signInAction } from "@/app/actions/auth.action";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const SignInButton = () => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        signInAction();
      }}
    >
      <LogIn size={16} className="mr-2" />
      Sign In
    </Button>
  );
};
