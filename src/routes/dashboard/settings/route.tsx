import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { createClient } from "~/lib/supabase/client"
import { useUser } from "~/hooks/use-user"
import { useState, useEffect } from "react"
import { createServerFn } from "@tanstack/react-start"
import { LogOut, Save } from "lucide-react"

const updateAgencyName = createServerFn({ method: "POST" })
  .validator((d: { userId: string; name: string }) => d)
  .handler(async ({ data }) => {
    const { createClient } = await import("~/lib/supabase/client")
    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ agency_name: data.name })
      .eq("id", data.userId)
    if (error) throw error
    return { success: true }
  })

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
})

function SettingsPage() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [agencyName, setAgencyName] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase.from("profiles").select("agency_name").eq("id", user.id).single().then(({ data }) => {
      if (data?.agency_name) setAgencyName(data.agency_name)
    })
  }, [user])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    await updateAgencyName({ data: { userId: user.id, name: agencyName } })
    setSaving(false)
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    navigate({ to: "/auth" })
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-sm text-muted-foreground">Gérez votre profil</p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nom de l'agence</label>
          <input
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Agence d'architecture"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-gold-500 px-4 text-sm font-medium text-black transition-all hover:bg-gold-400 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <p className="mb-2 text-sm text-muted-foreground">{user?.email}</p>
        <button
          onClick={handleSignOut}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-red-800 px-4 text-sm font-medium text-red-400 transition-all hover:bg-red-950"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
