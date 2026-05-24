import { createRouter } from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import { routeTree } from "./routeTree.gen"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export const queryClient = new QueryClient()

export function getRouter() {
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
  })
  return router
}
