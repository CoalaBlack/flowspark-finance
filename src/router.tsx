import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // SWR: data fica "fresh" por 30s, em cache por 5min
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000, // preload válido por 30s
    defaultStaleTime: 30_000,         // loaders SWR por 30s
    defaultGcTime: 5 * 60_000,        // GC após 5min sem uso
    defaultPendingMs: 0,
    defaultPendingMinMs: 0,
  });

  return router;
};

