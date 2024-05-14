import { Layout, LayoutTitle } from "@/components/shared/Layout";
import React from "react";
import TodoForm from "../[todoId]/edit/TodoForm";
import { requiredCurrentUser } from "@/app/auth/current-user";
import { prisma } from "@/lib/prisma";
import { AlertTriangle } from "lucide-react";
import { PricingSection } from "@/components/shared/PricingSection";

const NewTodo = async () => {
  const user = await requiredCurrentUser();

  const isAuthorized =
    user.plan === "PREMIUM"
      ? true
      : (await prisma.todo.count({
          where: {
            userId: user.id,
          },
        })) < 1;

  if (!isAuthorized) {
    return (
      <Layout className="flex-col">
        <LayoutTitle>Create Todo</LayoutTitle>
        <p>
          <AlertTriangle className="inline" />
          Sorry, you need to upgrade to our premium plan to create more todo.
        </p>
        <PricingSection />
      </Layout>
    );
  }

  return (
    <Layout className="mt-4 flex-col">
      <LayoutTitle>Create Todo</LayoutTitle>
      <TodoForm />
    </Layout>
  );
};

export default NewTodo;
