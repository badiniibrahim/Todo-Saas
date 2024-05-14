"use server";

import { ActionError, userAction } from "@/lib/safe-action";
import { TodoSchema } from "./Todo-Schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

const verifySlugUniqueness = async (slug: string, todoId?: string) => {
  const slugExists = await prisma.todo.count({
    where: {
      slug: slug,
      id: todoId
        ? {
            not: todoId,
          }
        : undefined,
    },
  });

  if (slugExists) {
    throw new ActionError("Slug already exists");
  }
};

export const createTodoActions = userAction(
  TodoSchema,
  async (input, context) => {
    await verifySlugUniqueness(input.slug);
    await verifyUserPlan(context.user);

    const todo = await prisma.todo.create({
      data: {
        ...input,
        userId: context.user.id,
      },
    });

    return todo;
  }
);

export const editTodoActions = userAction(
  z.object({
    id: z.string(),
    data: TodoSchema,
  }),
  async (input, context) => {
    await verifySlugUniqueness(input.data.slug, input.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: context.user.id,
      },
      data: input.data,
    });

    return updatedTodo;
  }
);

export const deleteTodoAction = userAction(
  z.string(),
  async (todoId, context) => {
    await prisma.todo.delete({
      where: {
        id: todoId,
        userId: context.user.id,
      },
    });
  }
);

const verifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM") {
    return;
  }

  const userTodoCount = await prisma.todo.count({
    where: {
      userId: user.id,
    },
  });

  if (userTodoCount > 0) {
    throw new ActionError(
      "You need to upgrade to premium to create more products"
    );
  }
};
