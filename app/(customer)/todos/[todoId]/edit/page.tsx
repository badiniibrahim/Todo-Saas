import { requiredCurrentUser } from "@/app/auth/current-user";
import { Layout, LayoutTitle } from "@/components/shared/Layout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import TodoForm from "./TodoForm";
import { PageParams } from "@/types/next";

const EditTodo = async (
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
      <LayoutTitle>Edit todo</LayoutTitle>
      <div className="mt-10">
        <TodoForm defaultValue={todo} todoId={todo.id} />
      </div>
    </Layout>
  );
};

export default EditTodo;
