"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { TodoSchema, TodoType } from "./Todo-Schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createTodoActions, editTodoActions } from "./todo.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TodoFormProps = {
  defaultValue?: TodoType;
  todoId?: string;
};

const TodoForm = (props: TodoFormProps) => {
  const form = useZodForm({
    schema: TodoSchema,
    defaultValues: props.defaultValue,
  });

  const isCreate = !Boolean(props.defaultValue);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: TodoType) => {
      const { data, serverError } = isCreate
        ? await createTodoActions(values)
        : await editTodoActions({
            id: props.todoId ?? "-",
            data: values,
          });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      router.push(`/todos/${data.id}`);
      router.refresh();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate
            ? "Create a new Todo"
            : `Edit a new Todo ${props.defaultValue?.title}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          className="flex flex-col gap-4"
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Title of the todo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Content" {...field} />
                </FormControl>
                <FormDescription>Content of the todo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="iPhone 15"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replaceAll(" ", "-")
                        .toLowerCase();

                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The slug is used in the URL of the review page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{isCreate ? "Create " : "Edit"}</Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
