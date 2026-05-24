import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  component: () => null,
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/agent" })
  },
})
