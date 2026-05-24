import { useState } from "react"
import { createClient } from "~/lib/supabase/client"
import { useUser } from "~/hooks/use-user"
import { Sparkles } from "lucide-react"

const ambiances = ["jour", "nuit", "aurore", "crépuscule"]
const meteo = ["dégagé", "nuageux", "pluvieux", "brumeux", "orage"]
const styles = ["contemporain", "minimaliste", "brutaliste", "classique", "organique", "high-tech"]

export function RenderForm() {
  const { user } = useUser()
  const [prompt, setPrompt] = useState("")
  const [ambiance, setAmbiance] = useState("jour")
  const [weather, setWeather] = useState("dégagé")
  const [style, setStyle] = useState("contemporain")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim() || loading) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), ambiance, weather, style }),
      })
      const data = await res.json()
      if (data.imageUrl) setResult(data.imageUrl)
    } catch {
      console.error("Render failed")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description du rendu</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Une villa contemporaine avec piscine à débordement face à la mer..."
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Ambiance</label>
            <select
              value={ambiance}
              onChange={(e) => setAmbiance(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {ambiances.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Météo</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {meteo.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {styles.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-gold-500 px-4 text-sm font-medium text-black transition-all hover:bg-gold-400 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Génération..." : "Générer"}
        </button>
      </form>

      {result && (
        <div className="rounded-lg border border-border bg-card p-4">
          <img src={result} alt="Rendu" className="w-full rounded-lg" />
        </div>
      )}
    </div>
  )
}
