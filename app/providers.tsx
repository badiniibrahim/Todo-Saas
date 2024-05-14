"use client";

import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type ProvidersProps = PropsWithChildren;

const queryClient = new QueryClient();

const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {props.children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
