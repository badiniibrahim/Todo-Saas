import { buttonVariants } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import Layout from "../layout";
import { LayoutTitle } from "@/components/shared/Layout";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Yeah ! You are now a premium user</LayoutTitle>
      <div className="flex gap-4">
        <Link
          className={buttonVariants({ size: "lg", variant: "secondary" })}
          href="/todos"
        >
          Go to todo
        </Link>
        <Link className={buttonVariants({ size: "lg" })} href="/todos/new">
          Create your next todo
        </Link>
      </div>
    </Layout>
  );
}
