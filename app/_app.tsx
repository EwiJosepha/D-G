"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppContextProvider } from "@/store/app-context";


export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(() => new QueryClient());

  return (
    <AppContextProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContextProvider>
  );
}


