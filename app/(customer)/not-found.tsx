"use client";

import { Layout } from "@/components/shared/Layout";
import { SignInButton } from "@/components/shared/SignInButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RouteError() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Todo not found</CardTitle>
          <CardDescription>
            The todo may deleted or you don't have permission to view it.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SignInButton />
        </CardFooter>
      </Card>
    </Layout>
  );
}
