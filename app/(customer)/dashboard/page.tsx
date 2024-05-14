import { requiredCurrentUser } from "@/app/auth/current-user";
import { Layout, LayoutTitle } from "@/components/shared/Layout";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const user = await requiredCurrentUser();
  const productsCount = await prisma.todo.count({
    where: {
      userId: user.id,
    },
  });
  return (
    <Layout>
      <LayoutTitle>Dashboard</LayoutTitle>
      <h2 className="text-xl font-bold">Welcome back, {user.name}</h2>
      <div className="flex flex-wrap items-start gap-4">
        <Card className="min-w-52">
          <CardHeader>
            <CardDescription>Todo</CardDescription>
            <CardTitle>{productsCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/todos/new" className={buttonVariants({ size: "lg" })}>
              Create a todo
            </Link>
            <Link href="/todos" className={buttonVariants({ size: "lg" })}>
              Todo list
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
