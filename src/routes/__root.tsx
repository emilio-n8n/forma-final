import { Outlet, createRootRoute } from "@tanstack/react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "~/config"
import { Toaster } from "~/components/ui/sonner"
import "~/styles/app.css"

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>FORMA — Assistant IA pour Architectes</title>
          <meta name="description" content="Assistant IA spécialisé pour architectes : chat intelligent, génération d'images, gestion de projets." />
        </head>
        <body>
          <Outlet />
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  )
}
