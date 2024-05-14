"use client";

import { Layout } from "@/components/shared/Layout";
import { SignInButton } from "@/components/shared/SignInButton";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RouteError() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>
            Sorry, you need to be logged in to view this page.
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <SignInButton />
        </CardFooter>
      </Card>
    </Layout>
  );
}
