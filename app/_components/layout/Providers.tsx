"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import useAuthStore from "@/app/_utils/auth-store";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            // staleTime: 60 * 1000,
          },
        },
      })
  );

  // Cached queries aren't keyed by user, so drop them whenever the account changes
  // to stop one account's data (courses, notifications) showing for the next.
  useEffect(
    () =>
      useAuthStore.subscribe((state, prev) => {
        const loggedOut = prev.isAuthenticated && !state.isAuthenticated;
        const switchedUser =
          prev.user?.id != null &&
          state.user?.id != null &&
          prev.user.id !== state.user.id;

        if (loggedOut || switchedUser) {
          queryClient.clear();
        }
      }),
    [queryClient],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
