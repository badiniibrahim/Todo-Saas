import { requiredCurrentUser } from "@/app/auth/current-user";
import { Layout, LayoutTitle } from "@/components/shared/Layout";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { PageParams } from "@/types/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { DeleteButton } from "./DeleteButton";

const TodoPage = async (
  props: PageParams<{
    todoId: string;
  }>
) => {
  const user = await requiredCurrentUser();
  const todo = await prisma.todo.findUnique({
    where: {
      id: props.params.todoId,
      userId: user.id,
    },
  });
  if (!todo) {
    notFound();
  }
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <LayoutTitle>{todo.title}</LayoutTitle>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/todos/${todo.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Edit
          </Link>
          <DeleteButton todoId={todo.id} />
        </div>
      </div>
    </Layout>
  );
};

export default TodoPage;
