import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { createClient } from "~/lib/supabase/client"
import { useState } from "react"

export const Route = createFileRoute("/auth")({
  component: Auth,
})

function Auth() {
  const supabase = createClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp
    const { error: err } = await fn({ email, password })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    if (mode === "signup") {
      const { error: profileErr } = await supabase.from("profiles").insert({ id: (await supabase.auth.getUser()).data.user?.id })
      if (profileErr) console.error(profileErr)
    }

    setLoading(false)
    navigate({ to: "/dashboard" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gold-500">FORMA</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Connectez-vous à votre espace" : "Créez votre compte"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="architecte@agence.fr"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center rounded-md bg-gold-500 text-sm font-medium text-black transition-all hover:bg-gold-400 disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "Se connecter" : "Créer un compte"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="ml-1 text-gold-500 hover:underline"
            >
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
