import { requiredCurrentUser } from "@/app/auth/current-user";
import { Layout, LayoutTitle } from "@/components/shared/Layout";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const TodoPage = async () => {
  const user = await requiredCurrentUser();

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
  });

  return (
    <Layout className="flex-col">
      <div className="flex justify-between flex-col">
        <div className="space-y-0.5 mb-4">
          <LayoutTitle>TodoPage</LayoutTitle>
        </div>
        <Link
          href={`/todos/new`}
          className={cn(
            buttonVariants({ size: "sm", variant: "secondary" }),
            "mt-4"
          )}
        >
          Create new Todo
        </Link>
      </div>
      {todos.length ? (
        <Table>
          <TableHeader>
            <TableHead>Name</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Slug</TableHead>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <Link href={`/todos/${todo.id}`} key={todo.id}>
                  <TableCell>{todo.title}</TableCell>
                </Link>
                <TableCell className="font-mono">{todo.content}</TableCell>
                <TableCell className="font-mono">{todo.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Link
          href="/todos/new"
          className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-primary p-8 transition-colors hover:bg-accent/40 lg:p-12"
        >
          Create todo
        </Link>
      )}
    </Layout>
  );
};

export default TodoPage;
