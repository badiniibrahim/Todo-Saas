import { buttonVariants } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import Layout from "../layout";
import { LayoutTitle } from "@/components/shared/Layout";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>
        Ohhh... it's seems the payment has been canceled
      </LayoutTitle>
      <div className="flex gap-4">
        <Link
          className={buttonVariants({ size: "lg", variant: "secondary" })}
          href="/"
        >
          Back to home
        </Link>
        <Link className={buttonVariants({ size: "lg" })} href="">
          Contact help
        </Link>
      </div>
    </Layout>
  );
}
