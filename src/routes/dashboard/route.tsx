import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { createClient } from "~/lib/supabase/client"
import { Sidebar } from "~/components/dashboard/sidebar"
import { Header } from "~/components/dashboard/header"

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw redirect({ to: "/auth" })
  },
})

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
