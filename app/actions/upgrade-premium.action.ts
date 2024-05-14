"use server";

import { env } from "@/env";
import { ActionError, userAction } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { stripe } from "../stripe/stripe";
import { getServerUrl } from "@/get-server-url";

export const upgradeToPremium = userAction(z.string(), async (_, context) => {
  if (context.user.plan === "PREMIUM") {
    throw new ActionError("User is already on premium plan");
  }

  const stripeCustomerId = context.user.stripeCustomerId;

  if (!stripeCustomerId) {
    throw new ActionError("User does not have a stripe customer id");
  }

  const stripeCheckout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card", "link"],
    mode: "subscription",
    line_items: [
      {
        price:
          env.NODE_ENV === "development"
            ? "price_1PG1FZIT69P7QCj3ygAlDbq6"
            : "price_1PG1FZIT69P7QCj3ygAlDbq6",
        quantity: 1,
      },
    ],
    success_url: `${getServerUrl()}/success`,
    cancel_url: `${getServerUrl()}/cancel`,
  });

  if (!stripeCheckout.url) {
    throw new ActionError("Stripe checkout url is missing");
  }

  redirect(stripeCheckout.url);
});
